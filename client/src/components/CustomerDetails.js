import React from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { customerDetailsQuery } from '../gql/queries';
import CustomerPreview from './CustomerPreview';
import NotFound from './NotFound';
import Header from './Header';

const CustomerDetails = ({ data: { loading, error, customer }, match }) => {
  if (loading) {
    return <CustomerPreview customer={match.params.customerId} />;
  }

  const renderDetails = () => {
    if (error) {
      return <li><label htmlFor="error"><NotFound /></label></li>;
    }

    return Object
      .keys(customer)
      .map((field) => {
        if (field === 'id' || field === 'name' || field === '__typename') {
          return null;
        }

        return (
          <li key={field}>
            <label htmlFor={field}>{field}: {customer[field]}</label>
          </li>
        );
      });
  };

  return (
    <div className="App">
      <Header title={error ? '404' : customer.name} />
      <div className="App-list">
        <ul>
          {renderDetails()}
        </ul>
      </div>
    </div>
  );
};

CustomerDetails.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.shape(),
    customer: PropTypes.shape(),
  }).isRequired,
  match: PropTypes.shape().isRequired,
};

export default graphql(customerDetailsQuery, {
  options: props => ({
    variables: { customerId: props.match.params.customerId },
  }),
})(CustomerDetails);
