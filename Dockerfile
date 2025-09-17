FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN echo "Installing dependencies..."
RUN npm install

COPY . .

RUN echo "Building app..."
RUN npm run build

EXPOSE 3000

RUN echo "Before starting app..."
CMD ["npm", "run", "start:prod"]
RUN echo "After starting app..."