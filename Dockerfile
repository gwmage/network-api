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

RUN echo "Installing dependencies..."
RUN cat package.json
RUN npm install --verbose || (echo "Detailed npm install logs:" && npm install --verbose && exit 1) 
RUN echo "Dependencies installed."

COPY . .
RUN echo "Project files copied."

EXPOSE 3000

RUN npm run build \ 
    || (echo "Detailed nest build error logs:\n" && npm run build | tee build_errors.log && exit 1)

CMD ["npm", "run", "start:prod"]