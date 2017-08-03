'use strict';

const mongoose = require('mongoose');
const dbName = 'groupee';

// connect to the database
mongoose.connect(`mongodb://localhost/${dbName}`);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('openUri', () => {
  console.log(`Connected to the ${dbName} database`);
});
