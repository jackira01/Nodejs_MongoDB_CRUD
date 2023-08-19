const mongoose = require('mongoose');

const { MONGODB_URI } = process.env;

mongoose.set('strictQuery', true);

mongoose
  .connect(MONGODB_URI)
  .then((db) => console.log('Database is connect'))
  .catch((err) => console.log(err));
