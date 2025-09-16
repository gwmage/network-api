FROM node:20
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

COPY Procfile ./

CMD ["npm", "run", "start:prod"]

# Added logging to capture stdout and stderr during build
RUN npm run build > build.log 2>&1