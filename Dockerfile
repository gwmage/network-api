FROM node:16

WORKDIR /app

COPY package*.json ./

RUN date +"%Y-%m-%d %H:%M:%S" && echo "Starting npm install"
RUN npm install
RUN date +"%Y-%m-%d %H:%M:%S" && echo "Finished npm install"

RUN date +"%Y-%m-%d %H:%M:%S" && echo "Starting npm install --save-dev typescript"
RUN npm install --save-dev typescript
RUN date +"%Y-%m-%d %H:%M:%S" && echo "Finished npm install --save-dev typescript"

COPY .railway.env ./

COPY . .

# Log before build with timestamp
RUN date +"%Y-%m-%d %H:%M:%S" && echo "Running build command..."
RUN npm run build
# Log after build with timestamp
RUN date +"%Y-%m-%d %H:%M:%S" && echo "Build command executed."

# Run migrations before starting the application
RUN date +"%Y-%m-%d %H:%M:%S" && echo "Starting: npm run typeorm:prod:migration:run"
RUN npm run typeorm:prod:migration:run
RUN date +"%Y-%m-%d %H:%M:%S" && echo "Finished: npm run typeorm:prod:migration:run"

# Log before prestart with timestamp
RUN date +"%Y-%m-%d %H:%M:%S" && echo "Running prestart command..."
# Log prestart command and capture its exit code and output
RUN set -o pipefail && npm run prestart:prod 2>&1 | tee prestart.log ; PRE_EXIT_CODE=$PIPESTATUS ; echo "Prestart command exit code: $PRE_EXIT_CODE" ; if [[ $PRE_EXIT_CODE -ne 0 ]]; then exit $PRE_EXIT_CODE; fi
# Log after prestart with timestamp
RUN date +"%Y-%m-%d %H:%M:%S" && echo "Prestart command executed."

# Log the working directory
RUN pwd

# Log environment variables
RUN env

EXPOSE 3000

# Log before running the startup command with timestamp
RUN date +"%Y-%m-%d %H:%M:%S" && echo "Running startup command..."

# Wrap the startup command in a shell script to capture stderr and exit code
RUN echo "#!/bin/sh\nset -ex\nnpm run start:prod\n" > start.sh
RUN chmod +x start.sh

# Log before the actual command execution
RUN date +"%Y-%m-%d %H:%M:%S" && echo "Starting npm run start:prod"

# Log potential errors during startup
CMD sh -c "/app/start.sh 2>&1 | tee startup.log"

# Log after running the startup command (this may not be reached if command fails) with timestamp
RUN date +"%Y-%m-%d %H:%M:%S" && echo "Startup command executed."

# Add more logging for prestart
RUN date +"%Y-%m-%d %H:%M:%S" && echo "Prestart script content:"
RUN cat start.sh
