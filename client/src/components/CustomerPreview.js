import React from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { customerPreviewQuery } from '../gql/queries';
import NotFound from './NotFound';
import Loader from './Loader';
import Header from './Header';

const CustomerPreview = ({ data: { loading, error, customer } }) => {
  const renderPreview = () => {
    if (loading) {
      return 'Loading Name...';
    }
    if (error) {
      return <NotFound />;
    }

    return customer.name;
  };

  return (
    <div className="App">
      <Header title={renderPreview()} />
      <div className="App-list">
        <ul>
          <li>
            <label htmlFor="loading"><Loader /></label>
          </li>
        </ul>
      </div>
    </div>
  );
};

CustomerPreview.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.shape(),
    customer: PropTypes.shape(),
  }).isRequired,
  customer: PropTypes.string,
};

export default graphql(customerPreviewQuery, {
  options: props => ({
    variables: { customerId: props.customer },
  }),
})(CustomerPreview);
