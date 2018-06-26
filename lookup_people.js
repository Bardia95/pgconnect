const pg = require("pg");
const settings = require("./settings"); // settings.json
var myArg = process.argv.slice(2);
var input = myArg[0];
const moment = require('moment');

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port
});



var prettify = function(arrObj) {
  var str = '';
  for (var i = 0; i < arrObj.length; i++) {
    str = str.concat(`${i+1} - ${arrObj[i].first_name} ${arrObj[i].last_name}, born '${moment(arrObj[i].birthdate).format('l')}' \n`);
  }
  return str;
}

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  var q = `SELECT * FROM famous_people WHERE first_name = '${input}' OR last_name = '${input}'`;
  client.query(q, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(prettify(result.rows));
    client.end();
  });
});