FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN echo "Build completed successfully"

RUN echo "About to execute CMD"
CMD ["node", "dist/main.js"]

