FROM node:18-alpine

RUN echo "Attempting to download base image..."
RUN echo "Network diagnostics: $(ping -c 3 google.com)"
RUN echo "Base image download complete."

WORKDIR /usr/src/app

COPY .railway.env ./
COPY package*.json ./
RUN echo "package*.json copied."
RUN echo ".railway.env and package*.json copied."
RUN echo "package*.json copied."

RUN apk add --no-cache python3 make g++
RUN echo "Build tools installed."

RUN echo "Installing dependencies..."
RUN cat package.json
RUN echo "Starting npm install..."
RUN npm install --verbose || (echo "Detailed npm install logs:" && npm install --verbose && exit 1) 
RUN echo "Finished npm install."
RUN echo "Dependencies installed."

COPY . .
RUN echo "Project files copied."

EXPOSE 3000

RUN echo "Executing npm run start..."
RUN echo "Before npm run start"
RUN npm run build
RUN echo "After npm run build"
RUN ls -al
RUN echo "Listing files before run start"

CMD ["npm", "run", "start"]