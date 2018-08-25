let mailConf = {};

if (process.env.MAIL_USER) {
  mailConf.user = process.env.MAIL_USER;
  mailConf.pass = process.env.MAIL_P;
} else {
  const fs = require("fs");
  const path = require("path");

  const fn = path.join(__dirname, "config.json");
  const data = fs.readFileSync(fn);

  const conf = JSON.parse(data);
  mailConf.user = conf.mail_user;
  mailConf.pass = conf.mail_pass;
}

module.exports = mailConf;