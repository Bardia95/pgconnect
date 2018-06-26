const pg = require("pg");
const settings = require("./settings"); // settings.json
const myArg = process.argv.slice(2);
const input = myArg[0];
const moment = require('moment');


const knex = require('knex')({
  client: 'pg',
  connection: {
    host     : settings.hostname,
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    port     : settings.port
  }
});

var prettify = function(arrObj) {
  var str = '';
  for (var i = 0; i < arrObj.length; i++) {
    str = str.concat(`${i+1} - ${arrObj[i].first_name} ${arrObj[i].last_name}, born '${moment(arrObj[i].birthdate).format('l')}' \n`);
  }
  return str;
}

knex('famous_people')
  .where({ last_name: `${input}` })
  .orWhere({ first_name: `${input}` })
  .then(rows => console.log(prettify(rows)));