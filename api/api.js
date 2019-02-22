var randomstring = require("randomstring");
var validUrl = require('valid-url');
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

function validateURL(url) {

  return validUrl.isUri(url);

}

function findURL(short, cb) {

  URL.findOne({short: short}, (err, url) => {

    if(err || !url) {
      return cb(new Error("URL not found"));
    }

    cb(null, url.url);

  });

}

function shortenURL(value, cb) {

  if(!validateURL(value)) {
    return cb(new Error("URL is not valid"));
  }

  URL.findOne({url: value}).exec((err, url) => {

    if(err){
      cb(err);
    }

    if(url) {
      cb(null, WEBSITE_URL + url.short);
    }

    let short = randomstring.generate(5);
    let newURL = new URL({
      short: short,
      url: value
    });
    newURL.save((err, url) => {

      if(err) {
        cb(err);
      }
      else {
        cb(null, WEBSITE_URL + url.short);
      }

    });

  });

}

module.exports = {
  shorten: shortenURL,
  find: findURL
}
