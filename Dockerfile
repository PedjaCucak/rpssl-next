# 1) deps
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml* package-lock.json* yarn.lock* ./
RUN \
  if [ -f pnpm-lock.yaml ]; then corepack enable && corepack prepare pnpm@latest --activate && pnpm i --frozen-lockfile; \
  elif [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  else npm ci; fi

# 2) builder
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN \
  if [ -f pnpm-lock.yaml ]; then corepack enable && pnpm build; \
  elif [ -f yarn.lock ]; then yarn build; \
  else npm run build; fi

# 3) runner
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# Next.js needs these
ENV PORT=3000
EXPOSE 3000

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY package.json ./

# install prod deps only (if any)
RUN \
  if [ -f pnpm-lock.yaml ]; then corepack enable && corepack prepare pnpm@latest --activate && pnpm i --prod --frozen-lockfile; \
  elif [ -f yarn.lock ]; then yarn --production --frozen-lockfile; \
  else npm ci --omit=dev; fi

CMD ["node", ".next/standalone/server.js"]
