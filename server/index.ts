import { ApolloServer } from 'apollo-server';
import { resolvers } from './graphql/resolvers';
import { typeDefs } from './graphql/typeDefs';

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

const start_server = async () => {
  try {
    const res = await server.listen(3000);
    console.log(`Server ready at ${res.url}`);
  } catch (res) {
    console.log(res);
  }
};

start_server();
