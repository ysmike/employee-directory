/* eslint-disable no-await-in-loop */
const { Keystone } = require('@keystonejs/keystone');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');
const { Text, Integer, Url } = require('@keystonejs/fields');
const axios = require('axios');
require('dotenv').config();

const PROJECT_NAME = 'employee-directory';
const { DATABASE_URL, DATA_URL, DATA_FETCH_COUNT } = process.env;
const adapterConfig = { mongoUri: DATABASE_URL };

/**
 * You've got a new KeystoneJS Project! Things you might want to do next:
 * - Add adapter config options (See: https://keystonejs.com/keystonejs/adapter-mongoose/)
 * - Select configure access control and authentication (See: https://keystonejs.com/api/access-control)
 */

const keystone = new Keystone({
  adapter: new Adapter(adapterConfig),
  // seeds data from the `randomuser.me` API if the collection is empty
  onConnect: async () => {
    const { mongoose } = keystone.adapter;
    // TODO: remove deleteMany to persist data
    // await mongoose.models.Employee.deleteMany();
    const documentCount = await mongoose.models.Employee.countDocuments();
    if (!documentCount) {
      const { data: { results } } = await axios.get(`${DATA_URL}${DATA_FETCH_COUNT}`);
      for (const employee of results) {
        const simplifiedEmployee = {
          firstName: employee.name.first,
          lastName: employee.name.last,
          email: employee.email,
          cell: employee.cell,
          age: employee.dob.age,
          gender: employee.gender,
          city: employee.location.city,
          state: employee.location.state,
          country: employee.location.country,
          photoURL: employee.picture.large,
          countryCode: employee.nat,
        };
        try {
          await mongoose.model('Employee').create(simplifiedEmployee);
        } catch (e) {
          console.error(e);
        }
      }
    }
  },
});

// create an `Employee` schema
keystone.createList('Employee', {
  schemaDoc: 'A list of employees',
  fields: {
    firstName: { type: Text, isRequired: true },
    lastName: { type: Text, isRequired: true },
    email: { type: Text, isRequired: true, isUnique: true },
    cell: { type: Text },
    age: { type: Integer },
    gender: { type: Text },
    city: { type: Text },
    state: { type: Text },
    country: { type: Text },
    photoURL: { type: Url },
    countryCode: { type: Text },
  },
});

module.exports = {
  keystone,
  apps: [new GraphQLApp(), new AdminUIApp({ name: PROJECT_NAME, enableDefaultRoute: true })],
};
