const path  = require('path')
require("dotenv").config({path:path.join(__dirname,'.env')});

exports.envData = {
  port: process.env.PORT,
  uri: process.env.MONGODB_PATH,
  key:process.env.SECRUITY_KEY,
};
