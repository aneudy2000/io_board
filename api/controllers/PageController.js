/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  home: function(req, res) {

    if (!req.session.userId) {
      return res.view('signin', {
        me: null
      });
    }

    User.findOne(req.session.userId, function(err, user) {
      if (err) {
        return res.negotiate(err);
      }

      if (!user) { // TODO send back a mesage to the user
        sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
        return res.view('signin', {
          me: null
        });
      }

      User.find({ disabled: false}).exec(function(err, users) {

        var updatedUsers = _.map(users, function(user){
            user = {
            id: user.id,
            username: user.username,
            is_in: user.is_in,
            description: user.description,
            time: user.time,
            car: user.car
            };

            return user;
        });

        Car.find().exec(function (err, cars) {

          if (err) return res.negotiate(err);

          return res.view('home', {
          me: {
              id: user.id,
              username: user.username,
              admin: user.admin,
              email: user.email,
              is_in: user.is_in,
              description: user.description,
              time: user.time,
              car: user.car
          },
              currentstatus: updatedUsers,
              cars: cars
          });
        });
      });
    });
  },

  logout: function(req, res) {

    if (!req.session.userId) {
      return res.redirect('/');
    }

    User.findOne(req.session.userId, function(err, user) {
      if (err) {
        console.log('error: ', err);
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
        return res.view('homepage');
      }

      return res.view('signout', {
        me: {
          username: user.username,
          admin: user.admin
        }
      });
    });
  },

  signin: function(req, res) {

    return res.view('signin', {
      me: null
    });
  },

  boardSignin: function(req, res) {
    return res.view('board-signin', {
      me: null
    });
  },

  addUser: function(req, res) {
    return res.view('adduser', {
      me: null
    });
  },

  adminUsers: function (req, res) {
    User.find({
      sort: 'username ASC'
    }).exec(function (err, users) {

      if (err) return res.negotiate(err);

      if (users.length === 0) return res.notFound();

      var foundUsers = _.map(users, function (user) {

        user = {
          id: user.id,
          username: user.username,
          email: user.email,
          admin: user.admin,
          disabled: user.disabled,
        };

        return user;
      });

      return res.view('admin-users', {
        users: foundUsers
      });      
    });
  },

  adminCars: function (req, res) {
    Car.find({sort: 'car ASC'}).exec(function (err, cars) {

      if (err) return res.negotiate(err);
      if (!cars) return res.notFound();

      return res.view('admin-cars', {
        cars: cars
      });
    });
  },

  // #1
  passwordRecoveryEmail: function(req, res) {

    return res.view('./password-recovery/password-recovery-email', {
      me: null
    });
  },

  // #2
  passwordRecoveryEmailSent: function(req, res) {

    return res.view('./password-recovery/password-recovery-email-sent', {
      me: null
    });
  },

  // #3
  passwordReset: function(req, res) {

    // Get the passwordRecoveryToken and render the view
    res.view('./password-recovery/password-reset', {
      me: null,
      passwordRecoveryToken: req.param('passwordRecoveryToken')
    });
  },

  history: function(req, res) {

    User.find().sort('username ASC').exec(function afterFind(err, users) {

      if (err) return res.notFound();
      
      res.view('history', {
        users: users,
        history: null
      });
    });
  },

  settings: function(req, res) {
    Settings.find().exec(function afterFind(err, settings) {

      if (err) return res.notFound();
      res.view('settings', {
        settings: settings
      });
    });
  }
};