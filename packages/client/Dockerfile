# Etapa 1: build (usando Bun + npm para deps do client)
FROM oven/bun:1.1.13 AS builder
WORKDIR /app

# contexto na raiz do repo (ajuste seu workflow para context: .)
COPY . .

# --- CLIENT ---
WORKDIR /app/packages/client
ENV HUSKY=0
# se existe package-lock.json:
RUN npm ci || npm install
# agora o build pode ser com bun ou npm; ambos funcionam
# RUN bun run build
RUN npm run build

# Etapa 2: nginx servindo estático
FROM nginx:alpine AS runner
COPY --from=builder /app/packages/client/dist /usr/share/nginx/html
COPY packages/client/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
