const {  gql } = require('apollo-server-express');

export const typeDefs = gql`
  type Todo {
    id: Int!
    title: String
  }
  type User {
    id: Int!
    name: String
    email: String
    password: String
  }  
  type Query {
    hello: String
    todo(id: Int): Todo
    todos: [Todo]
    users: [User]    
  }
  type Mutation {
    addTodo(title: String!): Todo
    updateTodo(id: Int!, title: String!): Todo
    deleteTodo(id: Int!): Todo
  }
`;
