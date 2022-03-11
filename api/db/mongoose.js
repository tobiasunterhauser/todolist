//This file will handle connection to mongoDB

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/Einkaufsliste', {useNewUrlParser: true }).then(() => {
  console.log("Connected to db");
}).catch((e) => {
  console.log("Error");
  console.log(e);
});

module.exports = {
  mongoose
};
