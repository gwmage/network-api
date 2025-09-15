FROM node:16-alpine AS builder

WORKDIR /app/

# Install nix
RUN apk add --no-cache --update alpine-sdk
RUN echo "https://dl-cdn.alpinelinux.org/alpine/v3.18/main" >> /etc/apk/repositories
RUN echo "https://dl-cdn.alpinelinux.org/alpine/v3.18/community" >> /etc/apk/repositories
RUN apk add --no-cache --virtual=build-dependencies curl xz

# Install nix without sudo, using a single-user install to a writable location 
# and setting the necessary environment variables.
ENV NIX_USER_PROFILE_DIR=/nix/.nix-profile
RUN mkdir -m 0755 /nix && chown root:root /nix

COPY . .

# Run the Nix installer.  Use the -f option to bypass the interactive prompt.
RUN sh <(curl -L https://nixos.org/nix/install) --no-daemon --profile $NIX_USER_PROFILE_DIR -f && \
    cp .nixpacks/nixpkgs-unstable.nix . && \
    nix-env -if nixpkgs-unstable.nix && \
    . $NIX_USER_PROFILE_DIR/etc/profile.d/nix.sh && \ # Source the profile after a nix command
    nix-collect-garbage -d

RUN npm run build

# remove development dependencies to slim down the final image
RUN npm prune --production

FROM node:16-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

CMD ["node", "dist/main.js"]