# 1. Build Stage
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source code
COPY . .

# Disable Next.js linting and type checking during build
ENV NEXT_PUBLIC_SKIP_ESLINT=true
ENV NEXT_PUBLIC_SKIP_TYPECHECK=true

# Build the Next.js app
RUN npm run build --no-lint

# 2. Run Stage
FROM node:18-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Copy only package files for prod install
COPY package.json package-lock.json ./

# Install production dependencies
RUN npm ci --omit=dev

# Copy required build assets
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Add non-root user (security)
RUN addgroup -S app && adduser -S app -G app
USER app

EXPOSE 3000

CMD ["npm", "start"]
