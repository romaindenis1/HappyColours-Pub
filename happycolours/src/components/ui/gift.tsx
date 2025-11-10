"use client";

import { Gift } from "lucide-react";

export default function GiftSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-yellow-400/20 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-white/5 rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-8">
              <span className="text-yellow-300">Carte Cadeau</span> —{" "}
              <span className="block">offrez des souvenirs éclaboussés</span>
            </h2>
            <p className="text-xl mb-8 opacity-95 leading-relaxed">
              Un cadeau qui fait vraiment plaisir : une expérience fun,
              libératrice et créative, idéale pour toute la famille (de 3 à 100
              ans).
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-gray-900 font-bold text-sm">✓</span>
                </div>
                <span className="text-lg">Bon valable 12 mois</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-gray-900 font-bold text-sm">✓</span>
                </div>
                <span className="text-lg">Réservation flexible</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-gray-900 font-bold text-sm">✓</span>
                </div>
                <span className="text-lg">Livraison digitale immédiate</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-white/25 flex items-center justify-center gap-2">
                <Gift className="w-5 h-5" />
                Offrir un bon cadeau
              </button>
              <button className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                Voir les tarifs
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <img
                  src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=300&fit=crop"
                  alt="Moment créatif 1"
                  className="rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300 w-full"
                />
                <img
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop"
                  alt="Moment créatif 2"
                  className="rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300 w-full"
                />
              </div>
              <div className="space-y-6 mt-12">
                <img
                  src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop"
                  alt="Moment créatif 3"
                  className="rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300 w-full"
                />
                <img
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&h=300&fit=crop"
                  alt="Moment créatif 4"
                  className="rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300 w-full"
                />
              </div>
            </div>

            {/* Floating gift icon */}
            <div className="absolute -top-6 -right-6 bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center text-2xl animate-bounce shadow-xl">
              🎁
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
