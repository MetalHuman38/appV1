import { createSequelizeInstance } from './sequilizeCon';
import { Sequelize } from 'sequelize';

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
      await sequelize.sync({ force: true });
      console.log('Drop and re-sync db.');
      return sequelize; // Return the Sequelize instance
    } catch (error) {
      console.error('Database connection failed:', error);
      attempts++;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  console.error('Max attempts reached, database connection failed');
  throw new Error('Database connection failed');
}

export default { waitForDB };
