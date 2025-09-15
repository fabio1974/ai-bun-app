# Etapa 1: build com Bun + npm (resolve @rollup/* nativos)
FROM oven/bun:1.1.13 AS builder

# Instala Node/npm (necessário p/ optional deps do Rollup)
RUN apt-get update && apt-get install -y --no-install-recommends curl ca-certificates \
 && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
 && apt-get install -y --no-install-recommends nodejs \
 && rm -rf /var/lib/apt/lists/*

# Contexto do build = RAIZ do monorepo (ajustado no workflow)
WORKDIR /app
COPY . .

# Desativa husky e quaisquer scripts de instalação no monorepo
ENV HUSKY=0 CI=1
# Se seu repo usa workspaces, esses flags garantem a instalação p/ todos
RUN npm ci --workspaces --include-workspace-root --ignore-scripts \
 || npm install --workspaces --include-workspace-root --ignore-scripts

# Build do client
WORKDIR /app/packages/client
RUN npm run build

# Etapa 2: Nginx servindo estático
FROM nginx:alpine AS runner
COPY --from=builder /app/packages/client/dist /usr/share/nginx/html
COPY packages/client/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
