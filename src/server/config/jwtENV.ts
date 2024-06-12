import { strict as assert } from 'assert';
import { load } from 'ts-dotenv';

const jwtSchemaENV = load({
  /* Load JWT */
  JWT_SECRET: String,
  JWT_EXPIRES_IN: String,
  JWT_REFRESH_SECRET: String,
  JWT_REFRESH_EXPIRES_IN: String,
  JWT_ALGORITHM: String,
  JWT_ISSUER: String,
});

// destructure the JWT schema
const {
  JWT_SECRET,
  JWT_EXPIRES_IN,
  JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRES_IN,
  JWT_ALGORITHM,
  JWT_ISSUER,
} = jwtSchemaENV;

// assert that the JWT schema is present
assert.ok(JWT_SECRET, 'JWT secret should be present');
assert.ok(JWT_EXPIRES_IN, 'JWT expires in should be present');
assert.ok(JWT_REFRESH_SECRET, 'JWT refresh secret should be present');
assert.ok(JWT_REFRESH_EXPIRES_IN, 'JWT refresh expires in should be present');
assert.ok(JWT_ALGORITHM, 'JWT algorithm should be present');
assert.ok(JWT_ISSUER, 'JWT issuer should be present');

// export the JWT schema
export const jwtENV = {
  JWT_SECRET,
  JWT_EXPIRES_IN,
  JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRES_IN,
  JWT_ALGORITHM,
  JWT_ISSUER,
};

// export the JWT schema
export default {
  jwtENV,
};
