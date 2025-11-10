import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { mailer } from "@/lib/mailer";

export async function GET() {
  try {
    const today = new Date();
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      23,
      59,
      59,
      999
    );


    const mails = await prisma.mails.findMany({
      where: {
        date_envoi: {
          gte: startOfDay, // Greater Than or Equal
          lte: endOfDay, // Less Than or Equal
        },
      },
    });
    if (!mails) {
      return NextResponse.json({
        message: "il n'y a aucun mail a envoyer",
        status: 200,
      });
    }
    for (const mail of mails) {
      mailer(mail.type_mail, mail.user_id, mail.reservation_id);
    }

    return NextResponse.json(
      { message: "tous les mails ont été envoyé" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "erreur coté serveur" },
      { status: 500 }
    );
  }
}
