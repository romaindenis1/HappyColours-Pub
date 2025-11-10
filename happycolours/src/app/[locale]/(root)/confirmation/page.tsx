import { prisma } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import Confirmation from "@/components/ui/confirmationComponent";

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

  // Si la réservation est déjà confirmée, rediriger vers la page de succès
  if (reservation.status === "Confirmed") {
    redirect(`/confirmation/success?id=${id}`);
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
      <Confirmation
        reservationPrice={reservationPrice}
        user={user}
        formule={formule}
      />
    </>
  );
}
