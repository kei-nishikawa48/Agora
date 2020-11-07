import { skip } from 'graphql-resolvers';
import { ForbiddenError } from 'apollo-server-express';
import { ResolverContext } from './types';
import Article from '../../models/article';
import Comment from '../../models/comment';

// 未実装ファイル

export const is_authenticated = (
  parent: any,
  args: any,
  { current_user }: ResolverContext
) => (current_user ? skip : new ForbiddenError('Not authenticated as user.'));

export const is_article_owner = async (
  parent: any,
  { id }: Article,
  { models, current_user }: ResolverContext
) => {
  const article = await models.Article.findByPk(id, {
    raw: true,
  });
  if (!article || article.user_id !== current_user!.id) {
    throw new ForbiddenError('Not authenticated as owner.');
  }
  return skip;
};

export const is_comment_owner = async (
  parent: any,
  { id }: Comment,
  { models, current_user }: ResolverContext
) => {
  const comment = await models.Comment.findByPk(id, {
    raw: true,
  });
  if (!comment || comment.user_id !== current_user!.id) {
    throw new ForbiddenError('Not authenticated as owner.');
  }
  return skip;
};
