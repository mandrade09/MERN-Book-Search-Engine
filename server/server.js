// server/server.js

const express = require('express');
const session = require('express-session');
const { ApolloServer } = require('apollo-server-express');
const { expressMiddleware } = require('@apollo/server/express4');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const db = require('./config/connection');
const path = require('path');

const authMiddleware = require('./utils/auth');

const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware, // Use the middleware here
});

async function startServer() {
  // Start Apollo Server
  await server.start();

  // Apply Apollo middleware to Express app
  // server.applyMiddleware({ app });

  // Middleware setup
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));

  // Serve static assets from the React app
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  // Connect to MongoDB and start the server
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
}

// Start the server
startServer();
