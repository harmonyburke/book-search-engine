const typeDefs = `
  type Query {
   me:User
  }
  
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(userId: ID!, bookData:BookInput) :User
    removeBook(userId: ID!, bookId: String!): User
  }
  input BookInput{   
    bookId:Int
    authors:[String]
    description:String
    title:String
    image:String
    link:String
  }
 
 
  type User {
    _id: ID!
    username: String
    email: String
    bookCount:Int
    savedBooks: [Book]
  }

  type Book {
    bookId:Int
    authors:[String]
    description: String
    title:String
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
