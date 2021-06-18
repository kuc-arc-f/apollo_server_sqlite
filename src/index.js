const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
import LibTodos from '../lib/LibTodos'
import {typeDefs} from './scheme'

//
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    async todo(parent, args, context, info){
      return await LibTodos.get_todo(args.id);
    },
    todos:async () => {
      return await LibTodos.get_items()
    },    
  },
  Mutation: {
    addTodo: async (parent, args, context) => {
      var ret = await LibTodos.add_todo(args)
      ret.id = 0
      return ret
    },
    updateTodo: async (parent, args, context) => {
      var ret = await LibTodos.update_todo(args)
      return ret
    },
    deleteTodo: async (parent, args, context) => {
      var ret = args
      ret.title = ""
      var ret = await LibTodos.delete_todo(args)
      return ret
    },    
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
server.applyMiddleware({ app });
// ENV
console.log(app.get('env'));
var config = require('../config.json')[app.get('env')];
// console.log(config.MYSQL_DBNAME);

app.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
});
