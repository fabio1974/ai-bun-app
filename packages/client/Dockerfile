# Etapa 1: build com Bun + npm (para resolver @rollup/* nativos)
FROM oven/bun:1.1.13 AS builder

# Instala Node/npm (necessário para optional deps do Rollup)
RUN apt-get update && apt-get install -y --no-install-recommends curl ca-certificates \
 && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
 && apt-get install -y --no-install-recommends nodejs \
 && rm -rf /var/lib/apt/lists/*

# Contexto do build deve ser a RAIZ do monorepo (definido no workflow)
WORKDIR /app
COPY . .

# Build do client
WORKDIR /app/packages/client
ENV HUSKY=0
RUN npm ci || npm install
RUN npm run build

# Etapa 2: Nginx servindo estático
FROM nginx:alpine AS runner
COPY --from=builder /app/packages/client/dist /usr/share/nginx/html
COPY packages/client/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
