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
  RARE_LIMIT_TIME: Number,
  RARE_LIMIT_WINDOW_MS: Number,
  MAX: Number,
  RARE_LIMIT_MESSAGE: String,
  RARE_LIMIT_CODE: Number,
  TRUST_PROXY: Boolean,
  NUMBER_OF_PROXIES: Number,
  IDLE_TIMEOUT: Number,
  COMPRESSION_LEVEL: Number,
  COMPRESSION_THRESHOLD: Number,
  ERROR_TIMEOUT: Number,

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
  RARE_LIMIT_TIME,
  RARE_LIMIT_WINDOW_MS,
  RESPONSE_ERROR_CODE,
  MAX,
  RARE_LIMIT_MESSAGE,
  RARE_LIMIT_CODE,
  TRUST_PROXY,
  NUMBER_OF_PROXIES,
  IDLE_TIMEOUT,
  COMPRESSION_LEVEL,
  COMPRESSION_THRESHOLD,
  ERROR_TIMEOUT,
} = env;

if (RESPONSE_ERROR_CODE === 500) {
  throw new Error('Internal Server Error! No env file found!');
}

assert.ok(TRACING, 'Tracing should be true');
assert.ok(PORT === 8081, 'Port should be 8081');
assert.ok(NODE_ENV === 'production', 'Node environment should be production');
assert.ok(BASE_URL === 'http://localhost:8081', 'Base URL should be correct');
assert.ok(
  BASE64_ENCODED.equals(Buffer.from('🚀')),
  'Base64 encoded value should match',
);
assert.ok(EXTRA === 'true', 'Extra should be true');
assert.ok(RARE_LIMIT_TIME === 900000, 'Rate limit time should be 15m');
assert.ok(RARE_LIMIT_WINDOW_MS === 900000, 'Rate limit window should be 15m');
assert.ok(MAX === 100, 'Max should be 100');
assert.ok(RARE_LIMIT_MESSAGE, 'Too many requests, please try again later');
assert.ok(RARE_LIMIT_CODE === 429, 'Rate limit code should be 429');
assert.ok(TRUST_PROXY, 'Trust proxy should be true initially');
assert.ok(NUMBER_OF_PROXIES === 1, 'Number of proxies should be 1');
assert.ok(IDLE_TIMEOUT === 480000, 'Idle timeout should be 8m');
assert.ok(COMPRESSION_LEVEL === 6, 'Compression level should be 6');
assert.ok(
  COMPRESSION_THRESHOLD === 1024,
  'Compression threshold should be 1024',
);
assert.ok(ERROR_TIMEOUT === 5000, 'Error timeout should be 5s');

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
  rateLimitTime: RARE_LIMIT_TIME,
  rateLimitWindowMs: RARE_LIMIT_WINDOW_MS,
  max: MAX,
  message: RARE_LIMIT_MESSAGE,
  rateLimitCode: RARE_LIMIT_CODE,
  trustProxy: TRUST_PROXY,
  numberOfProxies: NUMBER_OF_PROXIES,
  idleTimeout: IDLE_TIMEOUT,
  compressionLevel: COMPRESSION_LEVEL,
  errorTimeout: ERROR_TIMEOUT,
  logs: {
    morgan: MORGAN,
  },
};

export { env };
