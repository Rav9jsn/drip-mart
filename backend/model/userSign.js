const { getdb } = require("../util/databaseUtil");
const jwt = require("jsonwebtoken");
const { envData } = require("../config");
const { key } = envData;

const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");
const saltRounds = 10;

module.exports = class User {
  constructor(name, email, password, confirmPassword, role) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.role = role;
    this.Favourites = [];
  }
  async save() {
    const db = getdb();
    const emailCheck = await db
      .collection("User")
      .findOne({ email: this.email });
    if (emailCheck) {
      return { message: "email already exist", success: false };
    } else {
      this.password = await bcrypt.hash(this.password, saltRounds);
      this.confirmPassword = await bcrypt.hash(
        this.confirmPassword,
        saltRounds
      );
      db.collection("User").insertOne(this);
      return { success: true };
    }
  }

  async loggedIn(email, password) {
  const db = getdb();

  const user = await db.collection("User").findOne({ email: email });

  // ✅ Check if user exists
  if (!user) {
    return { message: "User not found", success: false };
  }

  // ✅ Safely compare passwords
  const IspasswordSame = await bcrypt.compare(password, user.password);

  if (!IspasswordSame) {
    return { message: "Invalid Email or Password", success: false };
  }

  // ✅ Generate JWT only if password matches
  const jwtToken = jwt.sign({ name: user.name, email: user.email }, key, {
    expiresIn: "24h",
  });

  return {
    message: "Logged In successfully",
    success: true,
    token: jwtToken,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}


  static async addFav(id, email) {
    const db = getdb();
    const product = await db.collection("product").findOne({ id: id });
    const obId = product._id;

    await db
      .collection("User")
      .updateOne({ email: email }, { $addToSet: { Favourites: obId } });
    return { title: product.title };
  }
  static fetchAll() {
    const db = getdb();
    return db.collection("User").find().toArray();
  }
  static async fetchAllFav(email) {
    const db = getdb();
    const [user] = await db.collection("User").find({ email: email }).toArray();
    const favList = user.Favourites;

    const favProductPromises = favList.map((fav, i) =>
      db
        .collection("product")
        .find({ _id: new ObjectId(fav) })
        .toArray()
    );
    const favPro = await Promise.all(favProductPromises);
    const favProducts = favPro.flat();

    return { favProducts };
  }
};
