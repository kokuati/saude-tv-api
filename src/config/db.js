const mongoose = require("mongoose");
const requireDir = require("require-dir");

module.exports = {
  async connect() {
    mongoose.connect(process.env.MONGO_DB_URL, {});
  },
};
