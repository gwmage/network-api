FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

# Enhanced logging
RUN apk add --no-cache tzdata
ENV TZ=Europe/London

CMD npm run start > /app/output.log 2>&1
RUN ls -la /app