import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import resolvers from './graphql/resolvers';
import schema from './graphql/schema';
import { models } from './models';
import next from 'next';
import express, { Request } from 'express';
import dotenv from 'dotenv';
import User from './models/user';
import jwt from 'jsonwebtoken';

const port = parseInt(process.env.PORT as string, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const server = express();

// 環境変数を使う
dotenv.config();

/** クライアントから受け取ったトークンで認証 */
const get_current_user = async (req: Request) => {
  const token = req.headers.authorization as string;
  if (!token) return null;

  try {
    // ユーザーを返す
    return jwt.verify(token, process.env.JWT_SECRET as string) as User;
  } catch (e) {
    throw new AuthenticationError('Your session expired. Sign in again.');
  }
};

/** サーバーの起動 */
const start_server = async () => {
  try {
    await app.prepare();
    /** apollo-serverの作成 */
    const apollo_server = new ApolloServer({
      typeDefs: schema,
      resolvers: resolvers,
      context: async ({ req }) => {
        /** 現在のユーザー */
        const current_user = await get_current_user(req);
        return {
          models,
          jwt: {
            secret: process.env.JWT_SECRET,
            expiresIn: process.env.JWT_EXPIRES_IN,
          },
          current_user,
        };
      },
    });
    // expressを使用、パスを/graphqlに設定
    apollo_server.applyMiddleware({ app: server, path: '/graphql' });
    server.all('*', (req, res) => {
      return handle(req, res);
    });
    server.listen(port, () => {
      console.log(`Server ready at ${port}/graphql`);
    });
  } catch (res) {
    console.log(res);
  }
};

start_server();
