import { ApolloServer } from 'apollo-server-express';
import resolvers from './graphql/resolvers';
import schema from './graphql/schema';
import { models } from './models';
import next from 'next';
import express from 'express';

const port = parseInt(process.env.PORT as string, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const server = express();

const start_server = async () => {
  try {
    await app.prepare();
    const apollo_server = new ApolloServer({
      typeDefs: schema,
      resolvers: resolvers,
      context: async () => ({
        models,
      }),
    });
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
