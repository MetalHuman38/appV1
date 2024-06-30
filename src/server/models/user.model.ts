import { DataTypes, Model, Optional } from 'sequelize';
import { createSequelizeInstance } from '../loaders/dataLoader/sequilizeCon';

interface UserAttributes {
  id: number;
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
  hashedpassword: string;
  bio: string | null;
  status: string | null;
  join: Date | undefined;
  avatarUrl: string | null;
  imageURL: string | null;
  profilePic: string | null;
  label: string | null;
  last_activity: Date | undefined;
  updated_at: Date | undefined;
  UserRegistrationID: number | null;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Define Instance of Sequelize
const sequelize = createSequelizeInstance();

class Users extends Model<UserAttributes, UserCreationAttributes> {
  declare id: number;
  declare firstName: string | null;
  declare lastName: string | null;
  declare username: string;
  declare email: string;
  declare hashedpassword: string;
  declare status: string | null;
  declare bio: string | null;
  declare join: Date | undefined;
  declare avatarUrl: string | null;
  declare imageURL: string | null;
  declare profilePic: string | null;
  declare label: string | null;
  declare last_activity: Date | undefined;
  declare updated_at: Date | undefined;
  declare UserRegistrationID: number | null;

  // declare static methods to get user by ID
  static async getUserByID(user_id: number): Promise<Users | null> {
    return await this.findOne({ where: { id: user_id } });
  }


  static async getAllUsers(
    limit: number,
    attributes: string[],
  ): Promise<Users[]> {
    return await this.findAll({
      limit,
      attributes,
    });
  }

  // declare static methods to update a user by ID
  static async updateUser(
    id: number,
    attributes: UserAttributes,
  ): Promise<[number, Users[]]> {
    const [affectedCount, updatedUsers] = await this.update(attributes, {
      where: { id },
      returning: true,
    });
    return [affectedCount, updatedUsers as Users[]];
  }
}

// Sync the model with the database
Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^[a-zA-Z0-9_]*$/,
        len: [3, 20],
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
        len: [5, 50],
        notEmpty: true,
      },
    },
    hashedpassword: {
      type: DataTypes.STRING(64),
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'unverified',
    },
    bio: {
      type: DataTypes.STRING,
      defaultValue: 'This is a new user.',
    },
    join: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    avatarUrl: {
      type: DataTypes.STRING,
    },
    imageURL: {
      type: DataTypes.STRING,
    },
    profilePic: {
      type: DataTypes.STRING,
    },
    label: {
      type: DataTypes.STRING,
      defaultValue: 'New User',
    },
    last_activity: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    UserRegistrationID: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'UserRegistration',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Users',
    timestamps: false,
    updatedAt: 'updated_at',
  },
);

// Sync User model with the database
await sequelize
  .sync({ force: false })
  .then(() => {
    console.log('New User synced successfully');
  })
  .catch(err => {
    console.error('Error syncing new user:', err);
  });

export default Users;
