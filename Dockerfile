FROM node:16-alpine AS builder

WORKDIR /app/

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