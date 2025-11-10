import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

import Success from "@/components/ui/successComponent";

type PageProps = {
  searchParams: Promise<{
    id?: string;
  }>;
};
// Action pour confirmer la réservation

export default async function Page({ searchParams }: PageProps) {
  const id = Number((await searchParams)?.id);

  if (!id || isNaN(id)) {
    notFound();
  }

  const reservation = await prisma.reservations.findUnique({
    where: {
      id: id,
    },
  });

  if (!reservation) {
    notFound();
  }

  const user = await prisma.users.findUnique({
    where: {
      id: reservation?.user_id, // Assumant que vous avez un champ user_id
    },
  });

  const formule = await prisma.formules.findUnique({
    where: {
      id: reservation?.formule_id,
    },
  });
  if (!formule || !user) {
    notFound();
  }
  const reservationPrice = {
    ...reservation,
    prix: reservation?.prix.toNumber(),
  };

  return (
    <>
      <Success
        reservationPrice={reservationPrice}
        user={user}
        formule={formule}
      />
    </>
  );
}
