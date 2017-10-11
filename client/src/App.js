import React, { Component } from 'react';
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
  toIdValue,
} from 'react-apollo';
import {
  BrowserRouter,
  Route,
  Link,
  Switch,
} from 'react-router-dom';
import CustomerList from './components/CustomerList';
import CustomerDetails from './components/CustomerDetails';
import AddCustomer from './components/AddCustomer';
import Header from './components/Header';
import NotFound from './components/NotFound';
import './App.css';

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:4000/graphql',
});

networkInterface.use([{
  applyMiddleware(req, next) {
    setTimeout(next, 500);
  },
}]);

const dataIdFromObject = result => (
  (result.__typename && result.id !== undefined)
    ? `${result.__typename}:${result.id}`
    : null
);

const client = new ApolloClient({
  networkInterface,
  customResolvers: {
    Query: {
      customer: (_, { id }) => (
        toIdValue(dataIdFromObject({
          __typename: 'Customer',
          id,
        }))
      ),
    },
  },
  dataIdFromObject,
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <div>
            <nav className="App-nav">
              <Link to="/">@home</Link>
              <Link to="/new">+add</Link>
            </nav>
            <Switch>
              <Route exact path="/" component={CustomerList} />
              <Route path="/customer/:customerId" component={CustomerDetails} />
              <Route path="/new" component={AddCustomer} />
              <Route render={() => <Header title={<NotFound />} />} />
            </Switch>
          </div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
