FROM node:18-bullseye

RUN echo "Attempting to download base image..."
RUN echo "Network diagnostics: $(ping -c 3 google.com)"
RUN echo "Base image download complete."

WORKDIR /usr/src/app

COPY .railway.env ./

COPY package*.json ./

RUN apt-get update && apt-get install -y python build-essential

RUN echo "Installing dependencies..."
RUN cat package.json
RUN echo "Starting npm install..."
RUN npm install --verbose || (echo "Detailed npm install logs:" && npm install --verbose && exit 1) 
RUN echo "Finished npm install."
RUN echo "Dependencies installed."

COPY . .

EXPOSE 3000

CMD ["node", "dist/main.js"]