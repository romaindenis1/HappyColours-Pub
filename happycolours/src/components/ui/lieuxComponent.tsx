"use client";

import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { MapPin, Navigation, Calendar, Star, Users } from "lucide-react";
import { useTranslations } from "next-intl";

type lieu = {
  id: number;
  nom: string;
  adresse: string;
  NPA: number;
  localite: string;
  latitude: number;
  longitude: number;
};

export default function LieuComposant({ lieu, apiKey }: { lieu: lieu,apiKey: string }) {
  const t = useTranslations("Lieu");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-24 h-24 bg-gradient-to-br from-green-400/20 to-blue-500/20 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-gradient-to-br from-pink-400/15 to-purple-500/15 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-20 left-1/2 w-28 h-28 bg-gradient-to-br from-teal-400/15 to-indigo-500/15 rounded-full animate-bounce delay-700"></div>
      </div>

      {/* Header avec dégradé Happy Colours style */}
      <div className="z-50 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 shadow-2xl">
        <div className="backdrop-blur-sm bg-black/20 px-6 py-6">
          <div className="flex items-center justify-center space-x-3">
            <MapPin className="w-8 h-8 text-white drop-shadow-lg" />
            <h1 className="text-3xl md:text-4xl font-black text-white text-center tracking-tight drop-shadow-lg">
              {t("titre")}
            </h1>
          </div>
        </div>
      </div>

      {/* Conteneur principal avec padding pour le cadre */}
      <div
        className="relative z-10 p-6 h-screen"
        style={{ paddingTop: "140px", paddingBottom: "80px" }}
      >
        {/* Cadre décoratif autour de la carte */}
        <div className="relative h-full max-w-7xl mx-auto">
          {/* Coins décoratifs */}
          <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full z-40 flex items-center justify-center shadow-xl">
            <Star className="w-8 h-8 text-white" />
          </div>
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-green-400 to-teal-500 rounded-full z-40 flex items-center justify-center shadow-xl">
            <Users className="w-8 h-8 text-white" />
          </div>
          <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full z-40 flex items-center justify-center shadow-xl">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full z-40 flex items-center justify-center shadow-xl">
            <Navigation className="w-8 h-8 text-white" />
          </div>

          {/* Bordure principale avec dégradé */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 via-green-400 via-teal-400 via-blue-500 via-indigo-600 to-purple-600 rounded-3xl p-1 shadow-2xl">
            <div className="w-full h-full bg-white/95 backdrop-blur-md rounded-3xl overflow-hidden border-4 border-white/30 shadow-inner">
              {/* Conteneur de la carte */}
              <div className="w-full h-full relative rounded-2xl overflow-hidden">
                <APIProvider
                  apiKey={
                    apiKey
                  }
                >
                  <Map
                    className="w-full h-full"
                    defaultCenter={{
                      lat: lieu.latitude,
                      lng: lieu.longitude,
                    }}
                    defaultZoom={18}
                    gestureHandling="greedy"
                    disableDefaultUI
                    mapTypeId="hybrid"
                    styles={[
                      {
                        featureType: "water",
                        elementType: "geometry",
                        stylers: [{ color: "#0891b2" }],
                      },
                      {
                        featureType: "landscape",
                        elementType: "geometry",
                        stylers: [{ color: "#064e3b" }],
                      },
                    ]}
                  />
                  <Marker
                    position={{
                      lat: lieu.latitude,
                      lng: lieu.longitude,
                    }}
                    title={lieu.nom}
                  />
                </APIProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}