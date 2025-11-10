"use client";

import React, { useState, useEffect, useMemo } from "react";

type TarifProps = {
  id: number;
  prixPersonne: Tarif[];
  onTarifChange?: (tarif: number) => void;
  onPersonChange?: (personne: number) => void;
  onTimeChange?: (temps: number) => void;
  // fonction pour remonter le tarif au parent
};
type Tarif = {
  id: number;
  prix: string;
  minPersonnes: number;
  maxPersonnes: number;
  formule_id: number;
};

export default function Tarif({
  id,
  prixPersonne,
  onTarifChange,
  onPersonChange,
}: TarifProps) {

  const tarifsFiltres = useMemo(
    () => prixPersonne.filter((t) => t.formule_id === id),
    [prixPersonne, id]
  );

  const minGlobal = useMemo(() => {
    return tarifsFiltres.length
      ? Math.min(...tarifsFiltres.map((t) => t.minPersonnes))
      : 1;
  }, [tarifsFiltres]);

  const maxGlobal = useMemo(() => {
    return tarifsFiltres.length
      ? Math.max(...tarifsFiltres.map((t) => t.maxPersonnes))
      : 1;
  }, [tarifsFiltres]);

  const [personne, setPersonne] = useState(minGlobal);

  const tarifSelectionne = useMemo(() => {
    return (
      tarifsFiltres.find(
        (t) => personne >= t.minPersonnes && personne <= t.maxPersonnes
      ) || null
    );
  }, [tarifsFiltres, personne]);

  const prixTotal = tarifSelectionne
    ? Number(tarifSelectionne.prix) * personne
    : 0;

  useEffect(() => {
    if (onTarifChange) onTarifChange(prixTotal);
  }, [prixTotal, onTarifChange]);

  useEffect(() => {
    if (onPersonChange) onPersonChange(personne);
  }, [personne, onPersonChange]);

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-2xl shadow-lg border border-gray-200">
      <h1 className="text-2xl font-bold mb-4">Tarif</h1>

      <div className="mb-4">
        <h2 className="text-xl font-bold">
          Prix total : {prixTotal ? `${prixTotal} CHF` : "—"}
        </h2>
        {!tarifSelectionne && (
          <p className="text-red-500 text-sm mt-2">
            Aucun tarif trouvé pour {personne} personne(s)
          </p>
        )}
      </div>

      <div className="mb-4">
        <p className="font-semibold mb-2">Personnes :</p>
        <div className="flex gap-2 flex-wrap">
          {Array.from(
            { length: maxGlobal - minGlobal + 1 },
            (_, i) => i + minGlobal
          ).map((n) => (
            <button
              key={n}
              onClick={() => setPersonne(n)}
              className={`px-4 py-2 rounded-md border ${
                personne === n
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
