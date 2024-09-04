// server/server.js

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const db = require('./config/connection');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Pass the `authMiddleware` function into the context to handle authentication
    return authMiddleware({ req });
  },
});

// Apply Apollo middleware to the Express app
server.start().then(() => {
  server.applyMiddleware({ app });

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Serve up static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  // Default route
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });

  // Start the server
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
      console.log(`🚀 Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
});


