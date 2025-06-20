const express = require("express");

const favRouter = express.Router();
const favController = require("../Controller/favouritesController");
const ensurAuthentication = require("../middleware/authValidToken");

favRouter.get("/", ensurAuthentication, favController.getFavourites);
favRouter.post("/:favid", ensurAuthentication, favController.addFavourites);

module.exports = favRouter;
