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
  ColumnName,
  Unique,
} from '@sequelize/core/decorators-legacy';
import { Table } from '@sequelize/core/decorators-legacy';
import { createSequelizeInstance } from '../loaders/dataLoader/sequilizeCon';
import bcrypt from 'bcrypt';
import { generateAvatarUrl } from '../utils/avatar';
import { User } from './user.model';

// Define Instance of Sequelize
const sequelize = createSequelizeInstance();

@Table({
  underscored: true,
})
export class userRegistration extends Model<
  InferAttributes<userRegistration>,
  InferCreationAttributes<userRegistration>
> {
  @PrimaryKey
  @AutoIncrement
  @Attribute(DataTypes.INTEGER)
  declare id: CreationOptional<number>;

  @NotNull
  @ColumnName('new_user')
  @Default('John Doe')
  @Attribute(DataTypes.STRING)
  declare newUser: CreationOptional<string>;

  @NotNull
  @ColumnName('username')
  @Default('newUser')
  @Attribute(DataTypes.STRING)
  @Unique
  declare username: CreationOptional<string>;

  @NotNull
  @ColumnName('email')
  @Default('example@domain.com')
  @Unique
  @Attribute(DataTypes.STRING)
  declare email: CreationOptional<string>;

  @NotNull
  @ColumnName('hashed_password')
  @Attribute(DataTypes.STRING)
  declare hashedpassword: string;

  @ColumnName('created_at')
  @Attribute(DataTypes.DATE)
  declare createdAt: Date | undefined;

  // Create a static method to register a new user
  static async registerUser(
    newUser: string,
    username: string,
    email: string,
    hashedpassword: string,
  ): Promise<userRegistration> {
    return await this.create({
      newUser: newUser,
      username: username,
      email: email,
      hashedpassword: hashedpassword,
    });
  }

  // Create a static method to log in user upon successful registration
  static async loginUser(
    email: string,
    password: string,
  ): Promise<userRegistration | null> {
    return await this.findOne({
      where: { email: email, hashedpassword: password },
    });
  }
  // Create a static method to log out user
  static async logoutUser(email: string): Promise<userRegistration | null> {
    return await this.findOne({
      where: { email: email },
    });
  }

  // Create a static method to reset the password, compare the hashed password
  static async resetPassword(
    email: string,
    password: string,
  ): Promise<userRegistration | null> {
    return await this.findOne({
      where: { email: email, hashedpassword: password },
    });
  }
}

// Sync the model with the database
userRegistration.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    newUser: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'John Doe',
      validate: {
        len: [3, 50],
        notEmpty: false,
      },
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'newUser',
      validate: {
        is: /^[a-zA-Z0-9_]*$/,
        len: [3, 20],
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      defaultValue: 'example@domain.com',
      validate: {
        isEmail: true,
        len: [5, 20],
        notEmpty: true,
      },
    },
    hashedpassword: {
      type: DataTypes.STRING(64),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'userRegistration',
    createdAt: 'created_at',
    updatedAt: false,
    timestamps: true,
  },
);

// Hash the password before saving
userRegistration.addHook(
  'beforeCreate',
  async (userRegistration: userRegistration) => {
    try {
      if (userRegistration) {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword: string = await bcrypt.hash(
          String(userRegistration.hashedpassword),
          salt,
        );
        userRegistration.hashedpassword = hashedPassword;
      }
    } catch (error) {
      console.error('Error hashing password:', error);
      throw new Error('Error hashing password');
    }
  },
);

userRegistration.addHook(
  'afterCreate',
  async (UserRegistration: userRegistration) => {
    try {
      if (UserRegistration) {
        const spaceIndex = UserRegistration.newUser?.lastIndexOf(' ');
        // Extract the first name and last name based on the last space
        const firstName =
          spaceIndex !== -1
            ? UserRegistration.newUser?.slice(0, spaceIndex)
            : UserRegistration.newUser;
        const lastName =
          spaceIndex !== -1
            ? UserRegistration.newUser?.slice(spaceIndex ?? +1)
            : null ?? '';
        const avatar = generateAvatarUrl(UserRegistration.username);

        // Create or update the user record in the Users table
        await User.upsert({
          firstName: firstName,
          lastName: lastName,
          username: UserRegistration.username,
          email: UserRegistration.email,
          hashedpassword: UserRegistration.hashedpassword,
          status: 'unverified',
          bio: 'I am a new user.',
          join: new Date(),
          avatarUrl: avatar,
          imageURL: null,
          profilePic: null,
          label: 'New User',
          last_activity: new Date(),
          updated_at: new Date(),
          userRegistrationID: UserRegistration.id,
        });
      }
    } catch (error) {
      console.error('Error registering new user:', error);
      throw new Error('Error registering new user');
    }
  },
);

// Define a custom method to register a new user
userRegistration.registerUser = async function (
  newUser: string,
  username: string,
  email: string,
  hashedpassword: string,
) {
  try {
    return await this.create({
      newUser: newUser,
      username: username,
      email: email,
      hashedpassword: hashedpassword,
    });
  } catch (error) {
    console.error('Error registering new user:', error);
    throw new Error('Error registering new user');
  }
};

// Define a custom method to login user with email and password and compare the hashed password
userRegistration.loginUser = async function (email: string, password: string) {
  try {
    const user = await this.findOne({ where: { email: email } });
    if (user) {
      const auth = await bcrypt.compare(password, user.hashedpassword);
      if (auth) {
        return user;
      } else {
        throw new Error('Incorrect password');
      }
    } else {
      throw new Error('Incorrect email');
    }
  } catch (error) {
    console.error('Error logging in user:', error);
    throw new Error('User not found');
  }
};

// Define a custom method to logout user
userRegistration.logoutUser = async function (email: string) {
  try {
    return await this.findOne({ where: { email: email } });
  } catch (error) {
    console.error('Error logging out user:', error);
    throw new Error('User not found');
  }
};

// Add the User model to the Sequelize instance
sequelize.addModels([userRegistration, User]);

// Sync the model with the database
await userRegistration.sync({ force: true });

await sequelize
  .sync()
  .then(() => {
    console.log('New User Registered synced successfully');
  })
  .catch(err => {
    console.error('Error syncing new user:', err);
  });
