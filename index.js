const express = require("express");
const api = require("./api");
const app = express();

app.get("/api/shorten", (req, res) => {

    api.shorten(req.query.url, (err, short) => {

      if(err) {
        res.json({
          error: true,
          message: err.message
        });
      }
      else {
        res.json({
          error: false,
          short: short
        });
      }
    });

});

app.listen(8080, function() {

    console.log("Serwer został uruchomiony pod adresem http://localhost:8080");

});
