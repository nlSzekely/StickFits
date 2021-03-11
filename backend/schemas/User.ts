import { list } from '@keystone-next/keystone/schema';
import { password, relationship, text } from '@keystone-next/fields';

export const User = list({
  // access
  // ui
  fields: {
    //   isIndexed: true - gives query performance
    name: text({ isRequired: true }),
    email: text({ isRequired: true, isUnique: true }),
    password: password(),
    // todo add roles cart and orders
  },
});
