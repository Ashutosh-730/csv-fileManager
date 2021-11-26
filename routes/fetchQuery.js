const mongoose = require("mongoose");
const Row = mongoose.model("Row");
const express = require("express");
const router = express.Router();
const loginRequired = require("../middleware/loginRequired");

// To find and filter data
router.get("/find-filter", loginRequired, async (req, res) => {
  try {
    const { query, projection } = req.body;
    const employeeData = await Row.find(query, projection);
    res.json({ employeeData });
  } catch (e) {
    res.json({ message: e.message });
  }
});

// To uadate/edit any data
router.get("/update", loginRequired, async (req, res) => {
  try {
    const { query, projection } = req.body;
    const employeeData = await Row.updateMany(query, projection);
    res.json({ employeeData });
  } catch (e) {
    res.json({ message: e.message });
  }
});

// To delete any data
router.get("/delete", loginRequired, async (req, res) => {
  try {
    const { query } = req.body;
    const employeeData = await Row.deleteMany(query);
    res.json({ employeeData });
  } catch (e) {
    res.json({ message: e.message });
  }
});

module.exports = router;
