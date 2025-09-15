FROM node:18-alpine

WORKDIR /app

# Install necessary build tools
RUN apk add --no-cache --update git

# Copy package files
COPY package*.json ./

# Install project dependencies
RUN npm cache clean --force 
RUN npm install --verbose

# Copy remaining files
COPY . .

# Build the application
RUN npm run build

CMD ["node", "dist/main.js"]