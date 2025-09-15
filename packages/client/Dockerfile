# Etapa 1: build com Node dentro do workspace do client
FROM node:22-bookworm-slim AS builder
WORKDIR /app/packages/client

# 1) Copia apenas manifestos para cache eficiente
COPY packages/client/package.json ./
# se existir, copie o lockfile correspondente:
# COPY packages/client/package-lock.json ./
# COPY packages/client/pnpm-lock.yaml ./
# COPY packages/client/yarn.lock ./

# 2) Instala deps do CLIENTE (scripts habilitados p/ baixar nativos)
#    -> como instalamos só no client, não roda "prepare" do root (Husky)
RUN npm ci --no-audit --no-fund || npm install --no-audit --no-fund

# 3) Copia o restante do client (src, configs, etc.)
COPY packages/client ./

# 4) Build
ENV HUSKY=0
RUN npm run build

# Etapa 2: Nginx servindo estático
FROM nginx:alpine AS runner
# copia o build
COPY --from=builder /app/packages/client/dist /usr/share/nginx/html
# nginx.conf precisa estar versionado em packages/client/nginx.conf
COPY packages/client/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
