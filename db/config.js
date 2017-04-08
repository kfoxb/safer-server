const Sequelize = require('sequelize');
const db = new Sequelize('mysql://localhost/saferDb');

db
.authenticate()
.then((err) =>{
  console.log('Connection has been established');
}, (err)=>{
  console.log('Connection has failed', err);
});

module.exports = db;