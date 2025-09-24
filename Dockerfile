FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install --save-dev typescript

COPY .railway.env ./

COPY . .

# Log before build
RUN echo "Running build command..."
RUN npm run build
# Log after build
RUN echo "Build command executed."

# Log before prestart
RUN echo "Running prestart command..."
RUN npm run prestart:prod
# Log after prestart
RUN echo "Prestart command executed."

# Log the working directory
RUN pwd

# Log environment variables
RUN env

EXPOSE 3000

# Log before running the startup command
RUN echo "Running startup command..."

# Wrap the startup command in a shell script to capture stderr
RUN echo "#!/bin/sh\nset -ex\nnpm run start:prod\n" > start.sh
RUN chmod +x start.sh
CMD ["/app/start.sh"]

# Log after running the startup command (this may not be reached if command fails)
RUN echo "Startup command executed."