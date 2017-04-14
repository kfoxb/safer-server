const Users = require('../../db/Users/Users.js');
const Contacts = require('../../db/Contacts/Contacts.js');
const Labels = require('../../db/Labels/Labels.js');
const Location = require('../../db/Location/Location.js');
const phone = require('phone');

exports.addLabel = (req, res) => {
  Users.findOne({
    where: {
      phoneNumber: req.body.user
    }
  })
  .then((user) => {
	Labels.create({
    UserId: user.dataValues.id,
    label: req.body.label,
    lat_tlc: req.body.polygon[0].lat,
    lng_tlc: req.body.polygon[0].lng,
    lat_trc: req.body.polygon[1].lat,
    lng_trc: req.body.polygon[1].lng,
    lat_brc: req.body.polygon[2].lat,
    lng_brc: req.body.polygon[2].lng,
    lat_lbc: req.body.polygon[3].lat,
    lng_lbc: req.body.polygon[3].lng,
    lat_init: req.body.polygon[4].lat,
    lng_init: req.body.polygon[4].lat
  })
    .then((fence) => {
      res.status(201).json(`${req.body.label} created succesfully!`);
    })
    .catch((error) => {
      console.log('errored out', error)
      res.status(418).json(`I'm a teapot`);
    })
  })
}

exports.getAllFences = (req, res) => {
  console.log('Inside the get route and in the getAllFences model')
  console.log('------- PARAMS ******', req.params)
  Users.findOne({
    where: {
      phoneNumber: req.param('id')
    }
  })
  .then((user) => {
    console.log(user)
    Labels.findAll({
      where: {
        UserId: user.dataValues.id
      }
    })
      .then((fences) => {
        console.log('These are the fences',fences)
        res.status(200).json(fences);
      })
      .catch((error) => {
        console.log('errored out from retrieving fences', error)
        res.status(404).json('ERROR!')
      })
  })
}

//Need to get the user's phone number from the params of the url
//there's no body on a get request