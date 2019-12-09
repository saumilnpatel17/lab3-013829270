const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const { database } = require('./config/config');
const cors = require('cors');

const app = express();

app.use(cors());
const connectDB = async () => {
    try {
      await mongoose.connect(database, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      });
      console.log("MongoDB connected successfully");
    } catch (err) {
      console.log("Could not connect to MongoDB", err);
    }
  };
  connectDB();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true    
}));

app.listen(4000, () => {
    console.log("Now listening for requests on port 4000");
});