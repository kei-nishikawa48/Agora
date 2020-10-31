import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize';

class Article extends Model {
  public id!: number;
  public text!: string;
  public user_id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Article.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: DataTypes.STRING(65500),
      allowNull: false,
    },
  },
  {
    tableName: 'articles',
    sequelize: sequelize,
  }
);

export default Article;