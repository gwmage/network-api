FROM node:18-bullseye

WORKDIR /usr/src/app

COPY .railway.env ./

COPY package*.json ./

RUN apt-get update && apt-get install -y python build-essential

RUN echo "Installing dependencies..."
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "dist/main.js"]