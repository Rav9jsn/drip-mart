// Import modules
const express = require("express");
const cors = require("cors");

// Import routes
const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/prouductroutes");
const favRouter = require("./routes/FavouriteRoutes");
const { mongoConnect } = require("./util/databaseUtil");

// Initialize app
const app = express();
app.use(cors());
app.use(express.json()); // To parse JSON body
app.use(express.urlencoded({ extended: true })); // For form data

// port

// Register routes
app.use("/auth", authRouter);
app.use("/product", productRouter);
app.use("/favourites", favRouter);

// Start server
mongoConnect(() => {
  console.log(`"MongoDB connected."`);
});

module.exports = app;
