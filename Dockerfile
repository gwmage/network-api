FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN echo "Build completed successfully"

CMD ["npm", "run", "start"]