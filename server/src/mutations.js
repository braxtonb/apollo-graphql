import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLInt
} from 'graphql';
import axios from 'axios';

import { CustomerType, CustomerInput } from './types';

const URL = 'http://localhost:4001';

export const addCustomer = {
  type: CustomerType,
  args: {
    customer: { type: new GraphQLNonNull(CustomerInput) },
  },
  resolve(parentValue, { customer }) {
    return axios
      .post(`${URL}/customers`, {
        name: customer.name,
        email: customer.email,
        age: customer.age
      })
      .then(res => res.data);
  }
};

export const deleteCustomer = {
  type: CustomerType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve(parentValue, args) {
    console.log('args', args);
    return axios
      .delete(`${URL}/customers/${args.id}`)
      .then(res => args);
  }
};

export const editCustomer = {
  type: CustomerType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt },
  },
  resolve(parentValue, args) {
    return axios
      .patch(`${URL}/customers/${args.id}`, args)
      .then(res => res.data);
  }
};

// export const editCustomer = {
//   type: CustomerType,
//   args: {
//     id: { type: new GraphQLNonNull(GraphQLID) },
//     customer: { type: new GraphQLNonNull(CustomerInput) },
//   },
//   resolve(parentValue, { customer }) {
//     return axios
//       .patch(`${URL}/customers/${customer.id}`, customer)
//       .then(res => res.data);
//   }
// };
