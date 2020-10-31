import { IResolvers } from 'apollo-server-express';
import User from '../../models/user';
import { ResolverContext } from './types';

export const user_resolvers: IResolvers<User, ResolverContext> = {
  Query: {
    users: async (parent, args, { models }) => models.User.findAll(),
    user: async (parent, { id }, { models }) => models.User.findByPk(id),
  },
  Mutation: {
    create_user: async (parent, { name, email, uid }, { models }) =>
      models.User.create({ name, email, uid }),
    delete_user: async (parent, { id }, { models }) =>
      models.User.destroy({ where: { id } }),
    update_user: async (parent, { id, name, email }, { models }) =>
      models.User.update({ name, email }, { where: { id } }),
  },
  User: {
    articles: async (user, args, { models }) =>
      models.Article.findAll({ where: { user_id: user.id } }),
  },
};
