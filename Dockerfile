FROM node:18.16.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --verbose

COPY . .

RUN npm run build

CMD ["node", "dist/main.js"]