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

# Log container startup information, environment variables, and redirect stderr to stdout to a file
CMD sh -c "echo 'Container starting...'; env; ls -la /app; echo 'Running npm start...'; npm run start; echo 'npm start finished.'; cat /app/output.log; echo 'End of logs.' > /app/output.log 2>&1"
