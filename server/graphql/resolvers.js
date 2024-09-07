const Book = require('../models/Book');
const User = require('../models/User'); // Make sure you include the User model
const { AuthenticationError } = require('apollo-server-express');

const { signToken } = require('../utils/auth');

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
    addUser: async (parent, { username, email, password }) => {
      try {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      } catch (err) {
        console.error('Error creating user:', err);
        throw new Error('Failed to create user');
      }
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);
      return { token, user };
    },
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

