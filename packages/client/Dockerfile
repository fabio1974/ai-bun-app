# Etapa 1: build com Bun + npm (corrige @rollup/* e @esbuild/*)
FROM oven/bun:1.1.13 AS builder

# Node/npm (para optional deps)
RUN apt-get update && apt-get install -y --no-install-recommends curl ca-certificates \
 && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
 && apt-get install -y --no-install-recommends nodejs \
 && rm -rf /var/lib/apt/lists/*

# Contexto = RAIZ do monorepo (workflow usa context: .)
WORKDIR /app
COPY . .

# Instala dependências do monorepo sem rodar scripts (evita Husky etc.)
ENV HUSKY=0 CI=1
RUN npm ci --workspaces --include-workspace-root --ignore-scripts \
 || npm install --workspaces --include-workspace-root --ignore-scripts

# 🔧 Workaround: garanta binários nativos de rollup e esbuild (amd64 em ubuntu-latest)
RUN npm i -D @rollup/rollup-linux-x64-gnu @esbuild/linux-x64 --ignore-scripts || true
# 🔧 Reexecuta postinstalls apenas desses pacotes (não dispara Husky)
RUN npm rebuild rollup esbuild --no-package-lock || true

# Build do client
WORKDIR /app/packages/client
RUN npm run build

# Etapa 2: Nginx
FROM nginx:alpine AS runner
COPY --from=builder /app/packages/client/dist /usr/share/nginx/html
COPY packages/client/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
