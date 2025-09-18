FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN echo "Installing dependencies..."
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "build", "&&", "node", "dist/main.js"]