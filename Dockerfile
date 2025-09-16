FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN echo "Build completed successfully"

RUN ls -al dist

RUN echo "About to execute CMD"
CMD ["node", "-e", "try { console.log('Starting application...'); console.log('Current Working Directory:', process.cwd()); const app = require('./dist/main.js'); console.log('Required main.js'); if (typeof app === 'function' && app.bootstrap) { console.log('Bootstrapping application...'); app.bootstrap().then(() => console.log('Application started.')).catch(error => { console.error('Application bootstrap failed:', error); process.exit(1); }); } else { console.error('Invalid application entry point: "dist/main.js" does not export a bootstrap function.'); process.exit(1); } } catch (error) { console.error('Application startup failed:', error); process.exit(1); } "]
