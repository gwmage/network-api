FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build -v && echo "Typescript compilation output complete." || (echo "Typescript compilation failed.  See output for details." && exit 1)

EXPOSE 3000

CMD ["npm", "run", "start"]