const {GraphQLServer} = require('graphql-yoga');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/testtest0');



//// creating the schema for the App
//1st: create the schema: create the "type Todo" in "typeDefs"
//2nd: add a "type Mutation" in the "typeDefs" and pass the arguments from the schema
// *** the ! mark after the String in "typeDefs" means that it's require to pass that arguments
// 3rd: in "resolvers" create "Mutation" and call in the "createTodo"

///////////// To readt or fetch the data
// 1st: update the schema in 'type Query' and add the todo in "type Query"
// 2nd: in "resolvers" --> "Query" call the todos
const Todo = mongoose.model('Todo', {
  text: String,
  complete: Boolean
});

const MySibs = mongoose.model('MySibs', {
  name: String,
  age: String
})

const carsSchema = mongoose.model('Cars', {
  model: String,
  color: String,
  year: String
})

const classesScema = mongoose.model('Classes', {
  classes: String,
  subject: String
})

// graphql requires a schem: THIS IS THE SCHEMA
const typeDefs =`
  type Query {
    hello(name: String): String!
    todos: [Todo]
    showSib: [MySibs]
    showCars: [carsSchema]
    showClasses: [classesScema]
  },
  type Todo {
    id: ID!,
    text: String!,
    complete: Boolean
  },
  type MySibs {
    id: ID!,
    name: String,
    age: String
  },
  type carsSchema {
    id: ID!,
    model: String!,
    color: String!,
    year: String
  },
  type classesScema {
    id: ID!
    classes: String!,
    subject: String!
  }
  type Mutation {
    createTodo(text: String!): Todo,
    addSib(name: String!, age: String!): MySibs,
    addCars(model: String!, color: String!, year: String!) : carsSchema
    createClass(classes: String!, subject: String!): classesScema
  }
`

const resolvers = {
  Query: {
    hello: (_, {name}) => `Hello ${name || 'World'}`,
    todos: () => Todo.find(),
    showSib: () => MySibs.find(),
    showCars: () => carsSchema.find(),
    showClasses: () => classesScema.find()
  },

  Mutation: {
    createTodo: async (_, { text }) =>{
      const todo = new Todo ({text, complete: false});
      await todo.save();
      return todo;
    },

    addSib: async (_, {name, age}) =>{
      const sib = new MySibs ({name, age});
      await sib.save();
      return sib;
    },

    addCars: async (_, {model, color, year}) =>{
      const createCar = new carsSchema ({model, color, year});
      await createCar.save();
      return createCar;
    },
    createClass: async (_, {classes, subject}) =>{
      const addClass = new classesScema({classes, subject});
      await addClass.save();
      return addClass;
    }
  }
}

const server = new GraphQLServer({typeDefs, resolvers});
// server.start(() => console.log('Server is running on localhost: 4000'));
mongoose.connection.once('open', function(){
  server.start(() =>{
    console.log('Server is running on localhost:4000');
  })
})
