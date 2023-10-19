const mongoose = require("mongoose");
const todoSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  typeofUser: {
    type: String,
  },
  address: {
    type: String,
  },
});

module.exports = todoSchema;
