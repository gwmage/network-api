FROM node:18

WORKDIR /app

COPY package*.json ./

RUN echo "[START] npm install"
RUN npm install
RUN echo "[END] npm install"

COPY . .

RUN echo "[START] npm run build"
RUN npm run build --verbose
RUN echo "[END] npm run build"
RUN npm ls -al --prod || echo "[INFO] No dependencies in production mode"
RUN du -sh dist
RUN ls -alR dist

RUN ls -al dist

EXPOSE 3000

CMD ["npm", "run", "start:prod"]