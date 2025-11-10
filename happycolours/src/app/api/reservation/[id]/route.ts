import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const idParam = (await params).id;

  // Cas 2 : id numérique → comportement existant
  const id = Number(idParam);
  if (!Number.isFinite(id)) {
    return NextResponse.json(
      { error: "Invalid reservation id" },
      { status: 400 }
    );
  }

  const reservationStart = await prisma.reservations.findUnique({
    where: { id },
  });

  if (!reservationStart) {
    return NextResponse.json(
      { message: "Impossible de trouver cette reservation !" },
      { status: 404 }
    );
  }

  return NextResponse.json(reservationStart);
}

export async function PUT(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id, status } = await req.json();
  try {
    const reservation = await prisma.reservations.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    });
    if(!reservation){
      return NextResponse.json({ message: "erreur de modification de reservation" }, { status: 500 });
    }

    return NextResponse.json(
      { message: "reservation modifié !" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ message: "error server" }, { status: 500 });
  }
}
