import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const session = await getServerSession(authOptions);

  const { id, personne, prix, callbackUrl } = await req.json();
  if (!session) {
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`, req.url)
    );
  }

  const reservationStart = await prisma.reservations.create({
    data: {
      user_id: Number(token?.uid),
      formule_id: Number(id),
      nbrPerson: personne,
      dateReservationWeb: new Date(),
      prix: prix,
    },
  });
  return NextResponse.json({ reservationId: reservationStart.id });
}
