import { createSequelizeInstance } from './sequilizeCon.js';
import { Sequelize } from '@sequelize/core';

export async function waitForDB(): Promise<Sequelize> {
  const sequelize = createSequelizeInstance();

  const maxAttempts = 10; // 10 attempts
  const delay = 1000; // 1 second

  let attempts = 0;
  while (attempts < maxAttempts) {
    try {
      // Test the connection
      await sequelize.authenticate();
      console.log('Database connection established, Starting Server.....');
      // Sync the database
      await sequelize.sync({ force: false });
      console.log('Drop and re-sync db.');
      return sequelize;
    } catch (error) {
      console.error('Database connection failed:', error);
      attempts++;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  if (attempts === maxAttempts) {
    console.error('Max attempts reached, database connection failed');
    throw new Error('Database connection failed');
  } else {
    return sequelize;
  }
}

export default { waitForDB };
