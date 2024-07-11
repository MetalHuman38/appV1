import { DataTypes, Model, Optional } from 'sequelize';
import { createSequelizeInstance } from '../loaders/dataLoader/sequilizeCon';
import Users from './user.model';

const sequelize = createSequelizeInstance();

interface ProfilePictureAttributes {
  id: number;
  user_id: number;
  profilePic: string;
  created_At: Date;
  updated_At: Date;
}

interface ProfilePictureCreationAttributes
  extends Optional<ProfilePictureAttributes, 'id'> {}

class ProfilePictures extends Model<
  ProfilePictureAttributes,
  ProfilePictureCreationAttributes
> {
  declare id: number;
  declare user_id: number;
  declare profilePic: string;
  declare createdAt?: Date;
  declare updatedAt?: Date;

  // create a static method to find a profile picture by ID
  static async findProfilePictureById(
    user_id: number
  ): Promise<ProfilePictures | null> {
    return await this.findByPk(user_id);
  }

  // ** create a static method to retireve a profile picture by reference ID(user_id)
  static async getProfilePicByReferenceID(
    user_id: number
  ): Promise<ProfilePictures | null> {
    return await this.findOne({ where: { user_id } });
  }

  static async findProfilePicByReferenceKey(
    key: string,
    value: number
  ): Promise<ProfilePictures | null> {
    try {
      const profileImage = await this.findOne({
        where: { [key]: value },
        order: [['created_At', 'DESC']],
      });
      return profileImage;
    } catch (error) {
      console.error(
        `Error finding profile image by reference key: ${key}, value: ${value}`,
        error
      );
      throw error; // Re-throw the error after logging it
    }
  }
}

ProfilePictures.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // Name of the users table
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    profilePic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_At: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_At: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'ProfilePictures',
    timestamps: false,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt',
  }
);

// Define the association between User and ProfilePicture
Users.hasOne(ProfilePictures, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
ProfilePictures.belongsTo(Users, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

ProfilePictures.sync({ force: false })
  .then(() => {
    console.log('Profile Pic synced successfully');
  })
  .catch(err => {
    console.error('Error syncing creating profile pic table:', err);
  });

export default ProfilePictures;
