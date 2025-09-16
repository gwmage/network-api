FROM node:20
WORKDIR /app

COPY package*.json ./

RUN echo "Before npm install"
RUN npm install --verbose > npm_install.log 2>&1
RUN echo "After npm install"

COPY . .

RUN npm run build --verbose > build.log 2>&1

COPY Procfile ./

CMD ["npm", "run", "start:prod"]
