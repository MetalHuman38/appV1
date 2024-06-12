import { QueryTypes } from 'sequelize';
import { waitForDB } from '../loaders/dataLoader/mariadb.js';

async function getAllColumns(tableName: string) {
  try {
    const sequelize = await waitForDB();

    // Query to get all columns for the specified table
    const query = `
      SELECT COLUMN_NAME
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_NAME = :tableName
    `;

    // Execute the query
    const columns = await sequelize.query(query, {
      type: QueryTypes.SELECT,
      replacements: { tableName },
    });

    console.log(
      `Columns fetched successfully for table ${tableName}:`,
      columns,
    );

    // Extract and return column names
    const columnNames = columns.map((column: any) => column.COLUMN_NAME);
    return columnNames;
  } catch (error) {
    throw new Error(
      `Error getting columns for table ${tableName}: ${(error as Error).message}`,
    );
  }
}

// fetch all data from userRegistration table
async function getAllData(): Promise<any> {
  try {
    const sequelize = await waitForDB();

    // Query to get all  data in userRegistration table
    const query = `
      SELECT * FROM userRegistration
    `;

    // Execute the query
    const userReg = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });

    console.log(`Data fetched successfully for userRegistration:`, userReg);

    // Extract and return column names
    return userReg;
  } catch (error) {
    throw new Error(
      `Error getting data for table userRegistrations: ${(error as Error).message}`,
    );
  }
}

export { getAllColumns, getAllData };
