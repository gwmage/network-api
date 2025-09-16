FROM node:18.16.0-alpine3.17

WORKDIR /app

COPY package.json .dockerignore ./
RUN npm install

COPY . .

RUN npm run build

RUN ls -l dist

CMD ["node", "dist/main.js"]