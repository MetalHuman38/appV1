import { createSequelizeInstance } from '../loaders/dataLoader/sequilizeCon.js';
import ImageStorages from '../models/image.model.js';

// Define Instance of Sequelize
const sequelize = createSequelizeInstance();

export async function truncateTables() {
  const transaction = await sequelize.transaction();

  try {
    // Perform the truncate operation within the transaction
    await ImageStorages.truncate({ transaction });

    // If everything is successful, commit the transaction
    await transaction.commit();
    console.log('Tables have been truncated...');
  } catch (error) {
    // If there's an error, roll back the transaction
    await transaction.rollback();
    console.error('Error truncating tables:', error);
  }
}
