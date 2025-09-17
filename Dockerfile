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
RUN ls -al /app/node_modules/.bin
RUN ls -al /app/node_modules/rimraf

COPY . .

RUN echo "Before prebuild"
RUN npm run prebuild --verbose 2>&1 | tee prebuild.log
RUN echo "After prebuild"

RUN npm run build --verbose 2>&1 | tee build.log

COPY Procfile ./

CMD ["npm", "run", "start:prod"]
RUN echo "Command executed: npm run start:prod"
