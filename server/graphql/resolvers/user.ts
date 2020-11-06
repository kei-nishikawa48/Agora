import { IResolvers } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import User from '../../models/user';
import { ResolverContext } from './types';

const createToken = async (user: User, secret: string, expiresIn: string) => {
  const { id, email } = user;
  return await jwt.sign({ id, email }, secret, { expiresIn });
};

export const user_resolvers: IResolvers<User, ResolverContext> = {
  Query: {
    users: async (parent, args, { models }) => models.User.findAll(),
    user: async (parent, { id }, { models }) => models.User.findByPk(id),
  },
  Mutation: {
    delete_user: async (parent, { id }, { models }) =>
      models.User.destroy({ where: { id } }),
    update_user: async (parent, { id, name, email }, { models }) => {
      models.User.update({ name, email }, { where: { id } });
      return models.User.findByPk(id);
    },
    sign_up: async (parent, { name, email, password }, { models, jwt }) => {
      const user = await models.User.create({ name, email, password });
      return { token: createToken(user, jwt.secret, jwt.expiresIn) };
    },
  },
  User: {
    articles: async (user, args, { models }) =>
      models.Article.findAll({ where: { user_id: user.id } }),
    comments: async (user, args, { models }) =>
      models.Comment.findAll({ where: { user_id: user.id } }),
  },
};
