const express = require("express");
const mongoose = require("mongoose");
const apiroute = require("./routes/api.js");
const htmlroute = require("./routes/html.js");

//needed but elsewhere
//const path = require("path");

const app = express();
const PORT = process.env.PORT || 8000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
});
//note to self not sure which works above or below?
// app.use(express.static(__dirname + '/public'));
// app.use(express.static('./'));

app.use("/api", apiroute);
app.use("/", htmlroute);

app.listen(PORT, function () {
  console.log("App listening on PORT" + PORT);
});
