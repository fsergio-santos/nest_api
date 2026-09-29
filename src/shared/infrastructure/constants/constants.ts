import * as dotenv from 'dotenv';

dotenv.config();

export const APP_NAME = process.env.APP_NAME || 'Sistema';
export const APP_PORT = parseInt(process.env.PORT || '8000', 10);
export const APP_HOST = process.env.APP_HOST || '0.0.0.0';
export const NODE_ENV = process.env.NODE_ENV || 'development';
