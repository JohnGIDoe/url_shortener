const mongoose = require("mongoose");

const DB_USER = "admin";
const DB_PASSWORD = "haslo123";
const WEBSITE_URL = "http://localhost:8080/";

mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@ds147225.mlab.com:47225/basedata`);

let schema = new mongoose.Schema({
  short: String,
  url: String
});

let URL = mongoose.model("URL", schema);

function shortenURL(url, cb) {



}

module.exports = {
  shorten: shortenURL
}
