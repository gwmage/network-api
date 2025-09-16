FROM node:18-alpine

WORKDIR /app

# Install necessary build tools
RUN apk add --no-cache --update git

# Copy project files
COPY . .

# Install project dependencies
COPY package*.json ./
RUN npm install --only=production --verbose

# Build the application
RUN npm run build

CMD ["node", "dist/main.js"]