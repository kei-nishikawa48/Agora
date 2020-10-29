import { IResolvers } from 'apollo-server-express';
import { Models } from '../../models';
import User from '../../models/user';

type ResolverContext = {
  models: Models;
};

export const user_resolvers: IResolvers<User, ResolverContext> = {
  Query: {
    users: async (parent, args, { models }) => models.User.findAll(),
    user: async (parent, { id }, { models }) => models.User.findByPk(id),
  },
  Mutation: {
    create_user: async (parent, { name, email }, { models }) =>
      models.User.create({ name, email }),
  },
};
