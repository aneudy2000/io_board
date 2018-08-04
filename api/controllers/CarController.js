/**
 * CarController
 *
 * @description :: Server-side logic for managing cars
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
  addCar: function (req, res) {
    let car = req.param('car');

    if (car == '') {
      return res.jsonx({name: 'Empty'});
    }

    Car.findOne({ car: car }, function(err, foundCar) {
      if (err) return res.negotiate(err);

      if (foundCar) return res.jsonx({ name: 'Exists' });

      Car.create({ car: car }, function (err, createdCar) {
        if (err) return res.negotiate(err);

        sails.sockets.blast('newcar', {
          id: createdCar.id,
          car: createdCar.car
        });
        return res.jsonx({ name: 'Success' });
      });
    });
  },

  updateCar: function (req, res) {
    let id = req.param('id');
    let car = req.param('car');

    if (car == '') {
      return res.jsonx({ name: 'Empty' });
    }

    Car.findOne({ car: car }, function (err, foundCar) {

      if (foundCar && foundCar.id != id) return res.jsonx({ name: 'Exists' });

      Car.update({ id: id }, { car: car }).exec(function (err, updatedCar) {
        if (err) return res.negotiate(err);
        sails.sockets.blast('updatecar', {
          id: updatedCar[0].id,
          car: updatedCar[0].car
        });
        return res.jsonx({ name: 'Success' });
      });
    });
  },

  removeCar: function (req, res) {
    let id = req.param('id');
    Car.destroy({ id: id }).exec(function(err) {
      if (err) return res.negotiate(err);

      sails.sockets.blast('deletecar', {
        id: id
      });
      return res.jsonx({ name: 'Success' });
    });
  }
};

