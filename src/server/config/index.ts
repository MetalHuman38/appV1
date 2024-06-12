import { strict as assert } from 'assert';
import { load } from 'ts-dotenv';

const env = load({
  PORT: Number,
  NODE_ENV: ['production' as const, 'development' as const],
  MORGAN: ['combined' as const, 'dev' as const, 'tiny' as const],
  APP_NAME: String,
  BASE_URL: String,
  BASE64_ENCODED: Buffer,
  TRACING: Boolean,
  EXTRA: String,

  /* Router Response */
  RESPONSE_STATUS: String,
  RESPONSE_MESSAGE: String,
  RESPONSE_CODE: Number,
  RESPONSE_ERROR_CODE: Number,
  RESPONSE_ERROR_MESSAGE: String,
  RESPONSE_SERVER_ERROR: String,
  RESPONSE_ERROR_STATUS: String,
  RESPONSE_ERROR_DATA: String,
  RESPONSE_ERROR_STACK: String,
  RESPONSE_ERROR_NAME: String,

  /* Load CORS */
  CORS_ORIGIN: String,
});

const {
  APP_NAME,
  TRACING,
  PORT,
  MORGAN,
  NODE_ENV,
  BASE_URL,
  BASE64_ENCODED,
  EXTRA,
  RESPONSE_ERROR_CODE,
} = env;

if (RESPONSE_ERROR_CODE === 500) {
  throw new Error('Internal Server Error! No env file found!');
}

assert.ok(TRACING, 'Tracing should be true');
assert.ok(PORT === 8081, 'Port should be 8081');
assert.ok(NODE_ENV === 'production', 'Node environment should be production');
assert.ok(
  BASE_URL === 'https://api/localhost:8081',
  'Base URL should be correct',
);
assert.ok(
  BASE64_ENCODED.equals(Buffer.from('🚀')),
  'Base64 encoded value should match',
);
assert.ok(EXTRA === 'true', 'Extra should be true');

if (!/^[a-zA-Z0-9-.]+$/.test(APP_NAME)) {
  throw new Error(`Invalid APP_NAME: ${APP_NAME}`);
}

export default {
  port: PORT,
  appName: APP_NAME,
  baseUrl: BASE_URL,
  base64Encoded: BASE64_ENCODED,
  tracing: TRACING,
  extra: EXTRA,
  logs: {
    morgan: MORGAN,
  },
};

export { env };
