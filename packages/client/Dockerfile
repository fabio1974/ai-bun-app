# Etapa 1: build com bun
FROM oven/bun:1.1.13 as builder

# Instale o git
RUN apt-get update && apt-get install -y git curl

# Instale o Node.js (exemplo: 22.x)
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apt-get install -y nodejs

WORKDIR /app
COPY . .

WORKDIR /app/packages/client
ENV HUSKY=0
RUN bun install
RUN bun run build

# Etapa 2: serve build estaticamente com nginx
FROM nginx:alpine
COPY --from=builder /app/packages/client/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]