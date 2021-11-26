const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRequired = require("../middleware/loginRequired");

const JWT_Secret = "iamnotbrillientbutiamuniqueiamasoftwareengineer";

// Testing middleware::
router.get("/protected", loginRequired, (req, res) => {
  res.send("Hello! Dear User.");
  console.log("Hello user!! you passed without any error.");
});

// Sign Up Route::
router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res.status(422).json({ error: "all fields are mendatory" });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        res.status(422).json({ error: "User already exists for this email." });
      }
      bcrypt.hash(password, 12).then((hashedPassword) => {
        const user = new User({
          email,
          password: hashedPassword,
          name,
        });
        user
          .save()
          .then((user) => {
            res.json({ message: "Saved Successfully" });
          })
          .catch((e) => {
            console.log("Error", e);
          });
      });
    })
    .catch((e) => {
      console.log(e);
    });
});

// Log In Route::
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  //console.log(req.body);
  if (!email || !password) {
    return res.status(422).json({ error: "Email and Password both Required" });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "Invalid Email or Password" });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          // res.json({message:"Logged in Successfully."})
          const token = jwt.sign({ _id: savedUser._id }, JWT_Secret);
          res.json({ token: token, message: "Logged in Successfully" });
          console.log("Login Successfully");
        } else {
          return res
            .status(422)
            .json({ error: "Invalid Email or Password:: Try Again" });
        }
      })
      .catch((e) => {
        console.log("Error", e);
      });
  });
});

module.exports = router;
