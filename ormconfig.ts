import { DataSource } from 'typeorm';
import { User } from './src/modules/users/entities/user.entity';

export default new DataSource({
  type: 'postgres',
  url: process.env.TYPEORM_CONNECTION, // Use the environment variable
  entities: [User], // List your entities here
  synchronize: true, // Set to false in production
  logging: true, // Enable logging
});
