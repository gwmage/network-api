FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN echo "Build completed successfully"

RUN ls -al dist

RUN echo "About to execute CMD"
CMD ["node", "-e", "try { console.log('Starting application...'); require('./dist/main.js'); console.log('Application started.'); } catch (error) { console.error('Application startup failed:', error); } "]
