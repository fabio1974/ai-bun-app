# Etapa 1: build com bun
FROM oven/bun:1.1.13 AS builder

# (opcional) git/curl só se realmente precisar em build
RUN apt-get update && apt-get install -y --no-install-recommends git curl \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app
# Como o contexto é a raiz, isso traz todo o monorepo
COPY . .

WORKDIR /app/packages/client
ENV HUSKY=0
RUN bun install
RUN bun run build

# Etapa 2: Nginx servindo estático
FROM nginx:alpine
COPY --from=builder /app/packages/client/dist /usr/share/nginx/html
COPY packages/client/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]