import bcrypt from 'bcrypt';
import { DataTypes, Model, Optional } from 'sequelize';
import { createSequelizeInstance } from '../loaders/dataLoader/sequilizeCon';
import { generateAvatarUrl } from '../utils/avatar';
import Users from './user.model';

// ** Define the UserRegistration Model **
interface UserAttributes {
  id: number;
  newUser: string;
  username: string;
  email: string;
  hashedpassword: string;
  createdAt: Date;
}

// ** Define the UserCreationAttributes **
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// ** Define Instance of Sequelize
const sequelize = createSequelizeInstance();

class UserRegistration extends Model<UserAttributes, UserCreationAttributes> {
  declare id: number;
  declare newUser: string | null;
  declare username: string;
  declare email: string;
  declare hashedpassword: string;
  declare createdAt: Date;

  // ** Create a static method to log in user upon successful registration
  static async loginUser(
    email: string,
    password: string
  ): Promise<UserRegistration | null> {
    return await this.findOne({
      where: { email: email, hashedpassword: password },
    });
  }

  // ** Create a static method to log out user
  static async logoutUser(email: string): Promise<UserRegistration | null> {
    return await this.findOne({
      where: { email: email },
    });
  }

  // ** Create a static method to reset the password, compare the hashed password
  static async resetPassword(
    email: string,
    password: string
  ): Promise<UserRegistration | null> {
    return await this.findOne({
      where: { email: email, hashedpassword: password },
    });
  }
}

// ** Initialize UserRegistration model **
UserRegistration.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    newUser: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 20],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        len: [7, 100],
      },
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
  },
  {
    sequelize: sequelize,
    modelName: 'UserRegistration',
    createdAt: 'createdAt',
    timestamps: false,
    freezeTableName: true,
  }
);

// ** Hash the password before saving
UserRegistration.beforeCreate(async (user: UserRegistration) => {
  try {
    if (user) {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword: string = await bcrypt.hash(
        String(user.hashedpassword),
        salt
      );
      user.hashedpassword = hashedPassword;
    }
  } catch (error) {
    console.error('Error hashing password:', error);
    throw new Error('Error hashing password');
  }
});

// ** Create a new user record in the Users table
UserRegistration.afterCreate(async (user: UserRegistration) => {
  try {
    if (user) {
      const spaceIndex = user.newUser?.lastIndexOf(' ');
      // Extract the first name and last name based on the last space
      const first_Name =
        spaceIndex !== -1 ? user.newUser?.slice(0, spaceIndex) : user.newUser;
      const lastName =
        spaceIndex !== -1
          ? user.newUser?.slice(spaceIndex ?? +1)
          : user.newUser;
      const avatar = generateAvatarUrl(user.username);

      // Create or update the user record in the Users table
      await Users.upsert({
        firstName: first_Name,
        lastName: lastName,
        username: user.username,
        email: user.email,
        hashedpassword: user.hashedpassword,
        status: 'unverified',
        bio: 'Write something interesting about yourself.',
        join: new Date(),
        avatarUrl: avatar,
        imageURL: null,
        profilePic: null,
        label: 'I am a new user',
        last_activity: new Date(),
        updated_at: new Date(),
        UserRegistrationID: user.id,
      });
    }
  } catch (error) {
    console.error('Error registering new user:', error);
    throw new Error('Error registering new user');
  }
});

// ** Define a custom method to login user with email and password and compare the hashed password
UserRegistration.loginUser = async function (email: string, password: string) {
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

// ** Define a custom method to logout user
UserRegistration.logoutUser = async function (email: string) {
  try {
    return await this.findOne({ where: { email: email } });
  } catch (error) {
    console.error('Error logging out user:', error);
    throw new Error('User not found');
  }
};

// ** Sync the UserRegistration model with the database
await sequelize
  .sync({ force: false })
  .then(() => {
    console.log('New User Registered synced successfully');
  })
  .catch(err => {
    console.error('Error syncing new user:', err);
  });

export default UserRegistration;
