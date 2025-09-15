# Etapa 1: build com Bun + npm (resolve @rollup/* nativos)
FROM oven/bun:1.1.13 AS builder

# Instala Node/npm (necessário p/ optional deps do Rollup)
RUN apt-get update && apt-get install -y --no-install-recommends curl ca-certificates \
 && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
 && apt-get install -y --no-install-recommends nodejs \
 && rm -rf /var/lib/apt/lists/*

# Contexto do build = RAIZ do monorepo (definido no workflow)
WORKDIR /app
COPY . .

# Desativa hooks e scripts de prepare; instala workspaces
ENV HUSKY=0 CI=1
RUN npm ci --workspaces --include-workspace-root --ignore-scripts \
 || npm install --workspaces --include-workspace-root --ignore-scripts

# 👇 Workaround do bug do npm com optional deps do Rollup
# Garante o pacote nativo para linux/amd64 (Ubuntu do GitHub Actions)
RUN npm i -D @rollup/rollup-linux-x64-gnu --ignore-scripts || true

# Build do client
WORKDIR /app/packages/client
RUN npm run build

# Etapa 2: Nginx servindo estático
FROM nginx:alpine AS runner
COPY --from=builder /app/packages/client/dist /usr/share/nginx/html
COPY packages/client/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
