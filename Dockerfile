FROM node:18.16.0-alpine3.17

WORKDIR /app

# Install dependencies first, before copying application files, with verbose logging.
COPY package*.json ./
RUN npm ci --verbose --loglevel verbose

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Expose the port that the app listens on
EXPOSE 3000

# Start the application
CMD [ "node", "dist/main.js" ]
