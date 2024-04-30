import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV,
  BCRYPT_SALT_ROUNDS: process.env.bycryptSalt,
  JWT_SECRET: process.env.JWT_SECRET,
};
