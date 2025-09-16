FROM node:18.16.0-alpine3.17

WORKDIR /app

COPY package*.json ./

RUN npm ci --verbose --verbose --loglevel verbose

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]