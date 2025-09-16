FROM node:18.16.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --verbose

RUN npm install -g @nestjs/cli

COPY . .

RUN npm run build

CMD ["node", "dist/main.js"]