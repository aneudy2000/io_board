/**
 * SettingsController
 *
 * @description :: Server-side logic for managing settings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    updateBoardBackground: function(req, res) {

        Settings.update({
            boardBackgroundImage: req.param('boardBackground')
            }).exec(function(err, updatedBoardBackground) {
                if (err) return res.negotiate(err);
                if (!updatedBoardBackground) return res.notFound();

                sails.sockets.blast('boardBackground', {
                    boardBackgroundImage: req.param('boardBackground')
                }, req);

                return res.ok();                
            });
    },

    updateBoardPrimaryColor: function(req, res) {
        Settings.update({
            boardPrimaryColor: req.param('boardPrimaryColor')
        }).exec(function(err, updatedBoardPrimarycolor) {
            if (err) return res.negotiate(err);
            if (!updatedBoardPrimarycolor) return res.notFound();

            sails.sockets.blast('primaryColor', {
                updatedBoardBackground: req.param('boardPrimaryColor')
            }, req);

            return res.ok();
        });
    },

    // update: function(req, res) {
    //     Settings.update({
    //         boardBackgroundImage: req.param('')
    //     })
    // }
	
};

