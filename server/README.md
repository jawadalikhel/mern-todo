<h1>Starting with GraphQLServer Steps</h1>

<h3>1st: Import dependencies and other files required:</h3>
<p>      1st: Create a file called index.js</p>
<p>      2nd: npm init to download package.json</p><br/>

<h4>required dependencies</h4>
<p>npm install graphql-yoga</p>
<p>npm install mongoose</p><br/>

<h3>2nd: Inside index.js</h3>
<p>require mongoose, and graphql-yoga</p>
<p>
const {GraphQLServer} = require('graphql-yoga');<br/>
const mongoose = require('mongoose');
</p>

<h3>3rd: </h3>
<p>connect graphql with mongoose and start the server</p>
<p>

mongoose.connect('mongodb://localhost/testtest0');
const server = new GraphQLServer({typeDefs, resolvers});
mongoose.connection.once('open', function(){
  server.start(() =>{
    console.log('Server is running on localhost:4000');
  })
})
</p>



<h3>2nd: </h3>
<h3>2nd: </h3>
