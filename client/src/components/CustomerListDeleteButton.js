import React from 'react';
import PropTypes from 'prop-types';
import { customerListQuery } from '../gql/queries';

const CustomerListDeleteButton = ({ id, mutation, children }) => {
  const handleClick = () => {
    mutation({
      variables: {
        customerId: id,
      },
      optimisticResponse: {
        deleteCustomer: {
          id,
          name: 'Deleted Customer',
          __typename: 'Customer',
        },
      },
      update: (store, { data: { deleteCustomer } }) => {
        // Retrieve customer list from cache
        const data = store.readQuery({ query: customerListQuery });
        // Filter out the deleteCustomer
        data.customers = data.customers.filter(c => c.id !== deleteCustomer.id);
        // Write filtered result to cache
        store.writeQuery({ query: customerListQuery, data });
      },
    })
      .catch(error => console.log('[CustomerListDeleteButton] error', error));
  };

  return (
    <button className="App-list__delete" onClick={handleClick}>{children}</button>
  );
};

CustomerListDeleteButton.propTypes = {
  id: PropTypes.string.isRequired,
  mutation: PropTypes.func.isRequired,
  children: PropTypes.node,
};

CustomerListDeleteButton.defaultProps = {
  children: [],
};

export default CustomerListDeleteButton;
