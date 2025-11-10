"use client";

import { useTranslations } from "next-intl";

interface LoadingProps {
  message?: string;
  messageKey?: "defaut" | "traitement" | "attente" | "preparation";
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
}

export default function Chargement({
  message,
  messageKey = "defaut",
  size = "md",
  fullScreen = true,
}: LoadingProps) {
  const t = useTranslations("Loading");

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };

  const containerClasses = fullScreen
    ? "min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-purple-100 flex items-center justify-center"
    : "flex items-center justify-center p-8";

  const displayMessage = message || t(messageKey);

  return (
    <div className={containerClasses}>
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/50 text-center">
        {/* Spinner rond avec gradient */}
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            {/* Cercle de fond */}
            <div
              className={`${sizeClasses[size]} border-4 border-gray-200 rounded-full`}
            ></div>
            {/* Cercle qui tourne */}
            <div
              className={`absolute top-0 left-0 ${sizeClasses[size]} border-4 border-transparent border-t-yellow-400 border-r-orange-500 rounded-full animate-spin`}
            ></div>
            {/* Effet de brillance au centre */}
            <div
              className={`absolute top-1/2 left-1/2 w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse`}
            ></div>
          </div>
        </div>

        {/* Message de chargement */}
        <p
          className={`${textSizeClasses[size]} font-bold text-gray-800 animate-pulse`}
        >
          {displayMessage}
        </p>

        {/* Points animés */}
        <div className="flex justify-center gap-1 mt-4">
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
