FROM node:18-bullseye

RUN echo "Attempting to download base image..."
RUN echo "Network diagnostics: $(ping -c 3 google.com)"
RUN echo "Base image download complete."

WORKDIR /usr/src/app

COPY .railway.env ./

COPY package*.json ./

RUN apt-get update && apt-get install -y python build-essential

RUN echo "Installing dependencies..."
RUN npm install --verbose
RUN echo "Dependencies installed."

COPY . .

EXPOSE 3000

CMD ["node", "dist/main.js"]