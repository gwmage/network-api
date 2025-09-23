FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY . .

RUN npm run build

# Log the contents of the dist directory
RUN ls -al dist

# Log the contents of specific files in the dist directory (e.g., main.js)
RUN cat dist/src/main.js || echo "dist/src/main.js not found"

# Log the current working directory
RUN pwd

CMD ["node", "dist/src/main.js"]