FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npx node -e "console.log('Installing dependencies...'); npm install; console.log('Dependencies installed.')"

COPY . .

RUN npm run build

EXPOSE 3000

RUN echo "Starting application..."
CMD ["npm", "run", "start:prod"]
RUN echo "Application started."