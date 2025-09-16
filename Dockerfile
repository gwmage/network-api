FROM node:18-alpine

WORKDIR /app

# Install necessary build tools
RUN apk add --no-cache --update git

# Copy project files
COPY package.json ./
RUN npm install --package-lock-only
COPY package-lock.json ./

# Install project dependencies
RUN npm ci --verbose

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

CMD ["node", "dist/main.js"]