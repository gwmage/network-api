FROM node:16-alpine AS runtime # Use a separate tag for the runtime image

WORKDIR /app

# Placeholder for copied nix store

# Set environment variable to ensure nix commands are available
ENV PATH /nix/var/nix/profiles/default/bin:$PATH

# Placeholder for copied files


FROM node:16-alpine AS builder

WORKDIR /app

# Install necessary build tools including bash *before* Nix installation
RUN apk add --no-cache --update alpine-sdk
RUN echo "https://dl-cdn.alpinelinux.org/alpine/v3.18/main" >> /etc/apk/repositories
RUN echo "https://dl-cdn.alpinelinux.org/alpine/v3.18/community" >> /etc/apk/repositories
RUN apk add --no-cache --virtual=build-dependencies curl xz coreutils

# Install shadow package for groupadd before Nix installation (This might not be strictly necessary anymore)
RUN apk add --no-cache shadow

# Install nix
RUN echo "https://dl-cdn.alpinelinux.org/alpine/v3.18/main" >> /etc/apk/repositories
RUN echo "https://dl-cdn.alpinelinux.org/alpine/v3.18/community" >> /etc/apk/repositories

# Install nix using the multi-user installer to a writable location
and setting the necessary environment variables.
ENV NIX_USER_PROFILE_DIR=/home/.nix-profile

# Create the directory.  No need to set permissions as the default user has access
RUN mkdir -p $NIX_USER_PROFILE_DIR

COPY package.json .
COPY package-lock.json .

# Install bash
RUN apk add bash

# Download the latest Nix installer script using curl and retry logic.
RUN curl -L --retry 3 --retry-delay 1 https://nixos.org/nix/install -o install-nix.sh

# Make the script executable
RUN chmod +x install-nix.sh


# Run the installer in daemon mode to handle permissions automatically
# Use -b /home/.nix-profile to specify the installation location explicitly
RUN /bin/bash -c "./install-nix.sh --daemon -b /home/.nix-profile"

# Install Nix packages after the daemon is running. 'nix-env' is deprecated, use 'nix profile install' instead.  Sourcing nix.sh is handled by the daemon.
# Increased delay and added retry logic for more robustness. Retry up to 5 times with 10-second intervals
RUN for i in {1..5}; do while ! [ -S /nix/var/nix/daemon-socket/socket ]; do sleep 10; done && nix profile install nixpkgs#nodejs-16_x nixpkgs#yarn nixpkgs#coreutils nixpkgs#git  && break; if [ $i -eq 5 ]; then exit 1; fi; done

RUN npm ci --omit=dev
RUN npm run build

# remove development dependencies to slim down the final image
RUN npm prune --production


# Now copy from builder stage
COPY --from=builder /nix /nix
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

CMD ["node", "dist/main.js"]