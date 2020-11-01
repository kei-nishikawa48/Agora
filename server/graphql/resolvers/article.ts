import { IResolvers } from 'apollo-server-express';
import Article from '../../models/article';
import { ResolverContext } from './types';

export const article_resolvers: IResolvers<Article, ResolverContext> = {
  Query: {
    articles: async (parent, args, { models }) => models.Article.findAll(),
    article: async (parent, { id }, { models }) => models.Article.findByPk(id),
  },

  Mutation: {
    create_article: async (
      parent,
      { title, text, tags, user_id },
      { models }
    ) => models.Article.create({ title, text, tags, user_id }),
    delete_article: async (parent, { id }, { models }) =>
      models.Article.destroy({ where: { id } }),
    update_article: async (parent, { id, title, text, tags }, { models }) => {
      models.Article.update({ title, text, tags }, { where: { id } });
      return models.Article.findByPk(id);
    },
  },

  Article: {
    user: async (article, args, { models }) =>
      models.User.findByPk(article.user_id),
  },
};
