import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  graphql,
  compose,
} from 'react-apollo';
import { Link } from 'react-router-dom';
import { customerListQuery } from '../gql/queries';
import { deleteCustomerMutation } from '../gql/mutations';
import NotFound from './NotFound';
import Header from './Header';
import Loader from './Loader';
import CustomerListDeleteButton from './CustomerListDeleteButton';

class CustomerList extends Component {
  render() {
    const { loading, error, customers } = this.props.customersQuery;

    const renderCustomers = () => {
      if (loading) {
        return <li><label htmlFor="loading"><Loader /></label></li>;
      }
      if (error) {
        return <li><label htmlFor="error"><NotFound /></label></li>;
      }

      return customers.map(c => (
        <li key={c.id}>
          <Link to={`/customer/${c.id}`}>{c.name}</Link>
          <CustomerListDeleteButton
            id={c.id}
            mutation={this.props.removeCustomerMutation}
          >
            &#x2715;
          </CustomerListDeleteButton>
        </li>
      ));
    };

    return (
      <div className="App">
        <Header title="customers" />
        <div className="App-list">
          <ul>
            {renderCustomers()}
          </ul>
        </div>
      </div>
    );
  }
}

CustomerList.propTypes = {
  customersQuery: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.shape(),
    customers: PropTypes.arrayOf(PropTypes.shape()),
  }).isRequired,
  removeCustomerMutation: PropTypes.func.isRequired,
};

export default compose(
  graphql(customerListQuery, {
    name: 'customersQuery',
    options: { pollInterval: 5000 },
  }),
  graphql(deleteCustomerMutation, {
    name: 'removeCustomerMutation',
  }),
)(CustomerList);
