FROM node:16-alpine

WORKDIR /app

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

# Install nix using the multi-user installer
ENV NIX_USER_PROFILE_DIR=/home/.nix-profile
RUN mkdir -p $NIX_USER_PROFILE_DIR

# Install bash (required for running the Nix installer)
RUN apk add bash

COPY package.json .
COPY package-lock.json .

# Download the latest Nix installer script using curl and retry logic.
RUN curl -L --retry 3 --retry-delay 1 https://nixos.org/nix/install -o install-nix.sh

# Make the script executable
RUN chmod +x install-nix.sh

RUN /bin/bash -c "./install-nix.sh --daemon -b /home/.nix-profile"

RUN for i in {1..5}; do while ! [ -S /nix/var/nix/daemon-socket/socket ]; do sleep 10; done && nix profile install nixpkgs#nodejs-16_x nixpkgs#yarn nixpkgs#coreutils nixpkgs#git  && break; if [ $i -eq 5 ]; then exit 1; fi; done

# Install project dependencies and build
RUN npm ci --omit=dev
RUN npm run build

COPY dist ./dist
COPY package.json ./package.json

# Copy node_modules BEFORE pruning
COPY node_modules ./node_modules

# remove development dependencies
RUN npm prune --production

CMD ["node", "dist/main.js"]