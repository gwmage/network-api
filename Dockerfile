FROM node:18.16.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci -dd --verbose \
    && echo "npm ci output: $?"

COPY . .

RUN npm run build

CMD ["npm", "run", "start:prod"]

RUN echo "build finished"