// Export corOptions object with origin and optionsSuccessStatus properties
import { env } from './index';

const corOptions = {
  origin: env.CORS_ORIGIN,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS',
  credentials: true,
  optionsSuccessStatus: env.RESPONSE_CODE,
};

export { corOptions };
