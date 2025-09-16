FROM node:18.16.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --verbose

COPY . .

RUN npm run build

CMD ["node", "dist/main.js"]

# Adding debug logs to understand build context and dependency installation
RUN echo "Current working directory contents:"
RUN ls -al
RUN echo "Node Modules directory contents after npm ci:"
RUN ls -al node_modules