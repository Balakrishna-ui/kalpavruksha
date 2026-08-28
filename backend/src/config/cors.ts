import cors from 'cors';
import { config } from './env';

const origins = config.frontendUrl.split(',');

export const corsOptions: cors.CorsOptions = {
  origin: origins,
  optionsSuccessStatus: 200,
  credentials: true,
};

export const corsMiddleware = cors(corsOptions);
