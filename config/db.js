const mongoose = require("mongoose");

let dbconf;

if (process.env.MONGODB_URI) {
  dbconf = process.env.MONGODB_URI;
} else {
  const fs = require("fs");
  const path = require("path");

  const fn = path.join(__dirname, "config.json");
  const data = fs.readFileSync(fn);

  const conf = JSON.parse(data);
  dbconf = conf.dbconf;
}

mongoose.connect(dbconf);
