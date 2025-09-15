FROM node:16-alpine

WORKDIR /app

# Copy package files first
COPY package.json .
COPY package-lock.json .

# Install project dependencies
RUN npm ci --omit=dev

# Install necessary build tools *after* installing dependencies
RUN apk add --no-cache --update alpine-sdk bash git
RUN echo "https://dl-cdn.alpinelinux.org/alpine/v3.18/main" >> /etc/apk/repositories
RUN echo "https://dl-cdn.alpinelinux.org/alpine/v3.18/community" >> /etc/apk/repositories
RUN apk add --no-cache --virtual=build-dependencies curl xz coreutils

# Build the application
RUN npm run build

# Copy remaining files after building
COPY . .

CMD ["node", "dist/main.js"]