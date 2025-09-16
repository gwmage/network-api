FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "start"]

# Enhanced logging
RUN apk add --no-cache tzdata
ENV TZ=Europe/London

# Log container startup information and environment variables
CMD sh -c "echo 'Container starting...'; env; npm run start"
