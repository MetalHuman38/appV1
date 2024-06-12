import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from '@sequelize/core';
import {
  Attribute,
  PrimaryKey,
  AutoIncrement,
  NotNull,
  Default,
  Unique,
} from '@sequelize/core/decorators-legacy';
import { Table } from '@sequelize/core/decorators-legacy';
import { createSequelizeInstance } from '../loaders/dataLoader/sequilizeCon';
import { userRegistration } from './userRegister.model';

// Define Instance of Sequelize
const sequelize = createSequelizeInstance();

@Table({
  underscored: true,
})
export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  @PrimaryKey
  @AutoIncrement
  @Attribute(DataTypes.INTEGER)
  declare id: CreationOptional<number>;

  @NotNull
  @Attribute(DataTypes.STRING)
  declare firstName: CreationOptional<string>;

  @NotNull
  @Attribute(DataTypes.STRING)
  declare lastName: CreationOptional<string>;

  @NotNull
  @Attribute(DataTypes.STRING)
  declare username: CreationOptional<string>;

  @NotNull
  @Unique
  @Attribute(DataTypes.STRING)
  declare email: CreationOptional<string>;

  @NotNull
  @Attribute(DataTypes.STRING)
  declare hashedpassword: string | null;

  @Default('unverified')
  @Attribute(DataTypes.STRING)
  declare status: string | null;

  @Default('This is a new user.')
  @Attribute(DataTypes.STRING)
  declare bio: CreationOptional<string>;

  @Default(DataTypes.NOW)
  @Attribute(DataTypes.DATE)
  declare join: Date | undefined;

  @Attribute(DataTypes.STRING)
  declare avatarUrl: string | null;

  @Attribute(DataTypes.STRING)
  declare imageURL: string | null;

  @Attribute(DataTypes.STRING)
  declare profilePic: string | null;

  @Default('New User')
  @Attribute(DataTypes.STRING)
  declare label: CreationOptional<string>;

  @Default(DataTypes.NOW)
  @Attribute(DataTypes.DATE)
  declare last_activity: Date | undefined;

  @Default(DataTypes.NOW)
  @Attribute(DataTypes.DATE)
  declare updated_at: Date | undefined;

  @Attribute(DataTypes.INTEGER)
  declare userRegistrationID: number | null;
}

// Sync the model with the database
User.init(
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
    userRegistrationID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: userRegistration,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'User',
    timestamps: true,
    updatedAt: 'updated_at',
    createdAt: 'created_at',
  },
);

// Add User model to the sequelize instance
sequelize.addModels([User]);

await User.sync({ force: true });

// Sync User model with the database
await sequelize
  .sync()
  .then(() => {
    console.log('New User synced successfully');
  })
  .catch(err => {
    console.error('Error syncing new user:', err);
  });
