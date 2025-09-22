FROM node:18-bullseye

WORKDIR /usr/src/app

COPY .railway.env ./

COPY package*.json ./

RUN apt-get update && apt-get install -y python build-essential

RUN echo "Installing dependencies..."
RUN cat package.json
RUN npm install --verbose && echo "Dependencies installed successfully" || (echo "NPM install failed" && exit 1)
RUN echo "Dependencies installed."

COPY . .

EXPOSE 3000

CMD ["node", "dist/main.js"]