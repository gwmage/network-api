FROM node:20
WORKDIR /app

COPY package*.json ./

RUN echo "Before npm install - checking files"
RUN ls -al
RUN echo "Current working directory:"
RUN pwd
RUN echo "Before npm install"
RUN npm config set registry https://registry.npmjs.org/
RUN npm install --verbose > npm_install.log 2>&1
RUN echo "After npm install"

COPY . .
RUN echo "package-lock.json after install:"
RUN cat package-lock.json || echo "package-lock.json does not exist"


RUN npm run build --verbose > build.log 2>&1

COPY Procfile ./

CMD ["npm", "run", "start:prod"]