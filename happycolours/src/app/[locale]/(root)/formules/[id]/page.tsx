"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import ReservationStartComponent from "@/components/ui/reservationStart";

import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [isLoading, setIsLoading] = useState(false);

  const handleReserver = async (personne: number, price: number) => {
    try {
      if (isLoading) return;
      setIsLoading(true);
      const res = await fetch("/api/reservation/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          personne: personne,
          callbackUrl: `/formules/${id}`,
          prix: price,
        }),
      });
      if (res.redirected) {
        router.push(res.url);
        return;
      }
      const data = await res.json();
      router.push(`/reservation?id=${data.reservationId}`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ReservationStartComponent
      id={Number(id)}
      handleReserver={handleReserver}
      isLoading={isLoading}
    />
  );
}
