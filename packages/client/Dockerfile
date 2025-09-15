# Etapa 1: build com Bun + npm (corrige @rollup/*, @esbuild/* e lightningcss)
FROM oven/bun:1.1.13 AS builder

# Node/npm
RUN apt-get update && apt-get install -y --no-install-recommends curl ca-certificates \
 && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
 && apt-get install -y --no-install-recommends nodejs \
 && rm -rf /var/lib/apt/lists/*

# Contexto = RAIZ (workflow usa context: .)
WORKDIR /app
COPY . .

# Instala deps sem scripts (evita Husky)
ENV HUSKY=0 CI=1
RUN npm ci --workspaces --include-workspace-root --ignore-scripts \
 || npm install --workspaces --include-workspace-root --ignore-scripts

# 🔧 Garante binários nativos para o runner do GitHub (linux/amd64 glibc)
RUN npm i -D @rollup/rollup-linux-x64-gnu @esbuild/linux-x64 lightningcss-linux-x64-gnu --ignore-scripts || true
RUN npm rebuild rollup esbuild lightningcss --no-package-lock || true

# Build do client
WORKDIR /app/packages/client
RUN npm run build

# Etapa 2: Nginx
FROM nginx:alpine AS runner
COPY --from=builder /app/packages/client/dist /usr/share/nginx/html
COPY packages/client/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]

