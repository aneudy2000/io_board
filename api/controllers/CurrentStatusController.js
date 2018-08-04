/**
 * CurrentStatusController
 *
 * @description :: Server-side logic for managing Currentstatuses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
    updateStatus: function(req, res) {

        User.update({id: req.param('id')}, {
            is_in: req.param('is_in')
        }).exec(function(err, updatedStatus) {
            if (err) return res.negotiate(err);
            if (!updatedStatus) return res.notFound();

            User.findOne({
                id: req.param('id')
            }).exec(function(err, foundStatus) {
                if (err) return res.negotiate(err);
                if (!foundStatus) return res.notFound();
                
                sails.sockets.blast('is_in', {
                    id: foundStatus.id,
                    is_in: foundStatus.is_in
                }, req);
                return res.ok();
            });
        });
    },

    updateDescription: function(req, res) {

         User.update({id: req.param('id')}, {
            description: req.param('description')
        }).exec(function(err, updatedStatus) {
            if (err) return res.negotiate(err);
            if (!updatedStatus) return res.notFound();

            User.findOne({
                id: req.param('id')
            }).exec(function(err, foundStatus) {
                if (err) return res.negotiate(err);
                if (!foundStatus) return res.notFound();
                
                sails.sockets.blast('description', {
                    id: foundStatus.id,
                    description: foundStatus.description
                }, req);
                return res.ok();
            });
        });
    },

    updateTime: function(req, res) {
        
         User.update({id: req.param('id')}, {
            time: req.param('time')
        }).exec(function(err, updatedStatus) {
            if (err) return res.negotiate(err);
            if (!updatedStatus) return res.notFound();

            User.findOne({
                id: req.param('id')
            }).exec(function(err, foundStatus) {
                if (err) return res.negotiate(err);
                if (!foundStatus) return res.notFound();
                
                sails.sockets.blast('time', {
                    id: foundStatus.id,
                    time: foundStatus.time
                }, req);
                return res.ok();
            });
        });
    },

    updateCar: function(req, res) {
        
        User.update({id: req.param('id')}, {
            car: req.param('car')
        }).exec(function(err, updatedStatus) {
            if (err) return res.negotiate(err);
            if (!updatedStatus) return res.notFound();

            User.findOne({
                id: req.param('id')
            }).exec(function(err, foundStatus) {
                if (err) return res.negotiate(err);
                if (!foundStatus) return res.notFound();
                
                sails.sockets.blast('car', {
                    id: foundStatus.id,
                    car: foundStatus.car
                }, req);
                return res.ok();
            });
        });
    },
};

