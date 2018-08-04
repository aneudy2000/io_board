/**
 * HistoryController
 *
 * @description :: Server-side logic for managing Histories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	

  /**
   * `HistoryController.show()`
   */
  show: function (req, res) {
    History.find({
      user_id: req.param('user_id')
    }).exec(function(err, records) {
      if (err) return res.negotiate(err);
      if (records.length === 0) {
        return res.json({
          records: false
        });
      }
      return res.json({
        records: records
      });
    });
  },


  /**
   * `HistoryController.store()`
   */
  store: function (req, res) {

    History.create({
      user_id: req.param('user_id'),
      name: req.param('name'),
      description: req.param('description'),
      time: req.param('time'),
      car: req.param('car')
    }).exec(function(err, createdHistory) {
      if (err) return res.badRequest('Could not save history.');
    });

    return res.ok();
  },


  /**
   * `HistoryController.destroy()`
   */
  destroy: function (req, res) {
    return res.json({
      todo: 'destroy() is not implemented yet!'
    });
  },

  
  destroyAll: function (req, res) {
    return res.json({
      todo: 'destroyAll() is not implemented yet!'
    });
  }
};

