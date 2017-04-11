const Sequelize = require('sequelize');
const db = new Sequelize(process.env.CLEARDB_DATABASE_URL);

// db
// .authenticate()
// .then((err) =>{
//   console.log('Connection has been established');
// }, (err)=>{
//   console.log('Connection has failed');
// });

module.exports = db;