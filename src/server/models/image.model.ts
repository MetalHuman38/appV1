import { DataTypes, Model, Optional } from 'sequelize';
import { createSequelizeInstance } from '../loaders/dataLoader/sequilizeCon.js';
import User from './user.model.js';
import Post from './post.model.js';

interface ImageStorageAttributes {
  id: number;
  imageUrl: string | null;
  user_id: number;
  post_id: number;
  created_At: Date;
}

interface ImageStorageCreationAttributes
  extends Optional<ImageStorageAttributes, 'id'> {}

// Define Instance of Sequelize
const sequelize = createSequelizeInstance();

class ImageStorage
  extends Model<ImageStorageAttributes, ImageStorageCreationAttributes>
  implements ImageStorageAttributes
{
  declare id: number;
  declare imageUrl: string | null;
  declare user_id: number;
  declare post_id: number;
  declare created_At: Date;

  // create a static method to find an image by ID
  static async findImageById(id: number): Promise<ImageStorage | null> {
    return await this.findByPk(id);
  }

  static async findImageByReferenceKey(
    key: string,
    value: number,
  ): Promise<ImageStorage | null> {
    try {
      const image = await this.findOne({
        where: { [key]: value },
        order: [['createdAt', 'ASC']],
      });
      return image;
    } catch (error) {
      console.error(
        `Error finding image by reference key: ${key}, value: ${value}`,
        error,
      );
      throw error; // Re-throw the error after logging it
    }
  }
}

// Define the User model
ImageStorage.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Post',
        key: 'id',
      },
      allowNull: true,
    },
    created_At: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },

  {
    sequelize,
    modelName: 'ImageStorage',
    tableName: 'ImageStorage',
    createdAt: 'created_At',
    updatedAt: false,
    timestamps: true,
  },
);

// create a hook that saves uploaded image to the user's columns in the database
ImageStorage.afterCreate(async (image, _options) => {
  const user = await User.findByPk(image.user_id);
  if (user) {
    user.imageURL = image.imageUrl;
    await user.save();
  }
});

// After Uploading an image, save to user's table
User.hasMany(ImageStorage, {
  foreignKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Post.hasMany(ImageStorage, {
  foreignKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

// Define the relationship between the User, NewPost, and ImageStorage models
ImageStorage.belongsTo(User, {
  foreignKey: 'id',
  targetKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
ImageStorage.belongsTo(Post, {
  foreignKey: 'id',
  targetKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

// sync the ImageStorage model with the database
ImageStorage.sync()
  .then(() => {
    console.log('ImageStorage synced successfully');
  })
  .catch(err => {
    console.error('Error syncing ImageStorage:', err);
  });

// Sync the User model with the database
sequelize
  .sync()
  .then(() => {
    console.log('New Image synced successfully');
  })
  .catch(err => {
    console.error('Error syncing new image:', err);
  });

export default ImageStorage;
