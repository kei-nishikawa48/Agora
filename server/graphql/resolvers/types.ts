import { Models } from '../../models';

export type ResolverContext = {
  models: Models;
  jwt: {
    secret: string;
    expiresIn: string;
  };
};
