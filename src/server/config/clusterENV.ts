import { strict as assert } from 'assert';
import { load } from 'ts-dotenv';

const clusterSchemaENV = load({
  /* Load Cluster */
  CLUSTER: Boolean,
  CLUSTER_PORT: Number,
  CLUSTER_COUNT: Number,
  CLUSTER_RESTART: Boolean,
  CLUSTER_RESTART_LIMIT: Number,
  CLUSTER_RESTART_DELAY: Number,
});

const {
  CLUSTER,
  CLUSTER_PORT,
  CLUSTER_COUNT,
  CLUSTER_RESTART,
  CLUSTER_RESTART_LIMIT,
  CLUSTER_RESTART_DELAY,
} = clusterSchemaENV;

assert.ok(CLUSTER, 'Cluster should be present');
assert.ok(CLUSTER_PORT, 'Cluster port should be present');
assert.ok(CLUSTER_COUNT, 'Cluster count should be present');
assert.ok(CLUSTER_RESTART, 'Cluster restart should be present');
assert.ok(
  CLUSTER_RESTART_LIMIT,
  'Cluster restart backoff limit should be present'
);
assert.ok(
  CLUSTER_RESTART_DELAY,
  'Cluster restart backoff delay should be present'
);

export const clusterENV = {
  CLUSTER,
  CLUSTER_PORT,
  CLUSTER_COUNT,
  CLUSTER_RESTART,
  CLUSTER_RESTART_LIMIT,
  CLUSTER_RESTART_DELAY,
};

export default {
  clusterENV,
};
