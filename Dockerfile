FROM node:18-alpine

RUN echo "Attempting to download base image..."
RUN echo "Network diagnostics: $(ping -c 3 google.com)"
RUN echo "Base image download complete."

WORKDIR /usr/src/app

COPY .railway.env ./
COPY package*.json ./
RUN echo ".railway.env and package*.json copied."

RUN apk add --no-cache python3 make g++
RUN echo "Build tools installed."

RUN echo "Before COPY . . command"
COPY . .
RUN echo "After COPY . . command"

RUN echo "Installing dependencies..."
RUN cat package.json
RUN echo "Before npm install"
RUN npm install --verbose || (echo "Detailed npm install logs:" && npm install --verbose && exit 1) 
RUN echo "After npm install"

EXPOSE 3000

RUN echo "Starting NestJS build..."
RUN npm run build --if-present 2>&1 && echo "Build successful" || (echo "Detailed nest build error logs: exit code: $?\nFull verbose logs: " && npm --prefix ./node_modules/@nestjs/cli run build --verbose 2>&1 && exit 1)
RUN echo "NestJS build complete."

CMD sh -c "npm run start:prod > /dev/stdout 2> /dev/stderr"