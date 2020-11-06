import {
  AuthenticationError,
  IResolvers,
  UserInputError,
} from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import User from '../../models/user';
import { ResolverContext } from './types';

const create_token = async (user: User, secret: string, expiresIn: string) => {
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
      return { token: create_token(user, jwt.secret, jwt.expiresIn) };
    },
    sign_in: async (parent, { email, password }, { models, jwt }) => {
      const user = await models.User.find_by_email(email);
      if (!user)
        throw new UserInputError('No user found with this login credentials.');
      const isValid = await user.validate_password(password);
      if (!isValid) throw new AuthenticationError('Invalid password.');
      return { token: create_token(user, jwt.secret, jwt.expiresIn) };
    },
  },
  User: {
    articles: async (user, args, { models }) =>
      models.Article.findAll({ where: { user_id: user.id } }),
    comments: async (user, args, { models }) =>
      models.Comment.findAll({ where: { user_id: user.id } }),
  },
};
