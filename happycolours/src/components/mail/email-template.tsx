import * as React from "react";

interface EmailTemplateProps {
  reservationId: number;
}

export function EmailTemplate({ reservationId }: EmailTemplateProps) {
  return (
    <div>
      <h1>Reservation, no {reservationId}</h1>
    </div>
  );
}
