import CredentialsProvider from "next-auth/providers/credentials";
import crypto from "crypto";
import { prisma } from "@/lib/db";
import { NextAuthOptions } from "next-auth";
import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      worker?: boolean;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    worker?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    uid?: string;
    worker?: boolean;
  }
}

// mêmes paramètres que lors de l'inscription
const SCRYPT_PARAMS = { N: 8192, r: 8, p: 1 } as const;
const KEYLEN = 32;

function verifyPasswordScrypt(
  password: string,
  saltHex: string,
  storedHashHex: string
): boolean {
  const appSalt = Buffer.from(saltHex, "hex");
  const derived = crypto.scryptSync(password, appSalt, KEYLEN, SCRYPT_PARAMS); // Buffer
  const dbHash = Buffer.from(storedHashHex, "hex");
  if (derived.length !== dbHash.length) return false;
  return crypto.timingSafeEqual(derived, dbHash);
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: "/login" },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 heures
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.trim().toLowerCase();
        const password = credentials?.password ?? "";
        if (!email || !password) return null;

        const user = await prisma.users.findFirst({
          where: { mail: email },
          select: {
            id: true,
            nom: true,
            prenom: true,
            mail: true,
            password: true,
            salt: true,
            worker: true,
          },
        });
        if (!user?.password || !user?.salt) return null;
        const ok = verifyPasswordScrypt(password, user.salt, user.password);
        if (!ok) return null;
        return {
          id: String(user.id),
          name: `${user.prenom ?? ""} ${user.nom ?? ""}`.trim(),
          email: user.mail,
          worker: user.worker,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.uid = user.id;
        token.email = user.email;
        token.name = user.name;
        token.worker = user.worker;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.uid ?? "";
      }
      return session;
    },
  },
};
