// src/app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";

import { prisma } from "@/lib/db";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
// +CC… ou 00CC… avec séparateurs optionnels (européen/international)
const intlPhoneRegex = /^(?:\+|00)\s*(?:\d[\s\-()]*){6,17}\d$/;

// Normalisation E.164-like : 00 -> +, suppression des séparateurs, exige +########
function normalizePhone(raw: string): string {
  const trimmed = raw.trim();
  const withPlus = trimmed.startsWith("+")
    ? trimmed
    : trimmed.startsWith("00")
      ? "+" + trimmed.slice(2)
      : trimmed;
  const cleaned = withPlus.replace(/[.\s\-()]/g, "");
  if (!/^\+\d{8,15}$/.test(cleaned)) {
    throw new Error(
      "Le numéro de téléphone doit être au format international (ex. +41761234567)."
    );
  }
  return cleaned;
}

// Paramètres scrypt (sécurisés et raisonnables en prod)
// N=2^14, r=8, p=1 ≈ paramètres par défaut “forts” sans être trop lents
const SCRYPT_PARAMS = { N: 8192, r: 8, p: 1 } as const;
const KEYLEN = 32;

// Hash mot de passe avec scrypt + sel applicatif (stocké en DB)
// Note : scrypt a déjà son propre sel interne, mais avoir une colonne `salt` distincte
// est compatible avec ton schéma et ajoute une défense supplémentaire.
function hashPasswordScrypt(password: string, appSaltHex: string): string {
  const appSalt = Buffer.from(appSaltHex, "hex");
  const derived = crypto.scryptSync(password, appSalt, KEYLEN, SCRYPT_PARAMS);
  // On encode le résultat en hex et on **enregistre les paramètres** en clair dans le hash si souhaité
  // (ici on garde simple: hash hex et salt en colonne dédiée)
  return derived.toString("hex");
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { nom, prenom, telephone, mail, mdp } = body ?? {};

    // Champs requis
    if (
      !nom?.trim() ||
      !prenom?.trim() ||
      !telephone?.toString?.().trim() ||
      !mail?.trim() ||
      !mdp
    ) {
      return NextResponse.json(
        { message: "Champs manquants ou invalides." },
        { status: 400 }
      );
    }

    // Validations
    if (!emailRegex.test(mail.trim())) {
      return NextResponse.json(
        { message: "Adresse email invalide." },
        { status: 400 }
      );
    }

    if (!passwordRegex.test(mdp)) {
      return NextResponse.json(
        {
          message:
            "Mot de passe trop faible : 8+ caractères, au moins une minuscule, une majuscule et un chiffre.",
        },
        { status: 400 }
      );
    }

    if (!intlPhoneRegex.test(telephone)) {
      return NextResponse.json(
        {
          message:
            "Téléphone invalide. Utilisez un format international (ex. +41 76 123 45 67 ou 0044 20 7946 0958).",
        },
        { status: 400 }
      );
    }

    const phoneNormalized = normalizePhone(telephone);

    // Unicité email (réponse générique)
    const existing = await prisma.users.findFirst({
      where: { mail: mail.trim() },
      select: { id: true },
    });
    if (existing) {
      return NextResponse.json(
        { message: "Inscription impossible. Veuillez réessayer." },
        { status: 409 }
      );
    }

    // Sel applicatif aléatoire (hex)
    const appSaltHex = crypto.randomBytes(16).toString("hex");
    const passwordHashHex = hashPasswordScrypt(mdp, appSaltHex);

    // Création
    const user = await prisma.users.create({
      data: {
        nom: nom.trim(),
        prenom: prenom.trim(),
        telephone: phoneNormalized,
        mail: mail.trim(),
        password: passwordHashHex,
        salt: appSaltHex,
      },
      select: { id: true },
    });

    return NextResponse.json(
      { ok: true, userId: user.id },
      { status: 201, statusText: "Created" }
    );
  } catch {
    return NextResponse.json(
      { message: "Inscription impossible. Veuillez réessayer." },
      { status: 500 }
    );
  }
}
