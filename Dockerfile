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

# Combine installation, PATH update, and subsequent commands into a single RUN command
# The $NIX_USER_PROFILE_DIR variable is problematic in the cp command as it's part of a longer path.
# Copying the nixpkgs-unstable.nix file to the workdir first avoids complex pathing issues within the chained command.
RUN sh <(curl -L https://nixos.org/nix/install) --no-daemon --profile $NIX_USER_PROFILE_DIR \
    && export PATH=$NIX_USER_PROFILE_DIR/bin:$PATH \
    && cp .nixpacks/nixpkgs-unstable.nix . \
    && nix-env -if nixpkgs-unstable.nix \
    && nix-collect-garbage -d

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