import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { addCustomerMutation } from '../gql/mutations';
import { customerListQuery } from '../gql/queries';
import Loader from './Loader';
import Header from './Header';
import Response from './Response';

const INITIAL_STATE = {
  name: '',
  email: '',
  age: '',
  loading: false,
  message: '',
  submitted: false,
  success: false,
};

class AddCustomer extends Component {
  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderForm = this.renderForm.bind(this);
  }

  handleChange(e, input) {
    this.setState({
      [input]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { name, email, age } = this.state;

    if (!name || !email || !age) {
      console.log('not submitted, all fields required!');
      return;
    }

    this.setState({
      loading: true,
      submitted: false,
      success: false,
    });
    this.props.mutate({
      variables: {
        customer: {
          name,
          email,
          age,
        },
      },
      // optimisticResponse: {
      //   addCustomer: {
      //     id: (-1 * (new Date()).getTime()),
      //     name,
      //     __typename: 'Customer',
      //   },
      // },
      // update: (store, { data: { addCustomer } }) => {
      //   // Read all customers from cache
      //   const data = store.readQuery({ query: customerListQuery });
      //   // Add customer to customers in cache
      //   data.customers.push(addCustomer);
      //   // Write updated data to cache
      //   store.writeQuery({
      //     query: customerListQuery,
      //     data,
      //   });
      // },
    })
      .then(() => (
        this.setState({
          name: '',
          email: '',
          age: '',
          loading: false,
          submitted: true,
          success: true,
          message: `${name} added`,
        })
      ))
      .catch((res) => {
        console.log('[AddCustomer] error', res);
        this.setState({
          loading: false,
          submitted: true,
          success: false,
          message: `error adding ${name}`,
        });
      });
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset>
          <label htmlFor="name">NAME</label>
          <input
            name="name"
            type="text"
            value={this.state.name}
            onChange={e => this.handleChange(e, 'name')}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="email">EMAIL</label>
          <input
            name="email"
            type="email"
            value={this.state.email}
            onChange={e => this.handleChange(e, 'email')}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="age">AGE</label>
          <input
            name="age"
            type="number"
            value={this.state.age}
            onChange={e => this.handleChange(e, 'age')}
          />
        </fieldset>
        <input
          type="submit"
          value="Add"
        />
      </form>
    );
  }

  render() {
    const { loading, submitted, message, success } = this.state;

    return (
      <div className="App">
        <Header title="new customer" />
        <div className="App-form">
          {this.renderForm()}
        </div>
        {(loading || submitted || success || message)
          && <div className="App-status">
            {loading && <Loader />}
            {submitted && <Response message={message} success={success} />}
          </div>}
      </div>
    );
  }
}

AddCustomer.propTypes = {
  mutate: PropTypes.func.isRequired,
};

export default graphql(addCustomerMutation)(AddCustomer);
