FROM node:16-alpine

WORKDIR /app

# Install necessary build tools *before* installing dependencies
RUN apk add --no-cache --update alpine-sdk bash git
RUN echo "https://dl-cdn.alpinelinux.org/alpine/v3.18/main" >> /etc/apk/repositories
RUN echo "https://dl-cdn.alpinelinux.org/alpine/v3.18/community" >> /etc/apk/repositories
RUN apk add --no-cache --virtual=build-dependencies curl xz coreutils

# Copy package files
COPY package.json .
COPY package-lock.json .

# Install project dependencies
RUN npm ci --omit=dev

# Build the application
COPY . .
RUN npm run build

CMD ["node", "dist/main.js"]