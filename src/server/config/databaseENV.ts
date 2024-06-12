import { strict as assert } from 'assert';
import { load } from 'ts-dotenv';

const dataSchemaENV = load({
  /* Load Database */
  DB_HOST: String,
  DB_PORT: Number,
  DB_USER: String,
  DB_PASS: String,
  DB_NAME: String,
  DB_SOCKET_PATH: String,
  DB_SOCKET_TIMEOUT: Number,
  DB_COMPRESS: Boolean,
  DB_DEBUG: Boolean,
  DB_PERMIT_LOCAL_INFILE: Boolean,
  DB_TRACE: Boolean,
  DB_CHECK_DUPLICATE: Boolean,
  DB_SSL: Boolean,
  DB_SSL_CA: String,
  DB_SSL_KEY: String,
  DB_SSL_CERT: String,
  DB_CONNECTION_ATTRIBUTES: String,
  DB_CONNECTION_TIMEOUT: Number,
});

const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASS,
  DB_NAME,
  DB_SOCKET_PATH,
  DB_SOCKET_TIMEOUT,
  DB_COMPRESS,
  DB_DEBUG,
  DB_PERMIT_LOCAL_INFILE,
  DB_TRACE,
  DB_CHECK_DUPLICATE,
  DB_SSL,
  DB_SSL_CA,
  DB_SSL_KEY,
  DB_SSL_CERT,
  DB_CONNECTION_ATTRIBUTES,
  DB_CONNECTION_TIMEOUT,
} = dataSchemaENV;

assert.ok(DB_HOST, 'Database host should be present');
assert.ok(DB_PORT, 'Database port should be present');
assert.ok(DB_USER, 'Database user should be present');
assert.ok(DB_PASS, 'Database password should be present');
assert.ok(DB_NAME, 'Database name should be present');

export const databaseENV = {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASS,
  DB_NAME,
  DB_SOCKET_PATH,
  DB_SOCKET_TIMEOUT,
  DB_COMPRESS,
  DB_DEBUG,
  DB_PERMIT_LOCAL_INFILE,
  DB_TRACE,
  DB_CHECK_DUPLICATE,
  DB_CONNECTION_ATTRIBUTES,
  DB_CONNECTION_TIMEOUT,
  DB_SSL,
  DB_SSL_CA,
  DB_SSL_KEY,
  DB_SSL_CERT,
};

export default {
  databaseENV,
  mariadb: {
    ssl: DB_SSL,
    sslOptions: {
      ca: DB_SSL_CA,
      key: DB_SSL_KEY,
      cert: DB_SSL_CERT,
    },
  },
};
