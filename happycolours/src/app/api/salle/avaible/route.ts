// app/api/disponibilites/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { salles } from "@/generated/prisma";

const BUFFER_MINUTES = 30;
const STEP_MINUTES = 15;
const OPEN_HOUR = 10;
const CLOSE_HOUR = 19;

function addMinutes(d: Date, mins: number) {
  return new Date(d.getTime() + mins * 60_000);
}

function minutesToHHMM(mins: number) {
  const hh = Math.floor(mins / 60)
    .toString()
    .padStart(2, "0");
  const mm = (mins % 60).toString().padStart(2, "0");
  return `${hh}:${mm}`;
}

function parseDateTime(dateYMD: string, hhmm: string | Date) {
  if (hhmm instanceof Date) return hhmm;
  return new Date(`${dateYMD}T${hhmm}:00`);
}

function overlaps(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date) {
  return !(
    aEnd.getTime() <= bStart.getTime() || aStart.getTime() >= bEnd.getTime()
  );
}
function getSallesDisponiblesPourFormule(
  formuleId: number,
  nombrePersonnes: number,
  salles: salles[]
) {
  return salles.filter((salle) => {
    // Salle 4 : jamais proposée pour les activités normales
    if (salle.id === 4) return false;

    // Formule anniversaire / teambuilding (id = 2)
    if (formuleId === 2) {
      // salle 1 ou 2
      return salle.id === 1 || salle.id === 2;
    }

    // Formule teambuilding (id = 5)
    if (formuleId === 5) {
      return salle.id === 3;
    }

    // Formule famille (id = 3 ou 4)
    if (formuleId === 3 || formuleId === 4) {
      // salle 1 si grande capacité sinon salle 2
      if (salle.capacite && salle.capacite >= nombrePersonnes) return true;
      return false;
    }

    // Par défaut, toutes les salles sauf 4
    return salle.id !== 4;
  });
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date"); // "YYYY-MM-DD"
    const idReservation = searchParams.get("idReservation");
    console.log("caca" + date);
    console.log("pipi" + idReservation);

    if (!date || !idReservation) {
      return NextResponse.json(
        { error: "date et reservationId requis" },
        { status: 400 }
      );
    }

    // 1) Charger la réservation et sa formule
    const reservation = await prisma.reservations.findUnique({
      where: { id: Number(idReservation) },
      include: {
        formule: { include: { etre: { include: { salle: true } } } },
      },
    });

    if (!reservation)
      return NextResponse.json(
        { error: "Réservation introuvable" },
        { status: 404 }
      );

    const nombrePersonnes = reservation.nbrPerson ?? 1;
    const dureeMinutes = reservation.formule?.duree ?? 60;

    // 2) Déterminer les salles possibles
    let sallesPossibles = reservation.formule?.etre?.map((e) => e.salle) ?? [];
    if (sallesPossibles.length === 0) {
      // si pas de salle spécifique, prendre toutes
      sallesPossibles = await prisma.salles.findMany();
    }

    // filtrer par capacité
    const sallesATester = sallesPossibles.filter(
      (s) => s.capacite === null || s.capacite >= nombrePersonnes
    );

    // filtrage selon les règles métiers
    const sallesFiltrees = getSallesDisponiblesPourFormule(
      reservation.formule_id,
      nombrePersonnes,
      sallesATester
    );

    if (sallesFiltrees.length === 0) return NextResponse.json({ creneaux: [] });

    // 1) Extraire les IDs des salles à tester
    const salleIds = sallesFiltrees.map((s) => s.id);

    // 2) Récupérer toutes les réservations du jour (hors celle en cours),
    //    avec les formules et les salles associées via la table "etre"
    const reservationsExistantes = await prisma.reservations.findMany({
      where: {
        date: new Date(date),
        NOT: { id: Number(idReservation) },
      },
      include: {
        formule: {
          include: {
            etre: {
              include: {
                salle: true,
              },
            },
          },
        },
      },
    });
    console.log("📅 Réservations existantes ce jour :");
    reservationsExistantes.forEach((r) => {
      console.log(
        `  Réservation ${r.id} - formule ${r.formule_id} - début: ${r.debut}`
      );
    });

    // 3) Initialiser la map des occupations par salle
    const occMap = new Map<number, Array<{ start: Date; end: Date }>>();
    for (const salle of sallesFiltrees) {
      occMap.set(salle.id, []);
    }

    // 4) Remplir la map avec les intervalles occupés
    for (const r of reservationsExistantes) {
      if (!r.debut || !r.formule?.etre) continue;

      const hhmm = minutesToHHMM(
        r.debut.getHours() * 60 + r.debut.getMinutes()
      );
      const start = parseDateTime(date, hhmm);
      const end = addMinutes(start, r.formule.duree ?? 60);
      const startWithBuffer = addMinutes(start, -BUFFER_MINUTES);
      const endWithBuffer = addMinutes(end, BUFFER_MINUTES);

      console.log(`🔍 Réservation ${r.id} - contenu de formules.etre :`);
      console.log(JSON.stringify(r.formule.etre, null, 2));

      // Extraire toutes les salles associées à la formule de cette réservation
      const sallesAssociees = r.formule.etre.flatMap((e) => e.salle ?? []);
      if (sallesAssociees.length === 0) {
        console.log(`⚠️ Aucune salle associée à la réservation ${r.id}`);
      }

      for (const salle of sallesAssociees) {
        // Ne garder que les salles qu'on teste
        if (!salleIds.includes(salle.id)) continue;

        const arr = occMap.get(salle.id) ?? [];
        arr.push({ start: startWithBuffer, end: endWithBuffer });
        occMap.set(salle.id, arr);
        console.log(`🧩 Réservation ${r.id} - début: ${r.debut}`);
        console.log(`  → start reconstruit: ${start.toISOString()}`);
        console.log(`  → end avec buffer: ${endWithBuffer.toISOString()}`);

        console.log("  → Salles associées à cette réservation :");
        sallesAssociees.forEach((salle) => {
          console.log(`    Salle ${salle.id}`);
        });
      }
    }

    // 5) Debug : afficher les intervalles occupés par salle
    console.log("🗺️ Carte des occupations par salle :");
    for (const [salleId, intervals] of occMap.entries()) {
      console.log(`  Salle ${salleId} :`);
      intervals.forEach((i) => {
        console.log(`    ${i.start.toISOString()} → ${i.end.toISOString()}`);
      });
    }

    // 5) Générer créneaux
    const openMinutes = OPEN_HOUR * 60;
    const closeMinutes = CLOSE_HOUR * 60;
    const lastStart = closeMinutes - dureeMinutes;

    // 5) Générer les créneaux avec salles disponibles
    const salleCreneaux = new Map<number, string[]>();

    for (const salle of sallesFiltrees) {
      salleCreneaux.set(salle.id, []);
    }

    for (let m = openMinutes; m <= lastStart; m += STEP_MINUTES) {
      const hhmm = minutesToHHMM(m);
      const start = parseDateTime(date, hhmm);
      const end = addMinutes(start, dureeMinutes);

      for (const salle of sallesFiltrees) {
        const occ = occMap.get(salle.id) ?? [];
        const isFree = !occ.some((o) => overlaps(start, end, o.start, o.end));
        if (isFree) {
          salleCreneaux.get(salle.id)?.push(start.toISOString());
        }
      }
    }

    // Transformer map salleCreneaux → créneau avec salles libres
    const creneauxMap = new Map<string, number[]>();

    for (const [salleId, creneaux] of salleCreneaux.entries()) {
      for (const start of creneaux) {
        if (!creneauxMap.has(start)) creneauxMap.set(start, []);
        creneauxMap.get(start)?.push(salleId);
      }
    }

    const creneauxDisponibles = Array.from(creneauxMap.entries())
      .map(([start, salles]) => ({ start, salles }))
      .sort((a, b) => a.start.localeCompare(b.start));

    console.log(creneauxDisponibles);

    return NextResponse.json({
      creneaux: creneauxDisponibles,
    });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
