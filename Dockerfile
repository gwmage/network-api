FROM node:18-alpine

WORKDIR /app

# Install necessary build tools
RUN apk add --no-cache --update git

# Copy only necessary files for dependency installation
COPY package*.json ./

# Install project dependencies
RUN npm ci --verbose

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

CMD ["node", "dist/main.js"]