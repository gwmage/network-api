FROM node:18.16.0-alpine3.17

WORKDIR /app

COPY package*.json ./

RUN npm ci --verbose

COPY . .

RUN npm run build

CMD ["node", "dist/main.js"]

RUN echo "Node Version:" && node -v
RUN echo "NPM Version:" && npm -v
RUN echo "OS Details:" && cat /etc/os-release
RUN echo "Environment Variables:" && printenv