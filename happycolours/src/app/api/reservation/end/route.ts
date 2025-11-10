import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { mailerReservation } from "@/lib/mailer";

export async function PUT(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  
  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 403 }
    );
  }

  try {
    const { id, date, heureDebut } = await req.json();

    const reservationEnd = await prisma.reservations.update({
      where: {
        id: id,
      },
      data: {
        date: date,
        debut: heureDebut,
      },
    });

    const userReservation = await prisma.users.findUnique({
      where: {
        id: reservationEnd.user_id,
      },
    });

    if (!reservationEnd) {
      return NextResponse.json(
        { message: "reservation non trouvée !" },
        { status: 404 }
      );
    }
    
    if (!userReservation) {
      return NextResponse.json(
        { message: "utilisateur non trouvée !" },
        { status: 404 }
      );
    }

    const date_envoi1SemBefore = new Date(
      (reservationEnd.date || new Date()).getTime() - 7 * 24 * 60 * 60 * 1000
    );
    const date_envoi24HBefore = new Date(
      (reservationEnd.date || new Date()).getTime() - 24 * 60 * 60 * 1000
    );
    const date_envoi4DAfter = new Date(
      (reservationEnd.date || new Date()).getTime() + 4 * 24 * 60 * 60 * 1000
    );

    await prisma.mails.create({
      data: {
        date_envoi: date_envoi1SemBefore,
        type_mail: "1SemBefore",
        user_id: userReservation.id,
        reservation_id: reservationEnd.id,
      },
    });

    await prisma.mails.create({
      data: {
        date_envoi: date_envoi24HBefore,
        type_mail: "24HBefore",
        user_id: userReservation.id,
        reservation_id: reservationEnd.id,
      },
    });

    await prisma.mails.create({
      data: {
        date_envoi: date_envoi4DAfter,
        type_mail: "4DAfter",
        user_id: userReservation.id,
        reservation_id: reservationEnd.id,
      },
    });

    mailerReservation(userReservation, reservationEnd);

    return NextResponse.json(reservationEnd);
  } catch (error) {
    console.error("Error updating reservation:", error);
    return NextResponse.json(
      { message: "error server" },
      { status: 500 }
    );
  }
}