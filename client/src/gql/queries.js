import { gql } from 'react-apollo';

export const customerPreviewQuery = gql`
  query CustomerPreviewQuery($customerId: ID!) {
    customer(id: $customerId) {
      id
      name
    }
  }
`;

export const customerDetailsQuery = gql`
  query CustomerDetailsQuery($customerId: ID!) {
    customer(id: $customerId) {
      id
      name
      email
      age
    }
  }
`;

export const customerListQuery = gql`
  query CustomerListQuery {
    customers {
      id
      name
    }
  }
`;
