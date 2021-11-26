const express = require("express");
const mongoose = require("mongoose");

const port = process.env.PORT || 5000;

const app = express();

// Schemas ---------------
require("./models/user");
require("./models/row");
//------------------------

// MongoDB Connection -----------------------------------
const url =
  "mongodb+srv://OneAssure:OneAssure@cluster0.r5c5x.mongodb.net/OneAssure?retryWrites=true&w=majority";

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("MongoDB Connection Successful"))
  .catch((err) => {
    console.log("MongoDB Connection Error :: ", err);
  });
//-------------------------------------------------------

app.use(express.json());

// All routes ----------------------------
app.use(require("./routes/auth"));
app.use(require("./routes/postCSV"));
app.use(require("./routes/fetchQuery"));
//----------------------------------------

app.listen(port, () => {
  console.log(`Server is running on Port :: ${port}`);
});
