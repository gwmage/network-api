FROM node:16-alpine AS builder

WORKDIR /app/

# Install nix
RUN apk add --no-cache --update alpine-sdk
RUN echo "https://dl-cdn.alpinelinux.org/alpine/v3.18/main" >> /etc/apk/repositories
RUN echo "https://dl-cdn.alpinelinux.org/alpine/v3.18/community" >> /etc/apk/repositories
RUN apk add --no-cache --virtual=build-dependencies curl xz

# Install nix without sudo, using the --no-daemon flag to prevent issues in Docker
RUN sh <(curl -L https://nixos.org/nix/install) --no-daemon

RUN apk del build-dependencies

COPY .nixpacks/nixpkgs-*.nix .
RUN nix-env -if .nixpacks/nixpkgs-*.nix && nix-collect-garbage -d

COPY . .

RUN npm run build

# remove development dependencies to slim down the final image
RUN npm prune --production

FROM node:16-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

CMD ["node", "dist/main.js"]