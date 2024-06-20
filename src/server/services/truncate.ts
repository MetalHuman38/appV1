import { createSequelizeInstance } from '../loaders/dataLoader/sequilizeCon.js';
import ImageStorages from '../models/image.model.js';

// Define Instance of Sequelize
const sequelize = createSequelizeInstance();

export async function truncateTables() {
  try {
    await sequelize.transaction(async transaction => {
      await ImageStorages.truncate({ transaction });
    });
    console.log('Tables have been truncated...');
  } catch (error) {
    console.error('Error truncating tables:', error);
  }
}
