import { Model, DataTypes, Association } from 'sequelize';
import { sequelize } from '../sequelize';
import Article from './article';
import Comment from './comment';

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public uid!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public readonly articles?: Article[];
  public readonly comments?: Comment[];

  public static associations: {
    articles: Association<User, Article>;
    comments: Association<User, Comment>;
  };
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    uid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    sequelize: sequelize,
  }
);

User.hasMany(Article, {
  sourceKey: 'id',
  foreignKey: 'user_id',
  as: 'articles',
});

User.hasMany(Comment, {
  sourceKey: 'id',
  foreignKey: 'user_id',
  as: 'comments',
});

export default User;
