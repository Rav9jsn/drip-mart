const User = require("../model/userSign");

exports.addFavourites = async (req, res, next) => {
  const Productid = Number(req.params.favid);
  const { email } = req.user;
  const { title } = await User.addFav(Productid, email);
  res.status(200).json({ message: "Added in favlist", title });
};

exports.getFavourites = async (req, res, next) => {
  const { email } = req.user;
  const { favProducts } = await User.fetchAllFav(email);
  res.status(200).json({ favProducts });
};
