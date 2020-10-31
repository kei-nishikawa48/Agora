import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize';

class Article extends Model {
  public id!: number;
  public title!: string;
  public text!: string;
  public tags!: string;
  public user_id!: number;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Article.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tags: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    tableName: 'articles',
    sequelize: sequelize,
  }
);

export default Article;