import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getConnection } from 'typeorm';

async function bootstrap() {
  console.log("Starting bootstrap...");
  try {
    const app = await NestFactory.create(AppModule);
    console.log("NestFactory created...");
    await app.listen(3000);
    console.log("App listening on port 3000...");
  } catch (error) {
    console.error("Error during bootstrap:", error);
  }
  try {
    console.log("Starting bootstrap...");
    console.log("1 - Before NestFactory.create");
    console.log("Environment Variables:", process.env);
    console.log("DATABASE_URL:", process.env.DATABASE_URL);
    console.log("TYPEORM_URL:", process.env.TYPEORM_URL);
    console.log("TYPEORM_CONNECTION:", process.env.TYPEORM_CONNECTION);

    try {
      const app = await NestFactory.create(AppModule);
      console.log("2 - NestFactory created...");

      app.use((req, res, next) => {
        console.log('Request received:', req);
        next();
      });

      const port = process.env.PORT || 3000; 
      console.log('3 - Port set to:', port);

      try {
        console.log("4 - Before app.listen");
        await app.listen(port, '0.0.0.0', async () => {
          console.log('5 - Listening on port:', port);
          try {
            console.log("Attempting to get database connection...");
            try {
              const connection = await getConnection();
              console.log("Connection object:", connection);
              if (connection.isConnected) {
                console.log('Database connection established successfully!');
              } else {
                console.error('Database connection failed!');
                console.error("Connection object:", connection);
              }
            } catch (error) {
              console.error('Error checking database connection:', error);
              console.error('Error stack:', error.stack);
              throw error; // Re-throw the error to prevent startup
            }
            const connection = await getConnection(); 
            console.log("Connection object:", connection);
            if (connection.isConnected) {
              console.log('Database connection established successfully!');
            } else {
              console.error('Database connection failed!');
              console.error("Connection object:", connection);
            }
          } catch (error) {
            console.error('Error checking database connection:', error);
            console.error('Error stack:', error.stack);
          }
            if (connection.isConnected) {
              console.log('Database connection established successfully!');
            } else {
              console.error('Database connection failed!');
            }
          } catch (error) {
            console.error('Error checking database connection:', error.stack);
          }
        });
        console.log("6 - After app.listen");
        console.log("Application started successfully.");
      } catch (error) {
        console.error("Error starting server:", error.stack);
        process.exit(1);
      }

    } catch (error) {
      console.error("Error creating Nest app:", error.stack); 
      process.exit(1);
    }

  } catch (error) {
        console.error("13 - Error during bootstrap:", error.stack);
        process.exit(1);
  }
}

bootstrap();
