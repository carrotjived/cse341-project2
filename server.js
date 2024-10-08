const bodyParser = require("body-parser");
const express = require("express");
const mongodb = require("./data/database.js");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 3000;

//MIDDLE Wares
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Orogin, X-Requested-With, Content-Type, Accept, Z-Key"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT ,DELETE, OPTIONS"
  );
  next();
});
app.use("/", require("./routes"));

process.on("uncaughtException", (err, origin) => {
  console.log(
    process.stderr.fd,
    `Caught Exception: ${err}\n` + `Exception origin: ${origin}`
  );
});


mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database listening on port: ${port}`);
    });
  }
});
