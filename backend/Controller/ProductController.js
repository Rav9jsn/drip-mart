const Product = require("../model/ProductModel");
exports.getProduct = async (req, res, next) => {
  const data = await Product.fetch();
  res.status(200).json(data)
};
