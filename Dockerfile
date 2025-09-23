FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --verbose
RUN ls -al dist

EXPOSE 3000

CMD ["npm", "run", "start:prod"]