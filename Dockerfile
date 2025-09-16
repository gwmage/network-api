FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --verbose

COPY . .

RUN npm run build --verbose

EXPOSE 3000

CMD ["node", "dist/main.js"]