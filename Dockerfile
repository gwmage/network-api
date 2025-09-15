FROM node:16-alpine AS builder

WORKDIR /app/

# Install necessary build tools including bash *before* Nix installation
RUN apk add --no-cache --update alpine-sdk
RUN echo "https://dl-cdn.alpinelinux.org/alpine/v3.18/main" >> /etc/apk/repositories
RUN echo "https://dl-cdn.alpinelinux.org/alpine/v3.18/community" >> /etc/apk/repositories
RUN apk add --no-cache --virtual=build-dependencies curl xz coreutils

# Install shadow package for groupadd before Nix installation
RUN apk add --no-cache shadow

# Install nix
RUN echo "https://dl-cdn.alpinelinux.org/alpine/v3.18/main" >> /etc/apk/repositories
RUN echo "https://dl-cdn.alpinelinux.org/alpine/v3.18/community" >> /etc/apk/repositories
# apk add for curl, xz, coreutils is already done above, no need to repeat

# Install nix using the multi-user installer to a writable location
# and setting the necessary environment variables.
ENV NIX_USER_PROFILE_DIR=/home/.nix-profile

# Create the directory.  No need to set permissions as the default user has access
RUN mkdir -p $NIX_USER_PROFILE_DIR

# Copy necessary files including nixpkgs-unstable.nix *before* installing Nix
COPY .nixpacks/ .nixpacks/
COPY package.json .
COPY package-lock.json .

# Download the latest Nix installer script using curl and retry logic.
RUN curl -L --retry 3 --retry-delay 1 https://nixos.org/nix/install -o install-nix.sh

# Make the script executable
RUN chmod +x install-nix.sh

# Source bash explicitly before running the installer
RUN apk add bash

# Run the installer in a non-daemon mode so the environment is available immediately
RUN /bin/bash -c "./install-nix.sh"

# The nix.sh file should now be available after a successful non-daemonized installation. Sourcing it here is redundant and can be removed.
RUN nix-env -iA nixpkgs.nodejs-16_x nixpkgs.yarn nixpkgs.coreutils nixpkgs.git

RUN npm ci --omit=dev
RUN npm run build

# remove development dependencies to slim down the final image
RUN npm prune --production

FROM node:16-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

CMD ["node", "dist/main.js"]