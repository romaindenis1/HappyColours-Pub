"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

type FormData = {
  nom: string;
  prenom: string;
  telephone: string;
  mail: string;
  mdp: string;
};

type FormErrors = Partial<Record<keyof FormData, string>> & { global?: string };

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const intlPhoneRegex = /^(?:\+|00)\s*(?:\d[\s\-()]*){6,17}\d$/;

export default function RegisterComponent() {
  const t = useTranslations("Register");
  const router = useRouter();
  const [form, setForm] = useState<FormData>({
    nom: "",
    prenom: "",
    telephone: "",
    mail: "",
    mdp: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const setField =
    (name: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setForm((prev) => ({ ...prev, [name]: value }));
      validateField(name, value);
    };

  const normalizePhone = (raw: string) => {
    const trimmed = raw.trim();
    const withPlus = trimmed.startsWith("+")
      ? trimmed
      : trimmed.startsWith("00")
        ? "+" + trimmed.slice(2)
        : trimmed;
    const cleaned = withPlus.replace(/[.\s\-()]/g, "");
    return cleaned;
  };

  const validateField = (
    name: keyof FormData,
    value: string
  ): string | null => {
    switch (name) {
      case "nom":
        return value.trim() ? null : t("erreurNomObligatoire");
      case "prenom":
        return value.trim() ? null : t("erreurPrenomObligatoire");
      case "telephone": {
        const v = value.trim();
        if (!v) return t("erreurTelephoneObligatoire");
        return intlPhoneRegex.test(v)
          ? null
          : t("erreurFormatTelephone");
      }
      case "mail":
        if (!value.trim()) return t("erreurEmailObligatoire");
        return emailRegex.test(value.trim())
          ? null
          : t("erreurEmailInvalide");
      case "mdp":
        if (!value) return t("erreurMotDePasseObligatoire");
        return passwordRegex.test(value)
          ? null
          : t("erreurMotDePasseForce");
      default:
        return null;
    }
  };

  const validateAll = (): boolean => {
    const newErrors: FormErrors = {};
    (Object.keys(form) as (keyof FormData)[]).forEach((k) => {
      const msg = validateField(k, form[k]);
      if (msg) newErrors[k] = msg;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    if (!validateAll()) return;

    setLoading(true);
    try {
      const phoneForApi = normalizePhone(form.telephone);

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: form.nom.trim(),
          prenom: form.prenom.trim(),
          telephone: phoneForApi,
          mail: form.mail.trim(),
          mdp: form.mdp,
        }),
      });

      if (!response.ok) {
        let serverMsg = t("erreurInscription");
        try {
          const data = await response.json();
          if (data?.message) serverMsg = data.message;
        } catch {}
        setErrors({ global: serverMsg });
        return;
      }

      router.push("/login");
    } catch {
      setErrors({
        global: t("erreurConnexion"),
      });
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    "w-80 max-w-md px-5 py-3 rounded-full border border-white/20 " +
    "bg-white/10 backdrop-blur-md text-white placeholder-white/60 " +
    "focus:outline-none focus:ring-2 focus:ring-yellow-400 " +
    "transition-all duration-300";
  const errorText = "mt-1 text-red-400 text-sm";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden px-6 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900"
    >
      <h1 className="text-5xl font-black text-white mb-8">{t("titre")}</h1>

      {/* Prénom */}
      <div className="mb-3 w-80 max-w-md">
        <input
          type="text"
          name="prenom"
          placeholder={t("prenom")}
          value={form.prenom}
          onChange={setField("prenom")}
          aria-invalid={!!errors.prenom}
          aria-describedby={errors.prenom ? "err-prenom" : undefined}
          autoComplete={t("autocompletePrenom")}
          className={inputBase}
          required
        />
        {errors.prenom && (
          <p id="err-prenom" className={errorText}>
            {errors.prenom}
          </p>
        )}
      </div>

      {/* Nom */}
      <div className="mb-3 w-80 max-w-md">
        <input
          type="text"
          name="nom"
          placeholder={t("nom")}
          value={form.nom}
          onChange={setField("nom")}
          aria-invalid={!!errors.nom}
          aria-describedby={errors.nom ? "err-nom" : undefined}
          autoComplete={t("autocompleteNom")}
          className={inputBase}
          required
        />
        {errors.nom && (
          <p id="err-nom" className={errorText}>
            {errors.nom}
          </p>
        )}
      </div>

      {/* Téléphone */}
      <div className="mb-3 w-80 max-w-md">
        <input
          type="tel"
          name="telephone"
          placeholder={t("telephone")}
          value={form.telephone}
          onChange={setField("telephone")}
          aria-invalid={!!errors.telephone}
          aria-describedby={errors.telephone ? "err-telephone" : undefined}
          autoComplete={t("autocompleteTelephone")}
          className={inputBase}
          required
          inputMode="tel"
        />
        {errors.telephone && (
          <p id="err-telephone" className={errorText}>
            {errors.telephone}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="mb-3 w-80 max-w-md">
        <input
          type="email"
          name="mail"
          placeholder={t("email")}
          value={form.mail}
          onChange={setField("mail")}
          aria-invalid={!!errors.mail}
          aria-describedby={errors.mail ? "err-mail" : undefined}
          autoComplete={t("autocompleteEmail")}
          className={inputBase}
          required
        />
        {errors.mail && (
          <p id="err-mail" className={errorText}>
            {errors.mail}
          </p>
        )}
      </div>

      {/* Mot de passe */}
      <div className="mb-6 w-80 max-w-md">
        <input
          type="password"
          name="mdp"
          placeholder={t("motDePasse")}
          value={form.mdp}
          onChange={setField("mdp")}
          aria-invalid={!!errors.mdp}
          aria-describedby={errors.mdp ? "err-mdp" : "hint-mdp"}
          autoComplete={t("autocompleteMotDePasse")}
          className={inputBase}
          required
        />
        {errors.mdp ? (
          <p id="err-mdp" className={errorText}>
            {errors.mdp}
          </p>
        ) : (
          <p id="hint-mdp" className="mt-1 text-white/60 text-xs">
            {t("indiceMotDePasse")}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-80 max-w-md px-6 py-3 rounded-full font-bold text-gray-900
             bg-gradient-to-r from-yellow-400 to-orange-500
             hover:scale-110 transition-transform duration-300
             shadow-2xl hover:shadow-yellow-500/25 cursor-pointer disabled:opacity-60 disabled:hover:scale-100"
      >
        {loading ? t("inscriptionEnCours") : t("inscription")}
      </button>

      {errors.global && (
        <p className="mt-4 text-red-400 font-medium text-sm" aria-live="polite">
          {errors.global}
        </p>
      )}

      <p className="mt-6 text-white font-medium">
        {t("dejaCmpte")}{" "}
        <Link
          href="/login"
          className="font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent hover:from-indigo-600 hover:to-purple-600 transition-all duration-300"
        >
          {t("connectez")}
        </Link>
      </p>
    </form>
  );
}