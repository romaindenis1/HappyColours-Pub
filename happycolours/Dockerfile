# Étape 1: Dépendances
FROM node:20-alpine AS deps
WORKDIR /app

# Copier les fichiers de package
COPY package*.json ./
COPY prisma ./prisma/

# Installer les dépendances
RUN npm ci

# Étape 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Copier les dépendances depuis deps
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV DATABASE_URL="mysql://root:root@host.docker.internal:3306/colours"

# Générer Prisma Client
RUN npx prisma generate

RUN npm run buildx

# Étape 3: Runner (production)
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Créer un utilisateur non-root
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

# Copier les fichiers nécessaires
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/package*.json ./

#créer le dossier cache et ajuster les droits
RUN mkdir -p /app/.next/cache && chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Commande de démarrage avec migration Prisma
CMD ["sh", "-c", "npx prisma migrate deploy && node server.js"]
