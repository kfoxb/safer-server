const Labels = require('../../db/Labels/Labels.js');
const { checkSubscriptions } = require('../Notifications/Notifications.js');

var distanceBetweenCoordinates = function(lat1, lon1, lat2, lon2) {
  
  var degreesToRadians = function(degrees) {
    return degrees * Math.PI / 180;
  };

  var earthRadiusKm = 6371;

  var dLat = degreesToRadians(lat2 - lat1);
  var dLon = degreesToRadians(lon2 - lon1);

  lat1 = degreesToRadians(lat1);
  lat2 = degreesToRadians(lat2);

  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2); 

  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
  return earthRadiusKm * c;
};

exports.addLabel = (req, res) => {
  Labels.create({
    userId: req.user.id,
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
};

exports.getAllFences = (req, res) => {
  Labels.findAll({
    where: { userId: req.user.id }
  })
  .then((fences) => {
    res.status(200).json(fences);
  })
  .catch((err) => {
    console.log('There was an error getting all fences: ', err);
    res.status(500).send();
  });
};

exports.updateUserLabel = (req, res, next) => {
  Labels.findAll({
    where: {
      userId: req.user.id
    }
  })
  .then((fences) => {
    for (let fence of fences) {
      let proximity = distanceBetweenCoordinates(req.body.lat, req.body.long, fence.lat, fence.lng);
      const radius = 0.5;
      if (proximity < radius) {
        var oldLabel = req.user.currentLabel;
        req.body.currentLabel = fence.label;
        checkSubscriptions(req.user.id, oldLabel, fence.label);
        next();
      }
    }
    req.body.currentLabel = 'Elsewhere';
    next();
  })
  .catch((error) => {
    res.status(500).json({error: error});
  });
};