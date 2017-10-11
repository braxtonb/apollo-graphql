import {
  GraphQLObjectType,
  GraphQLSchema
} from 'graphql';

import * as Mutations from './mutations';
import * as Queries from './queries';


// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    customer: Queries.customer,
    customers: Queries.customers
  }
});

// Mutation
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addCustomer: Mutations.addCustomer,
    deleteCustomer: Mutations.deleteCustomer,
    editCustomer: Mutations.editCustomer
  }
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation
});
