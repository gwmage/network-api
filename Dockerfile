FROM node:20
WORKDIR /app

COPY package*.json ./

RUN echo "Before npm install - checking files"
RUN ls -al
RUN echo "Current working directory:"
RUN pwd
RUN echo "Before npm install"
RUN npm config set registry https://registry.npmjs.org/
RUN npm install --verbose 2>&1 | tee npm_install.log
RUN echo "After npm install"

COPY . .



RUN npm run build --verbose 2>&1 | tee build.log

COPY Procfile ./

CMD ["npm", "run", "start:prod"]