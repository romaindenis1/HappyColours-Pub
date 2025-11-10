import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>; 
  }
) {
  try {
    const { id: idParam } = await params;
    const id = Number(idParam);

    if (isNaN(id)) {
      return NextResponse.json(
        { message: "Invalid ID format" },
        { status: 400 }
      );
    }

    const formule = await prisma.formules.findUnique({
      where: {
        id: id,
      },
    });

    const prix = await prisma.tranche_prix.findMany({});

    return NextResponse.json({ formule, prix });
  } catch (err) {
    return NextResponse.json(
      {
        message: `Internal server error: ${err}`,
      },
      { status: 500 }
    );
  }
}