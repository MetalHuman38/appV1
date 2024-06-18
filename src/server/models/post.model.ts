import { DataTypes, Model, Optional } from 'sequelize';
import { createSequelizeInstance } from '../loaders/dataLoader/sequilizeCon';
import User from './user.model.js';

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

class Post extends Model<PostAttributes, PostCreationAttributes> {
  declare id: number;
  declare caption: string;
  declare imageURL: string | null;
  declare location: string | null;
  declare tags: string;
  declare likes_Count: number | null;
  declare created_At: Date | undefined;
  declare creator_Id: number;

  // create a static method to create a new post
  static async createPost(attributes: PostCreationAttributes): Promise<Post> {
    return await this.create(attributes);
  }

  // declare static methods to get post by ID
  static async getPostByID(id: number): Promise<Post | null> {
    return await this.findOne({ where: { id: id } });
  }
}

// Sync the model with the database
Post.init(
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
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'Post',
    timestamps: true,
    freezeTableName: true,
  },
);

// Define the relationship between the User and Post models
User.hasMany(Post, {
  foreignKey: 'creator_Id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Post.belongsTo(User, {
  foreignKey: 'creator_Id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Post.sync({ force: true })
  .then(() => {
    console.log('Posts synced successfully');
  })
  .catch(err => {
    console.error('Error syncing Posts:', err);
  });

async () => {
  await sequelize
    .sync({ force: true })
    .then(() => {
      console.log('New Posts synced successfully');
    })
    .catch(err => {
      console.error('Error syncing new Posts:', err);
    });
};

export default Post;
