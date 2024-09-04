const Book = require('../models/Book');
const User = require('../models/User'); // Make sure you include the User model
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    books: async () => {
      return await Book.find({});
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findById(context.user._id).populate('savedBooks');
      }
      throw new AuthenticationError('Not logged in');
    },
  },
  Mutation: {
    saveBook: async (parent, { title, authors, description, image, link }, context) => {
      const newBook = new Book({ title, authors, description, image, link });
      return await newBook.save();
    },
    deleteBook: async (parent, { id }, context) => {
      return await Book.findByIdAndDelete(id);
    },
  },
};

module.exports = resolvers;

