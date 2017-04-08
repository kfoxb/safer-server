const db = require('./config.js');
const Users = require('./Users/Users.js');
const Location = require('./Location/Location.js');
const Privacy = require('./PersonalPrivacy/PersonalPrivacy.js');
const Labels = require('./Labels/Labels.js');
const Contacts = require('./Contacts/Contacts.js');
const Sequelize = require('sequelize');
const Promises = require('bluebird');
mongoose.Promises = Promises;


Users.findOrCreate();


Users.find({first: 'John'})
.then((user) => {
  if (user[0] !== undefined) { console.log('INSERT\n', user); }
  else {
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
      console.log('error in adding test user');
    });  
  }
})
.catch((err) => {
  console.log('User does not exist');
});


Users.find({first:'Friend'})
.then((user) => {
  if(user[0] !== undefined){console.log('INSERT\n', user);}
  else{
    Users.create({
      first: 'Friend',
      last: 'One',
      phoneNumber: 8187654321,
      email: 'fake@email.com'
    })
    .then(()=>{
      console.log('New User created');
    })
    .catch(()=>{
      console.log('error in adding test user')
    })  
  }
})
.catch((err) => {
  console.log('User does not exist');
});

Location.find({userId: '58e6f5db24a1bf204f246deb'})
.then((loc) => {
  if(loc[0] !== undefined){console.log('INSERT\n', loc);}
  else{
    Location.create({
      userId: '58e6f5db24a1bf204f246deb',
      coordinates: {
        lat: 123,
        long: 123
      }
    })
    .then(()=>{
      console.log('New loc created');
    })
    .catch(()=>{
      console.log('error in adding test loc')
    })  
  }
})
.catch((err) => {
  console.log('Loc does not exist');
});

Privacy.find({userId: '58e6f5db24a1bf204f246deb'})
.then((Priv) => {
  if(Priv[0] !== undefined){console.log('INSERT\n', Priv);}
  else{
    Privacy.create({
      userId: '58e6f5db24a1bf204f246deb',
      incognito: true,
      defaultPrivacy: 'label' 
    })
    .then(()=>{
      console.log('New privcy created');
    })
    .catch(()=>{
      console.log('error in adding test privacy')
    })  
  }
})
.catch((err) => {
  console.log('Privacy does not exist', err);
});

Labels.find({userId: '58e6f5db24a1bf204f246deb'})
.then((label) => {
  if(label[0] !== undefined){console.log('INSERT\n', label);}
  else{
    Labels.create({
      userId: '58e6f5db24a1bf204f246deb',
      label: 'Home',
      coordinates: {
        lat: 123,
        long: 123
      }
    })
    .then(()=>{
      console.log('New label created');
    })
    .catch(()=>{
      console.log('error in adding test label')
    })  
  }
})
.catch((err) => {
  console.log('Label does not exist', err);
});

Contacts.find({userId: '58e6f5db24a1bf204f246deb'})
.then((contact) => {
  if(contact[0] !== undefined){console.log('INSERT\n', contact);}
  else{
    Contacts.create({
      userId: '58e6f5db24a1bf204f246deb',
      friend: '58e6fd8899ea86242964832e',
      privacy: 'location'    })
    .then(()=>{
      console.log('New contact created');
    })
    .catch(()=>{
      console.log('error in adding test contact')
    })  
  }
})
.catch((err) => {
  console.log('contact does not exist', err);
});
