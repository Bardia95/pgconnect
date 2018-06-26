const pg = require("pg");
const settings = require("./settings"); // settings.json
const myArg = process.argv.slice(2);
const fName = myArg[0];
const lName = myArg[1];
const dob = myArg[2];

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


knex('famous_people')
  .insert([
    { first_name: `${fName}`, last_name: `${lName}`, birthdate: `${dob}` }
  ]).then(rows => console.log(rows));
