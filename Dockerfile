FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build && echo "TypeScript Build Logs:" && cat ./dist/apps/api/main.js

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
