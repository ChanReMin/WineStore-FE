# ---------- Base image ----------
FROM node:20-alpine AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# ---------- Dependencies layer ----------
FROM base AS deps
# Enable Corepack for Yarn
RUN corepack enable
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# ---------- Builder layer ----------
FROM base AS builder
# Enable Corepack for Yarn
RUN corepack enable
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# .env will be provided by CodeBuild before docker build
RUN yarn build

# ---------- Runtime layer ----------
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# No dev deps needed at runtime
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Optional: drop root privileges
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs
USER nextjs

EXPOSE 3000

# Standalone build generates server.js at the root of the standalone dir
CMD ["node", "server.js"]
