FROM node:16

WORKDIR /app

COPY package*.json ./

RUN console.log('Installing dependencies...')
RUN npm install
RUN console.log('Dependencies installed.')

COPY . .

RUN console.log('Starting build...')
RUN npm run build
RUN console.log('Build completed.')

EXPOSE 3000

CMD ["npm", "run", "start:prod"]