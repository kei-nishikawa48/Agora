import { IResolvers } from 'apollo-server-express';
import Article from '../../models/article';
import { ResolverContext } from './types';

export const article_resolvers: IResolvers<Article, ResolverContext> = {
  Query: {
    articles: async (parent, args, { models }) => models.Article.findAll(),
    article: async (parent, { id }, { models }) => models.Article.findByPk(id),
  },

  Mutation: {
    create_article: async (parent, { text, id }, { models }) =>
      models.Article.create({
        text,
        user_id: await models.User.findByPk(id),
      }),
    delete_article: async (parent, { id }, { models }) =>
      models.Article.destroy({ where: id }),
    update_article: async (parent, { id, text }, { models }) =>
      models.Article.update({ text }, { where: id }),
  },

  Article: {
    user: async (article, args, { models }) =>
      models.User.findByPk(article.user_id),
  },
};
