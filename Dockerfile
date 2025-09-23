FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN echo "Starting build process..."

RUN npm run build

RUN echo "Build process completed."

EXPOSE 3000

CMD echo "Starting application..." && npm run start:prod && echo "Application started."