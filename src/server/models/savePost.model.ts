import { DataTypes, Model, Optional } from 'sequelize';
import { createSequelizeInstance } from '../loaders/dataLoader/sequilizeCon';
import Posts from './post.model';
import Users from './user.model';

interface SavesAttributes {
  id: number;
  user_id: number;
  post_id: number;
  saveDate: Date | undefined;
}

interface SavesCreationAttributes extends Optional<SavesAttributes, 'id'> {}
// Define Instance of Sequelize
const sequelize = createSequelizeInstance();

class Saves
  extends Model<SavesAttributes, SavesCreationAttributes>
  implements SavesAttributes
{
  declare id: number;
  declare user_id: number;
  declare post_id: number;
  declare saveDate: Date | undefined;

  // Create custom class methods to create a new post
  static async createSave(attributes: SavesCreationAttributes): Promise<Saves> {
    return await this.create(attributes);
  }

  // create custom method to check if post is saved
  static async checkIfSaved(
    user_id: number,
    post_id: number
  ): Promise<boolean> {
    const save = await this.findOne({ where: { user_id, post_id } });
    return !!save;
  }

  // create custom method to delete a saved post
  static async deleteSavedPost(post_id: number): Promise<void> {
    const save = await this.findOne({ where: { post_id } });
    if (save) {
      await save.destroy();
    }
  }

  // create custom method to get all saved posts
  static async getSavedPosts(user_id: number): Promise<Saves[]> {
    return await this.findAll({
      where: { user_id },
      include: [
        {
          model: Posts,
          as: 'Post',
        },
      ],
    });
  }
}

// Define the Saves model
Saves.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
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
    saveDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'Saves',
    timestamps: false,
    freezeTableName: true,
    indexes: [
      {
        unique: true,
        fields: ['user_id', 'post_id'],
      },
    ],
  }
);

// Create a function to delete saved Post using the static method
Saves.deleteSavedPost = async function (post_id: number): Promise<void> {
  const save = await this.findOne({ where: { post_id } });
  if (save) {
    await save.destroy();
  }
};

// Create relationship between Saves and Posts
Saves.belongsTo(Posts, {
  foreignKey: 'post_id',
  targetKey: 'id',
  onDelete: 'RESTRICT',
});

// Create relationship between Saves and Users
Saves.belongsTo(Users, {
  foreignKey: 'user_id',
  targetKey: 'id',
});

Saves.sync({ force: false })
  .then(() => {
    console.log('Save Post synced successfully');
  })
  .catch(err => {
    console.error('Error syncing Save post:', err);
  });

export default Saves;
