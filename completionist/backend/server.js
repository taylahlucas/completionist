require('dotenv').config()
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/schema');

const PORT = process.env.PORT || 5001;

const uri = process.env.MONGO_URL;

mongoose.connect(uri);

const server = new ApolloServer({ typeDefs, resolvers })
const app = express();

async function startServer() {
  await server.start();

  server.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();