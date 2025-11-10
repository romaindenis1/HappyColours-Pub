"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

type FormData = { mdp: string; mail: string };
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

export default function LoginComponent() {
  const t = useTranslations("Login");
  const [Form, setForm] = useState<FormData>({ mdp: "", mail: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!Form.mail.trim() || !Form.mdp) {
      setError(t("erreurVide"));
      return;
    }
    if (!emailRegex.test(Form.mail.trim())) {
      setError(t("erreurEmailInvalide"));
      return;
    }

    const result = await signIn("credentials", {
      email: Form.mail.trim().toLowerCase(),
      password: Form.mdp,
      redirect: false,
      callbackUrl: "/",
    });

    if (!result || !result.ok) {
      setError(t("erreurIdentifiants"));
      return;
    }
    // succès
    window.location.href = result.url ?? "/";
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden px-6 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900"
    >
      <h1 className="text-5xl font-black text-white mb-8">{t("titre")}</h1>

      <input
        type="email"
        name="mail"
        placeholder={t("email")}
        value={Form.mail}
        onChange={handleChange}
        className="w-80 max-w-md px-5 py-3 mb-4 rounded-full border border-white/20
                   bg-white/10 backdrop-blur-md text-white placeholder-white/60
                   focus:outline-none focus:ring-2 focus:ring-yellow-400
                   transition-all duration-300"
        autoComplete={t("autocompleteMail")}
        required
      />

      <input
        type="password"
        name="mdp"
        placeholder={t("motDePasse")}
        value={Form.mdp}
        onChange={handleChange}
        className="w-80 max-w-md px-5 py-3 mb-6 rounded-full border border-white/20
                   bg-white/10 backdrop-blur-md text-white placeholder-white/60
                   focus:outline-none focus:ring-2 focus:ring-yellow-400
                   transition-all duration-300"
        autoComplete={t("autocompleteMotDePasse")}
        required
      />

      <button
        type="submit"
        className="w-80 max-w-md px-6 py-3 rounded-full font-bold text-gray-900
                   bg-gradient-to-r from-yellow-400 to-orange-500
                   hover:scale-110 transition-transform duration-300
                   shadow-2xl hover:shadow-yellow-500/25 cursor-pointer"
      >
        {t("connexion")}
      </button>

      {error && (
        <p className="mt-4 text-red-400 font-medium text-sm">{error}</p>
      )}

      <p className="mt-6 text-white font-medium">
        {t("pasDeCpmpte")}{" "}
        <Link
          href="/register"
          className="font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent hover:from-indigo-600 hover:to-purple-600 transition-all duration-300"
        >
          {t("creerCompte")}
        </Link>
      </p>
    </form>
  );
}