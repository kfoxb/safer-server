const Sequelize = require('sequelize');
const mysql = require('mysql');

let dbName = 'saferDb';
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: ''
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting to mysql: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

connection.query(`CREATE DATABASE ${dbName}`, function (error, results, fields) {
  if (error) {
    //ignore the error since there will be an error when the database exists
    console.log(`Did not create ${dbName} since it already exists`);
  } else {
    console.log(`The ${dbName} database did not exist so it was created.`);
  }
});

connection.end(function(err) {
  console.log(`Closing the mysql connection that was used to check if ${dbName} existed`);
});

const db = new Sequelize(process.env.CLEARDB_DATABASE_URL, {
  logging: false
});

module.exports = db;