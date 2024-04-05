const express = require("express");
const port = 5000;
const app = express();
const bodyParser = require("body-parser");
// mongoose package is used to connect with server
const mongoose = require("mongoose");
// npm install cors
const cors = require("cors");
// connection string whic will get form monodb Atlas
const { mongourl } = require("./config/keys");

// serving static file
app.use(express.static("public"));

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to parse urlencoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// to allow origin and method
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");

  next();
});

// Example specifying allowed origins
app.use(
  cors({
    origin: "http://localhost:5000", // Allow requests from this origin
    methods: ["GET", "POST", "DELETE"], // Allow only specified HTTP methods
    credentials: true, // Allow sending cookies and authentication headers
  })
);

require("./route")(app);

// settings view engine
app.set("view engine", "ejs");

// app.listen(port, () => {
//   console.log(`app is running on port : ${port}`);
// });

mongoose
  .connect(mongourl)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    // Start your Express server after successfully connecting to MongoDB
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err.message);
  });
