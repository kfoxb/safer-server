const Sequelize = require('sequelize');
const db = new Sequelize('mysql://root@localhost/saferDb');

// db
// .authenticate()
// .then((err) =>{
//   console.log('Connection has been established');
// }, (err)=>{
//   console.log('Connection has failed');
// });

module.exports = db;