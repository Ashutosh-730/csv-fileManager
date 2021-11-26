const mongoose = require("mongoose");

const rowSchema = new mongoose.Schema({
  Firstname: {
    type: String,
  },
  Lastname: {
    type: String,
  },
  City: {
    type: String,
  },
  Salary: {
    type: String,
  },
  Filename: {
    type: String,
  },
});

mongoose.model("Row", rowSchema);
