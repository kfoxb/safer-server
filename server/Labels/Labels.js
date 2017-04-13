const Users = require('../../db/Users/Users.js');
const Contacts = require('../../db/Contacts/Contacts.js');
const Labels = require('../../db/Labels/Labels.js');
<<<<<<< HEAD
=======
const Location = require('../../db/Location/Location.js');
>>>>>>> Storing fences on the database correctly
const phone = require('phone');

exports.addLabel = (req, res) => {
  Users.findOne({
    where: {
      phoneNumber: req.body.user
    }
  })
  .then((user) => {
<<<<<<< HEAD
    console.log('user when creating a Label/fence', user);
    Labels.create({
      userId: user.dataValues.id,
      label: req.body.label,
      latTlc: req.body.polygon[0].lat,
      lngTlc: req.body.polygon[0].lng,
      latTrc: req.body.polygon[1].lat,
      lngTrc: req.body.polygon[1].lng,
      latBrc: req.body.polygon[2].lat,
      lngBrc: req.body.polygon[2].lng,
      latBlc: req.body.polygon[3].lat,
      lngBlc: req.body.polygon[3].lng,
      latInit: req.body.polygon[4].lat,
      lngInit: req.body.polygon[4].lng
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
      phoneNumber: req.param('id')
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

//Need to get the user's phone number from the params of the url
//there's no body on a get request
=======
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
      res.status(201).json({});
      console.log('everything ok')
    })
    .catch((error) => {
      console.log('errored out', error)
      res.status(418).json(`I'm a teapot`);
    })
  })
}
>>>>>>> Storing fences on the database correctly
