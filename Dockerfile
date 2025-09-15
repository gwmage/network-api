FROM node:16-alpine AS builder

WORKDIR /app/

# Install nix
RUN apk add --no-cache --update alpine-sdk
RUN echo "https://dl-cdn.alpinelinux.org/alpine/v3.18/main" >> /etc/apk/repositories
RUN echo "https://dl-cdn.alpinelux.org/alpine/v3.18/community" >> /etc/apk/repositories
RUN apk add --no-cache --virtual=build-dependencies curl xz coreutils

# Install nix without sudo, using a single-user install to a writable location 
# and setting the necessary environment variables.
ENV NIX_USER_PROFILE_DIR=/home/.nix-profile
RUN mkdir -p $NIX_USER_PROFILE_DIR

# Copy necessary files including nixpkgs-unstable.nix *before* installing Nix
COPY .nixpacks/ .nixpacks/
COPY package.json .
COPY package-lock.json .

# Run the Nix installer. Removing --profile flag so it defaults to single user profile location.
# The --no-daemon flag is added to ensure the daemon isn't started which can cause conflicts
RUN sh <(curl -L https://nixos.org/nix/install) --yes --no-daemon \
    && . /home/.nix-profile/etc/profile.d/nix.sh     \
    && nix-env -if ./.nixpacks/nixpkgs-unstable.nix \
    && nix-collect-garbage -d


RUN npm run build

# remove development dependencies to slim down the final image
RUN npm prune --production

FROM node:16-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

CMD ["node", "dist/main.js"]