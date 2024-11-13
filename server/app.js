const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

const app = express();
app.use(cors());

mongoose.connect('mongodb+srv://abrielleperry22:m5MFaOfAuit571pL@filesmanager.x25kz.mongodb.net/?retryWrites=true&w=majority&appName=FilesManager', {
});

mongoose.connection.once('open', () => {
    console.log('connected to database');
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log('Now listening for requests on port 4000');
});
