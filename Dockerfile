FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN echo "Starting build process..."

RUN npm run build

RUN echo "Build process completed."

EXPOSE 3000

CMD echo "Before start:prod" && npm run start:prod && echo "After start:prod" && sleep 10 && curl -f http://localhost:3000 || exit 1