import { DataTypes, Model, Optional } from 'sequelize';
import { createSequelizeInstance } from '../loaders/dataLoader/sequilizeCon.js';

// ** Define the Admin Interface
interface AdminAttributes {
  id: number;
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
  hashedpassword: string;
  createdAt: Date;
  role: string;
  avatarUrl: string;
}

interface AdminCreationAttributes extends Optional<AdminAttributes, 'id'> {}

// ** Define Instance of Sequelize
const sequelize = createSequelizeInstance();

// ** Define the Admin Model
class Admin extends Model<AdminAttributes, AdminCreationAttributes> {
  declare id: number;
  declare firstName: string | null;
  declare lastName: string | null;
  declare username: string;
  declare email: string;
  declare hashedpassword: string;
  declare createdAt: Date;
  declare role: string;
  declare avatarUrl: string;

  static async loginAdmin(
    email: string,
    hashedpassword: string
  ): Promise<Admin | null> {
    return await this.findOne({
      where: { email: email, hashedpassword: hashedpassword },
    });
  }

  // Create a static method to log out user
  static async logoutUser(email: string): Promise<Admin | null> {
    return await this.findOne({
      where: { email: email },
    });
  }

  // Create a static method to reset the password, compare the hashed password
  static async resetPassword(
    email: string,
    hashedpassword: string
  ): Promise<Admin | null> {
    return await this.findOne({
      where: { email: email, hashedpassword: hashedpassword },
    });
  }
}

// ** Initialize the Admin Model
Admin.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hashedpassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'admin',
    },
    avatarUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'admin',
  }
);

// ** Sync the Admin Model
await sequelize
  .sync({ force: false })
  .then(() => {
    console.log('New Admin synced successfully');
  })
  .catch(err => {
    console.error('Error syncing Admin Table:', err);
  });

export default Admin;
