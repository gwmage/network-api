FROM node:18-alpine

WORKDIR /app

# Install necessary build tools
RUN apk add --no-cache --update git

# Copy project files
COPY . .

# Copy package files
COPY package*.json ./

# Install project dependencies
RUN npm install --verbose

# Build the application
RUN npm run build

CMD ["node", "dist/main.js"]