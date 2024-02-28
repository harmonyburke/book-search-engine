import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password, String!) {
    loginUser(emai: $email, password: $password) {
     token
     user{
      _id
      username
      email
      bookCount
     }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, email: String!, password:String!) {
    addUser(username: $username, email: $email, password $password) {
     token
     user{
      _id
      username
      email
      bookCount
     }
    }
  }
`;
 export const REMOVE_BOOK = gql`
 mutation removeBook($userId: ID~, $bookID:String~){
  removeBook(userId: $userId, bookId: $bookId){
    _id
    username
    email
    bookCount

  }
 }`;

 export const SAVE_BOOK= gql`
 mutation saveBook($userId: ID!, $bookData: BookInput!){
  saveBook(userId: $userId, bookData: $book){
    _id
    username
    email
    bookCount
    savedBooks{
      bookId
      authors
      description
      title
      image
      link
    }
  }
 }`;
