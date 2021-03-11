import { config, createSchema } from '@keystone-next/keystone/schema';
import { createAuth } from '@keystone-next/auth';
import { withItemData, statelessSessions } from '@keystone-next/keystone/session';
import { ProductImage } from './schemas/ProductImage';
import { Product } from './schemas/Product';
import { User } from './schemas/User';

import 'dotenv/config';

const databaseUrl = process.env.DATABASE_URL;

const sessionConfig = {
  // mennyi ideig marad a user logolva
  maxAge: 60 * 50 * 24 * 360,
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  //  az elso user
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    // todo: add initial roles
  },
});

export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      adapter: 'mongoose',
      url: databaseUrl,
      // todo: add data seeding here
    },
    lists: createSchema({
      User,
      Product,
      ProductImage,
      //   schema items go in here
    }),
    //  access to dhe cms keystone admin ui
    ui: {
      // show the ui only for people who pass this test
      isAccessAllowed: ({ session }) =>
        // console.log('🚀 ~ file: keystone.ts ~ line 48 ~ session', session);
        session?.data,
    },
    //   todo: add session values here
    session: withItemData(statelessSessions(sessionConfig), {
      // graphql query
      User: 'id name email',
    }),
  })
);
