const { getdb } = require("../util/databaseUtil");

module.exports = class Product {
  constructor() {}
  static async fetch() {
    const db = getdb();
    return await db.collection("product").find().toArray();
  }
};
