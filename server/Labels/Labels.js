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
      res.status(201).json({});
      console.log('everything ok')
    })
    .catch((error) => {
      console.log('errored out', error)
      res.status(418).json(`I'm a teapot`);
    })
  })
}