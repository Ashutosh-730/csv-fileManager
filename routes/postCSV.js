const express = require("express");
const csvtojson = require("csvtojson");
const mongoose = require("mongoose");
const Row = mongoose.model("Row");
const router = express.Router();
const loginRequired = require("../middleware/loginRequired");

router.post("/insertdata", loginRequired, (req, res) => {
  // CSV to arr -------------------------------------------
  const fileName = "employee.csv";
  var arr = [];

  csvtojson()
    .fromFile(fileName)
    .then((data) => {
      // Storing each row in a object and adding it in a array.
      for (let i = 0; i < data.length; i++) {
        var oneRow = {
          Firstname: data[i]["Firstname"],
          Lastname: data[i]["Lastname"],
          City: data[i]["City"],
          Salary: data[i]["Salary"],
          Filename: fileName,
        };
        arr.push(oneRow);
      }
      //--------------------------------------------------------

      console.log(arr);

      // Inserting in database collection --------------
      Row.insertMany(arr, (e, status) => {
        if (e) {
          res.send(e);
        } else {
          res.send(status);
        }
      });
      //------------------------------------------------
    });
});

module.exports = router;
