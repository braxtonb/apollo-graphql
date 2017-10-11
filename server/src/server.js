import express from 'express';
import jsonServer from 'json-server';
import expressGraphQL from 'express-graphql';
import cors from 'cors';
import path from 'path';

import schema from './schema';
const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));


app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
