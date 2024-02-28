const { Book, User } = require('../models');
const { countDocuments } = require('../models/User');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    // find user
    me: async (parent, args, context) => {
      if(!context.user){
        throw new AuthenticationError('Please log in!')
      }

      return context.user
    },
  },
  
  Mutation: {

    // create new user
    addUser: async (parent, args) => {
      const newUser = await User.create(args);
      const token=signToken(newUser);

      return {token,newUser};
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

    saveBook: async(parent, {userId, bookData}) => {
      return User.findByIdAndUpdate(
        {_id:userId},
        { $addToSet: {savedBooks:bookData}},
        {new: true, runValidators: true}
      )
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
