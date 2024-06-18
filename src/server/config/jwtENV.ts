import { strict as assert } from 'assert';
import { load } from 'ts-dotenv';

const jwtSchemaENV = load({
  /* Load JWT */
  JWT_SECRET: String,
  JWT_EXPIRES_IN: String,
  JWT_REFRESH_SECRET: String,
  JWT_REFRESH_EXPIRES_IN: String,
  JWT_REFRESH_MAX_AGE: Number,
  JWT_ALGORITHM: String,
  JWT_ISSUER: String,
  JWT_MAX_AGE: Number,
  JWT_HTTP_ONLY: Boolean,
  JWT_SAME_SITE: String,
  JWT_COOKIE_NAME: String,
  JWT_SECURE: Boolean,
});

// destructure the JWT schema
const {
  JWT_SECRET,
  JWT_EXPIRES_IN,
  JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRES_IN,
  JWT_REFRESH_MAX_AGE,
  JWT_ALGORITHM,
  JWT_ISSUER,
  JWT_MAX_AGE,
  JWT_HTTP_ONLY,
  JWT_SAME_SITE,
  JWT_COOKIE_NAME,
  JWT_SECURE,
} = jwtSchemaENV;

// assert that the JWT schema is present
assert.ok(JWT_SECRET, 'JWT secret should be present');
assert.ok(JWT_EXPIRES_IN, 'JWT expires in should be present');
assert.ok(JWT_REFRESH_SECRET, 'JWT refresh secret should be present');
assert.ok(JWT_REFRESH_EXPIRES_IN, 'JWT refresh expires in should be present');
assert.ok(JWT_ALGORITHM, 'JWT algorithm should be present');
assert.ok(JWT_ISSUER, 'JWT issuer should be present');
assert.ok(JWT_MAX_AGE, 'JWT max age should be present');
assert.ok(JWT_HTTP_ONLY, 'JWT http only should be present');
assert.ok(JWT_SAME_SITE, 'JWT same site should be present');
assert.ok(JWT_COOKIE_NAME, 'JWT cookie name should be present');
assert.ok(JWT_SECURE, 'JWT secure should be present');
assert.ok(JWT_REFRESH_MAX_AGE, 'JWT refresh max age should be present');

// export the JWT schema
export const jwtENV = {
  JWT_SECRET,
  JWT_EXPIRES_IN,
  JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRES_IN,
  JWT_REFRESH_MAX_AGE,
  JWT_ALGORITHM,
  JWT_ISSUER,
  JWT_MAX_AGE,
  JWT_HTTP_ONLY,
  JWT_SAME_SITE,
  JWT_COOKIE_NAME,
  JWT_SECURE,
};

// export the JWT schema
export default {
  jwtENV,
};
