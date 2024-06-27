import { DataTypes, Model, Optional } from 'sequelize';
import { createSequelizeInstance } from '../loaders/dataLoader/sequilizeCon';
import User from './user.model.js';
import Post from './post.model.js';

interface LikeAttributes {
  id: number;
  user_id: number;
  post_id: number;
  created_At: Date;
}

interface LikeCreationAttributes extends Optional<LikeAttributes, 'id'> {}

// Define Instance of Sequelize
const sequelize = createSequelizeInstance();

class Likes
  extends Model<LikeAttributes, LikeCreationAttributes>
  implements LikeAttributes
{
  declare id: number;
  declare user_id: number;
  declare post_id: number;
  declare created_At: Date;

  // create a static method to create a new like
  static async createLike(attributes: LikeCreationAttributes): Promise<Likes> {
    return await this.create(attributes);
  }

  // create a static method to find a like by ID
  static async findLikeById(id: number): Promise<Likes | null> {
    return await this.findByPk(id);
  }

  // create a static method to find a like by reference key (userId or postId)
  static async findLikeByReferenceKey(
    key: string,
    value: number,
  ): Promise<Likes | null> {
    return await this.findOne({ where: { [key]: value } });
  }

  // create a static method to find all likes by reference key (userId or postId)
  static async findAllLikesByReferenceKey(
    key: string,
    value: number,
  ): Promise<Likes[]> {
    return await this.findAll({ where: { [key]: value } });
  }

  // create a static method to find all likes by reference key (userId or postId)
  static async deleteLikeByReferenceKey(
    key: string,
    value: number,
  ): Promise<void> {
    await this.destroy({ where: { [key]: value } });
  }
}

// Define the User model
Likes.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Posts',
        key: 'id',
      },
    },
    created_At: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Likes',
    timestamps: false,
    freezeTableName: true,
  },
);

// Define the relationship between User and Like
User.hasMany(Likes, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Likes.belongsTo(User, {
  foreignKey: 'user_id',
});

// Define the relationship between Post and Like
Post.hasMany(Likes, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
});

Likes.belongsTo(Post, {
  foreignKey: 'post_id',
});

// Sync the Like model with the database
Likes.sync({ force: false })
  .then(() => {
    console.log('Like synced successfully');
  })
  .catch(err => {
    console.error('Error syncing like:', err);
  });

export default Likes;
