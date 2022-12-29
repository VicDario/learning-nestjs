import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  database: {
    name: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT,
  },
  mongoUrl: process.env.MONGO_URI,
  apiKey: process.env.API_KEY,
  port: process.env.PORT,
}));
