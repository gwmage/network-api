FROM node:18.16.0-alpine3.17

WORKDIR /app

COPY package*.json package-lock.json .dockerignore ./
RUN npm ci --verbose
COPY . .

RUN npm install

RUN npm run build

RUN ls -l dist

CMD ["node", "dist/main.js"]