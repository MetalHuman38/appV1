// Desc: Truncate tables in the database
import { createSequelizeInstance } from '../loaders/dataLoader/sequilizeCon.js';
import ImageStorages from '../models/image.model.js';
import ProfilePictures from '../models/profilePic.model.js';

// ** Define Instance of Sequelize
const sequelize = createSequelizeInstance();

// ** truncateTables function
export async function truncateTables() {
  const transaction = await sequelize.transaction();

  try {
    // await Users.destroy({ where: {}, truncate: true });
    // await UserRegistration.destroy({ where: {}, truncate: true });
    await ImageStorages.truncate({ transaction });
    await ProfilePictures.truncate({ transaction });

    // If everything is successful, commit the transaction
    await transaction.commit();
    console.log('Tables have been truncated...');
  } catch (error) {
    // If there's an error, roll back the transaction
    await transaction.rollback();
    console.error('Error truncating tables:', error);
  }
}
