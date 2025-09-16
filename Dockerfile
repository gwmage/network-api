FROM node:18.16.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci -ddd --verbose \
    && echo "npm ci output: $?"

COPY . .

RUN npm run build --verbose

CMD ["npm", "run", "start:prod"]

RUN echo "build finished"

RUN ls -al