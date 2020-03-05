const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// allow cross-origin requests
app.use(cors());

//connect to mlab database
//make sure to replace my db string & creds with your own
mongoose.connect(
  'mongodb://fulldev:ph4eDELJ3Jc7IScF@cluster0-shard-00-00-rvkdq.mongodb.net:27017,cluster0-shard-00-01-rvkdq.mongodb.net:27017,cluster0-shard-00-02-rvkdq.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority'
);
mongoose.connection.once('open', () => {
  console.log('connected to database');
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log('now listening for requests on port 4000');
});
