FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Log the working directory
RUN pwd

# Log environment variables
RUN env

EXPOSE 3000

# Log before running the startup command
RUN echo "Running startup command..."
CMD ["npm", "run", "start:prod"]

# Log after running the startup command (this may not be reached if command fails)
RUN echo "Startup command executed."