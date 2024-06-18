import { DataTypes, Model, Optional } from 'sequelize';
import { createSequelizeInstance } from '../loaders/dataLoader/sequilizeCon';
import User from './user.model';

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

class ProfilePicture extends Model<
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
    id: number,
  ): Promise<ProfilePicture | null> {
    return await this.findByPk(id);
  }
}

ProfilePicture.init(
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
    modelName: 'ProfilePicture',
    tableName: 'ProfilePictures', // Specify the table name
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt',
    freezeTableName: true,
  },
);

// Define the association between User and ProfilePicture
User.hasOne(ProfilePicture, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
ProfilePicture.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

export default ProfilePicture;
