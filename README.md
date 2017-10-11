# Apollo + GraphQL Customer Application

### Overview
Application used to maintain a list of customers' name, email, and age.

### Directory Structure

|Location|Description|
|:---|:---|
|`client`|Front End UI and Apollo request logic|
|`server`|Backend server using GraphQL schemas and resolvers|


### THE STACK

* Apollo
* GraphQL
* ReactJS
* ExpressJS
* Node.js

### Development Setup

1. `cd server && npm run dev:server` to begin node server `port 4000`
2. in a second terminal window, `npm run json:server` to begin json-server that creates a REST API from a json file `port 4001`
3. in a third terminal window, `cd .. && cd client && npm start` to start the front end `port 3000`


### What's the point?

Can be used by anyone to get a better understanding of how Apollo and GraphQL are used


##### TODO

* Add way to edit a customer's info
* Fix bug where deleting multiple customers quickly does not work
* Remove polling from CustomerList component after figuring out why updating cache after adding customer throws error
