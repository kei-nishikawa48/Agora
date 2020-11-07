import {
  AuthenticationError,
  ForbiddenError,
  IResolvers,
  UserInputError,
} from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import User from '../../models/user';
import { ResolverContext } from './types';

/** jsonwebtokenを使い、Tokenを作成して返す */
const create_token = async (user: User, secret: string, expiresIn: string) => {
  const { id, email } = user;
  return await jwt.sign({ id, email }, secret, { expiresIn });
};

export const user_resolvers: IResolvers<User, ResolverContext> = {
  Query: {
    /** 全てのユーザーを取得 */
    users: async (parent, args, { models }) => models.User.findAll(),
    /** 特定のユーザーを取得 */
    user: async (parent, { id }, { models }) => models.User.findByPk(id),
    /** 現在のユーザーを取得 */
    current_user: async (parent, args, { models, current_user }) =>
      models.User.findByPk(current_user!.id),
  },
  Mutation: {
    /** ユーザー削除 */
    delete_user: async (parent, { id }, { models, current_user }) => {
      !current_user && new ForbiddenError('Not authenticated as user.');
      return models.User.destroy({ where: { id: current_user!.id } });
    },
    /** ユーザー更新 */
    update_user: async (
      parent,
      { id, name, email },
      { models, current_user }
    ) => {
      !current_user && new ForbiddenError('Not authenticated as user.');
      models.User.update({ name, email }, { where: { id: current_user!.id } });
      return models.User.findByPk(current_user!.id);
    },
    /** サインアップ */
    sign_up: async (parent, { name, email, password }, { models, jwt }) => {
      const user = await models.User.create({ name, email, password });
      return { token: create_token(user, jwt.secret, jwt.expiresIn) };
    },
    /** サインイン */
    sign_in: async (parent, { email, password }, { models, jwt }) => {
      const user = await models.User.find_by_email(email);
      if (!user)
        throw new UserInputError('No user found with this login credentials.');
      const is_valid = await user.validate_password(password);
      if (!is_valid) throw new AuthenticationError('Invalid password.');
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
