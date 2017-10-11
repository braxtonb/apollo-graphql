import { gql } from 'react-apollo';

export const addCustomerMutation = gql`
  mutation AddCustomerMutation($customer: CustomerInput!) {
    addCustomer(customer: $customer) {
      id
      name
    }
  }
`;

export const deleteCustomerMutation = gql`
  mutation DeleteCustomerMutation($customerId: ID!) {
    deleteCustomer(id: $customerId) {
      id
      name
    }
  }
`;

export const editCustomerMutation = gql`
  mutation EditCustomerMutation($customerId: ID!, $customer: CustomerInput!) {
    editCustomer(id: $customerId, customer: $customer) {
      id
      name
      email
      age
    }
  }
`;
