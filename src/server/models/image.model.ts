import { DataTypes, Model, Optional } from 'sequelize';
import { createSequelizeInstance } from '../loaders/dataLoader/sequilizeCon.js';
import Posts from './post.model.js';
import Users from './user.model.js';

// ** Define the ImageStorage Interface
interface ImageStorageAttributes {
  id: number;
  imageUrl: string | null;
  user_id: number;
  post_id: number | null;
  created_At: Date;
}

// ** Define the ImageStorage Creation Attributes
interface ImageStorageCreationAttributes
  extends Optional<ImageStorageAttributes, 'id'> {}

// ** Define Instance of Sequelize
const sequelize = createSequelizeInstance();

// ** Define the ImageStorage Model
class ImageStorages
  extends Model<ImageStorageAttributes, ImageStorageCreationAttributes>
  implements ImageStorageAttributes
{
  declare id: number;
  declare imageUrl: string | null;
  declare user_id: number;
  declare post_id: number | null;
  declare created_At: Date;

  // create a static method to find an image by ID
  static async findImageById(id: number): Promise<ImageStorages | null> {
    return await this.findByPk(id);
  }

  static async findImageByReferenceKey(
    key: string,
    value: number
  ): Promise<ImageStorages | null> {
    try {
      const image = await this.findOne({
        where: { [key]: value },
        order: [['created_At', 'DESC']],
      });
      return image;
    } catch (error) {
      console.error(
        `Error finding image by reference key: ${key}, value: ${value}`,
        error
      );
      throw error; // Re-throw the error after logging it
    }
  }
}

// ** Define the ImageStorage Model
ImageStorages.init(
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
        model: 'Users',
        key: 'id',
      },
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Posts',
        key: 'id',
      },
    },
    created_At: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'ImageStorages',
    timestamps: false,
  }
);

// ** Define the hook to update the user's imageURL after creating an image
ImageStorages.afterCreate(async image => {
  const user = await Users.findByPk(image.user_id);
  if (user) {
    user.imageURL = image.imageUrl;
    await user.save();
  }
});

// ** Define the relationship between the User and ImageStorage models
Users.hasMany(ImageStorages, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Posts.hasMany(ImageStorages, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

// Define the relationship between the User, NewPost, and ImageStorage models
ImageStorages.belongsTo(Users, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

ImageStorages.belongsTo(Posts, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

// ** sync the ImageStorage model with the database
await sequelize
  .sync({ force: false })
  .then(() => {
    console.log('New Image synced successfully');
  })
  .catch(err => {
    console.error('Error syncing new image:', err);
  });

export default ImageStorages;
