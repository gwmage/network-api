FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build -v && echo "Typescript compilation output complete." || (echo "Typescript compilation failed.  See output for details." && exit 1)
ENV PORT 3000

EXPOSE 3000

CMD ["/bin/bash", "-c", "node dist/main.js && curl http://localhost:3000"]
