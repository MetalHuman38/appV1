import NodeCache from 'node-cache';

export const appCache = new NodeCache({ stdTTL: 3600, checkperiod: 120 }); // Cache entries expire after 1 hour

export default { appCache };
