const db = require('./config.js')
const Users = require('./Users/Users.js');
const Location = require('./Location/Location.js');
const Privacy = require('./Privacy/Privacy.js');
const Labels = require('./Labels/Labels.js');
const Contacts = require('./Contacts/Contacts.js');
mongoose.Promises = require('bluebird');


Users.find({first: 'John'})
.then((user) => {
  console.log(user);
})
.catch((err) => {
  console.log('User does not exist');
  Users.create({
    first: 'John',
    last: 'Doe',
    phoneNumber: 8181234567,
    email: 'fake@email.com'
  })
  .then(()=>{
    console.log('New User created');
  })
  .catch(()=>{
    console.log('error in adding test user')
  })
});