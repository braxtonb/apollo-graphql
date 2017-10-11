import {
  GraphQLID,
  GraphQLList
} from 'graphql';
import axios from 'axios';

import { CustomerType } from './types';

const URL = 'http://localhost:4001';

exports.customer = {
  type: CustomerType,
  args: {
    id: { type: GraphQLID }
  },
  resolve(parentValue, args) {
    return axios
      .get(`${URL}/customers/${args.id}`)
      .then(res => res.data);
  }
};

exports.customers = {
  type: new GraphQLList(CustomerType),
  resolve(parentValue, args) {
    return axios
      .get(`${URL}/customers/`)
      .then(res => res.data);
  }
};
