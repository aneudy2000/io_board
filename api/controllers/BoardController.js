/**
 * BoardController
 *
 * @description :: Server-side logic for managing boards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
    board: function(req, res) {

        var style = {
            header: {
                background: '#22745',
                color: "#fff"
            }

        };

        User.find({ disabled: false}).sort('username ASC').exec(function afterFind(err, currentstatus) {

            if (err) return res.notFound();

            Car.find().exec(function (err, cars) {

                if (err) res.negotiate(err);

                res.locals.layout =  'boardlayout';

                return res.view('board', {
                    style: style,
                    currentstatus: currentstatus,
                    cars: cars
                });
            });  
        });  
    }
};

