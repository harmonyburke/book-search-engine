const { Book, User } = require('../models');
const { countDocuments } = require('../models/User');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    // find all users
    User: async () => {
      return User.find({});
    },

    // find all Books
    Book: async () => {
      return Book.find({});
    }
  },
  
  Mutation: {

    // create new user
    addUser: async (parent, args) => {
      const newUser = await User.create(args);
      return newUser;
    },
    // login with existing user
    login: async (parent, { email, password }) => {
      const profile = await User.findOne({ email });

      if (!profile) {
        throw AuthenticationError;
      }

      const correctPw = await User.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(profile);
      return { token, profile };
    },
    saveBook: async(parent, args) => {
      const userBooks= await User.findOneAndUpdate(
        {_id: User._id},
        { $addToSet: {savedBooks: body}},
        { new: true, runValidators: true}
      );
      return userBooks;
    },
    // remove Book
    removeBook: async(parent, args, context) => {
      if (context.books) {
        return Book.findOneAndDelete({ bookId:context.book.bookId });
      }
    }
  },
};

module.exports = resolvers;
