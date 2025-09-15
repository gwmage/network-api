FROM node:16

WORKDIR /app

# Install necessary build tools *before* installing dependencies
RUN apk add --no-cache --update alpine-sdk bash git nodejs npm
RUN echo "https://dl-cdn.alpinelinux.org/alpine/v3.18/main" >> /etc/apk/repositories
RUN echo "https://dl-cdn.alpinelinux.org/alpine/v3.18/community" >> /etc/apk/repositories
RUN apk add --no-cache --virtual=build-dependencies curl xz coreutils

# Copy package files
COPY package.json .

# Install project dependencies
RUN npm install --include=dev --verbose

# Copy remaining files
COPY . .

# Build the application
RUN npm run build

CMD ["node", "dist/main.js"]