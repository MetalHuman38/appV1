import { strict as assert } from 'assert';
import { load } from 'ts-dotenv';

const corsSchemaENV = load({
  /* Load CORS */
  CORS_ORIGIN: String,
  CORS_OPTIONS_SUCCESS_STATUS: Number,
  CORS_CREDENTIALS: Boolean,
  CORS_METHODS: String,
});

// destructure the CORS schema
const {
  CORS_ORIGIN,
  CORS_OPTIONS_SUCCESS_STATUS,
  CORS_CREDENTIALS,
  CORS_METHODS,
} = corsSchemaENV;

// assert that the CORS schema is present
assert.ok(CORS_ORIGIN, 'CORS origin should be present');
assert.ok(
  CORS_OPTIONS_SUCCESS_STATUS,
  'CORS options success status should be present',
);
assert.ok(CORS_CREDENTIALS, 'CORS credentials should be present');
assert.ok(CORS_METHODS, 'CORS methods should be present');


// export the CORS schema
export const corsENV = {
  CORS_ORIGIN,
  CORS_OPTIONS_SUCCESS_STATUS,
  CORS_CREDENTIALS,
  CORS_METHODS,
};

// export the CORS schema
export default {
  corsENV,
};
