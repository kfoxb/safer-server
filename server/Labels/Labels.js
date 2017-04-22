const Users = require('../../db/Users/Users.js');
const Contacts = require('../../db/Contacts/Contacts.js');
const Labels = require('../../db/Labels/Labels.js');
const phone = require('phone');

exports.addLabel = (req, res) => {
  Users.findOne({
    where: {
      phoneNumber: req.user.phoneNumber
    }
  })
  .then((user) => {
    user = user.get();
    console.log('USER IN ADDLABEL: ', user);
    Labels.create({
      userId: user.dataValues.id,
      label: req.body.label,
      address: req.body.address,
      lat: req.body.coordinates.lat,
      lng: req.body.coordinates.lng
    })
    .then((fence) => {
      res.status(201).json(`${req.body.label} created succesfully!`);
    })
    .catch((error) => {
      console.log('errored out', error);
      res.status(418).json('I\'m a teapot');
    });
  });
};

exports.getAllFences = (req, res) => {
  Users.findOne({
    where: {
      phoneNumber: req.user.phoneNumber
    }
  })
  .then((user) => {
    Labels.findAll({
      where: {
        UserId: user.dataValues.id
      }
    })
      .then((fences) => {
        res.status(200).json(fences);
      })
      .catch((error) => {
        res.status(404).json({error: error});
      });
  });
};