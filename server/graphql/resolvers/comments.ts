import { IResolvers } from 'apollo-server-express';
import Comment from '../../models/comment';
import { ResolverContext } from './types';

export const comment_resolvers: IResolvers<Comment, ResolverContext> = {
  Query: {
    comments: async (parent, args, { models }) => models.Comment.findAll(),
    comment: async (parent, { id }, { models }) => models.Comment.findByPk(id),
  },

  Mutation: {
    create_comment: async (parent, { text, user_id, article_id }, { models }) =>
      models.Comment.create({ text, user_id, article_id }),
    delete_comment: async (parent, { id }, { models }) =>
      models.Comment.destroy({ where: { id } }),
    update_comment: async (parent, { id, text }, { models }) => {
      models.Comment.update({ text }, { where: { id } });
      return models.Comment.findByPk(id);
    },
  },

  comment: {
    user: async (comment, args, { models }) =>
      models.User.findByPk(comment.user_id),
    article: async (comment, args, { models }) =>
      models.Article.findByPk(comment.article_id),
  },
};
