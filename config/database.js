'use strict';

const mongoose = require('mongoose');
const dbName = process.env.MONGODB_NAME;

// connect to the database
mongoose.connect(`mongodb://${process.env.MONGODB_URI}/${dbName}`);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log(`Connected to the ${dbName} database`);
});
