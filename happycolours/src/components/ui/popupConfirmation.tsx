"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ReactHotToastExample() {
  const [loading, setLoading] = useState(false);

  const showSuccess = () => {
    toast.success("Réservation confirmée avec succès !", {
      duration: 4000,
      position: "top-right",
      style: {
        background: "#10B981",
        color: "#fff",
      },
    });
  };

  const showError = () => {
    toast.error("Erreur lors de la confirmation", {
      duration: 5000,
      position: "top-right",
    });
  };

  const showCustom = () => {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">HC</span>
                </div>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Happy Colours
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Votre réservation a été mise à jour !
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Fermer
            </button>
          </div>
        </div>
      ),
      { duration: 6000 }
    );
  };

  const showPromise = async () => {
    setLoading(true);

    type ReservationData = {
  name: string;
};

const myPromise = new Promise<ReservationData>((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.5) {
      resolve({ name: "Réservation #123" });
    } else {
      reject(new Error("Erreur de réseau"));
    }
  }, 2000);
});

await toast.promise(myPromise, {
  loading: "Confirmation en cours...",
  success: (data: ReservationData) => `${data.name} confirmée !`,
  error: (err: Error) => `Erreur: ${err.message}`,
});

    setLoading(false);
  };

  const showLoading = () => {
    const toastId = toast.loading("Chargement en cours...");

    setTimeout(() => {
      toast.success("Terminé !", {
        id: toastId, // Remplace le toast de loading
      });
    }, 3000);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">React Hot Toast Examples</h1>

      <div className="space-y-4">
        <button
          onClick={showSuccess}
          className="bg-green-600 text-white px-4 py-2 rounded mr-4 hover:bg-green-700"
        >
          Toast Succès
        </button>

        <button
          onClick={showError}
          className="bg-red-600 text-white px-4 py-2 rounded mr-4 hover:bg-red-700"
        >
          Toast Erreur
        </button>

        <button
          onClick={showCustom}
          className="bg-purple-600 text-white px-4 py-2 rounded mr-4 hover:bg-purple-700"
        >
          Toast Personnalisé
        </button>

        <button
          onClick={showPromise}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded mr-4 hover:bg-blue-700 disabled:opacity-50"
        >
          Toast avec Promise
        </button>

        <button
          onClick={showLoading}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Toast Loading
        </button>
      </div>

      {/* Le composant Toaster doit être ajouté une seule fois dans votre layout */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Styles par défaut
          className: "",
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          // Styles par type
          success: {
            duration: 3000,
          },
        }}
      />
    </div>
  );
}
