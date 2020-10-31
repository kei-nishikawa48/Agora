import { Model, DataTypes, HasManyCreateAssociationMixin, Association } from 'sequelize';
import { sequelize } from '../sequelize';
import Article from './article';

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public readonly articles?: Article[];

  public create_article!: HasManyCreateAssociationMixin<Article>;

  public static associations: {
    articles: Association<User, Article>;
  }
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

export default User;
