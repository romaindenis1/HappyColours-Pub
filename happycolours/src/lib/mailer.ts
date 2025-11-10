import nodemailer from "nodemailer";
import { prisma } from "@/lib/db";
import { reservations, users } from "@/generated/prisma";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "noreply.happycolours@gmail.com",
    pass: "Token",
  },
});

export async function mailerReservation(
  user: users,
  reservation: reservations
) {
  try {
    const info = await transporter.sendMail({
      from: "noreply.happycolours@gmail.com",
      to: user.mail,
      subject: `reservation ${reservation.id}`,
      html: `
        <div>
          <h1>CA MARCHE !!!!</h1>
        </div>
      `,
    });
    console.log(info);
  } catch (err) {
    console.log(err);
  }
}

export async function mailer(
  type_mail: string,
  user_id: number,
  reservation_id: number
) {
  const user = await prisma.users.findUnique({
    where: {
      id: user_id,
    },
  });
  const reservation = await prisma.reservations.findUnique({
    where: {
      id: reservation_id,
    },
  });

  if (type_mail == "24HBefore") {
    try {
      const info = await transporter.sendMail({
        from: "noreply.happycolours@gmail.com",
        to: user?.mail,
        subject: `reservation ${reservation?.id}`,
        html: `
        <div>
          <h1>CA MARCHE !!!!</h1>
        </div>
      `,
      });
      console.log(info);
    } catch (err) {
      console.log(err);
    }
  }
  if (type_mail == "1SemBefore") {
    try {

      const info = await transporter.sendMail({
        from: "noreply.happycolours@gmail.com",
        to: user?.mail,
        subject: "reservation",
        html: `
        <div>
          <h1>CA MARCHE !!!!</h1>
        </div>
      `,
      });
      console.log(info);
    } catch (err) {
      console.log(err);
    }
  }
  if (type_mail == "4DAfter") {
    try {

      const info = await transporter.sendMail({
        from: "noreply.happycolours@gmail.com",
        to: user?.mail,
        subject: "reservation",
        html: `
        <div>
          <h1>CA MARCHE !!!!</h1>
        </div>
      `,
      });
      console.log(info);
    } catch (err) {
      console.log(err);
    }
  }
}
