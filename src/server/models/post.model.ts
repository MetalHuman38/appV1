import { DataTypes, Model, Optional } from 'sequelize';
import { createSequelizeInstance } from '../loaders/dataLoader/sequilizeCon';
import Users from './user.model.js';

interface PostAttributes {
  id: number;
  caption: string;
  imageURL: string | null;
  location: string | null;
  tags: string;
  likes_Count: number | null;
  created_At: Date | undefined;
  creator_Id: number;
}

interface PostCreationAttributes extends Optional<PostAttributes, 'id'> {}

// Define Instance of Sequelize
const sequelize = createSequelizeInstance();

class Posts extends Model<PostAttributes, PostCreationAttributes> {
  declare id: number;
  declare caption: string;
  declare imageURL: string | null;
  declare location: string | null;
  declare tags: string;
  declare likes_Count: number | null;
  declare created_At: Date | undefined;
  declare creator_Id: number;

  // create a static method to create a new post
  static async createPost(attributes: PostCreationAttributes): Promise<Posts> {
    return await this.create(attributes);
  }

  static async updatePost(
    id: number,
    attributes: PostAttributes,
  ): Promise<[number, Posts[]]> {
    const [affectedCount, updatedPosts] = await this.update(attributes, {
      where: { id },
      returning: true,
    });
    return [affectedCount, updatedPosts as Posts[]];
  }

  // declare static methods to get post by ID
  static async getPostByID(id: number): Promise<Posts | null> {
    return await this.findOne({ where: { id: id } });
  }
}

// Sync the model with the database
Posts.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    caption: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageURL: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tags: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likes_Count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    created_At: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    creator_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Posts',
    timestamps: false,
  },
);

// Create new post
Posts.createPost = async function (
  attributes: PostCreationAttributes,
): Promise<Posts> {
  try {
    const newPost = await this.create(attributes);
    return newPost;
  } catch (error) {
    console.error('Error creating new post:', error);
    throw error;
  }
};

// Update post by ID
Posts.updatePost = async function (
  id: number,
  attributes: PostAttributes,
): Promise<[number, Posts[]]> {
  try {
    const [affectedCount, updatedPosts] = await this.update(attributes, {
      where: { id },
      returning: true,
    });
    return [affectedCount, updatedPosts as Posts[]];
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

// Define the relationship between the User and Post models
Users.hasMany(Posts, {
  foreignKey: 'creator_Id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Posts.belongsTo(Users, {
  foreignKey: 'creator_Id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

await sequelize
  .sync({ alter: false })
  .then(() => {
    console.log('Post synced successfully');
  })
  .catch(err => {
    console.error('Error syncing Post:', err);
  });

export default Posts;
