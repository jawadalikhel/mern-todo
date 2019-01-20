const {GraphQLServer} = require('graphql-yoga');
const mongoose = require('mongoose');
// graphql requires a schem: THIS IS THE SCHEMA
mongoose.connect('mongodb://localhost/testtest0');


const typeDefs =`
  type Query {
    hello(name: String): String!
  }
`

const resolvers = {
  Query: {
    hello: (_, {name}) => `Hello ${name || 'World'}`,
  },
}

const server = new GraphQLServer({typeDefs, resolvers});
// server.start(() => console.log('Server is running on localhost: 4000'));
mongoose.connection.once('open', function(){
  server.start(() =>{
    console.log('Server is running on localhost:4000');
  })
})
