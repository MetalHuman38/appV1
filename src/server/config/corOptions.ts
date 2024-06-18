// Export corOptions object with origin and optionsSuccessStatus properties
require('dotenv').config();
import { corsENV } from './corsEVN';

const corOptions = {
  origin: corsENV.CORS_ORIGIN,
  methods: corsENV.CORS_METHODS,
  credentials: corsENV.CORS_CREDENTIALS,
  optionsSuccessStatus: corsENV.CORS_OPTIONS_SUCCESS_STATUS,
};

export { corOptions };
