/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Emailaddresses = require('machinepack-emailaddresses');
var Passwords = require('machinepack-passwords');
var Strings = require('machinepack-strings');
var Mailgun = require('machinepack-mailgun');

module.exports = {

  login: function(req, res) {
    User.findOne({
        email: req.param('email')
    }, function foundUser(err, foundUser) {
      if (err) return res.negotiate(err);
      
      if (!foundUser) {
        return res.view('signin', {
          title: 'Login Failure',
          message: 'Could not log you in. Please check your email and password and try again.'
        });
      }

      Passwords.checkPassword({
        passwordAttempt: req.param('password'),
        encryptedPassword: foundUser.encryptedPassword
      }).exec({

        error: function(err) {
          return res.negotiate(err);
        },

        incorrect: function() {
          return res.view('signin', {
            title: 'Login Failure',
            message: 'Could not log you in. Please check your email and password and try again.'
          });
        },

        success: function() {

          if (foundUser.disabled) {
            return res.view('signin', {
              title: 'Login Failure',
              message: 'Your account has been disabled. Contact your system administrator.'
            });
          }

          req.session.userId = foundUser.id;
          req.session.me = {
            username: foundUser.username,
            admin: foundUser.admin
          };
          return res.redirect('/');
        }
      });
    });
  },

  logout: function(req, res) {

    User.findOne(req.session.userId, function foundUser(err, user) {
      if (err) return res.negotiate(err);
      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists.');
        return res.redirect('/');
      }

      // log the user-agent out.
      req.session.userId = null;
      req.session.me = null;

      return res.redirect('/signin');
    });
  },

  addUser: function(req, res) {

    if (_.isUndefined(req.param('email'))) {
      return res.badRequest('An email address is required!');
    }

    if (_.isUndefined(req.param('password'))) {
      return res.badRequest('A password is required!');
    }

    if (req.param('password').length < 6) {
      return res.badRequest('Password must be at least 6 characters!');
    }

    if (_.isUndefined(req.param('username'))) {
      return res.badRequest('A username is required!');
    }

    // Username must contain only numbers letters, spaces and dashes.
    if (!_.isString(req.param('username')) || req.param('username').match(/[a-z0-9]+[\ \-]+[a-z0-9]/g)) {
      return res.view('adduser', {
        title: 'error',
        message: 'Invalid username: must consist of numbers and letters only.'
      });
    }

    Emailaddresses.validate({
      string: req.param('email'),
    }).exec({
      // An unexpected error occurred.
      error: function(err) {
        return res.serverError(err);
      },
      // The provided string is not an email address.
      invalid: function() {
        return res.view('adduser', {
          title: 'error',
          message: "That's not a valid email adress."
        });
      },
      // OK.
      success: function() {
        Passwords.encryptPassword({
          password: req.param('password'),
        }).exec({

          error: function(err) {
            return res.serverError(err);
          },

          success: function(result) {

            var options = {};

            options.email = req.param('email');
            options.username = req.param('username');
            options.encryptedPassword = result;
            options.disabled = false;
            options.admin = false;
            options.is_in = false;
            options.description = "";
            options.time = "";
            options.car = "";

            User.create(options).exec(function(err, createdUser) {
              if (err) {
                console.log('Error creating a user. The error is: ', err.invalidAttributes);

                // Check for duplicate email address
                if (err.invalidAttributes && err.invalidAttributes.email && err.invalidAttributes.email[0] && err.invalidAttributes.email[0].rule === 'unique') {

                  // return res.send(409, 'Email address is already taken by another user, please try again.');
                  return res.view('adduser', {
                    title: 'Error',
                    message: 'A user with that email already exists.'
                  });
                }

                // Check for duplicate username
                if (err.invalidAttributes && err.invalidAttributes.username && err.invalidAttributes.username[0] && err.invalidAttributes.username[0].rule === 'unique') {

                  // return res.send(409, 'Username is already taken by another user, please try again.');
                  return res.view('adduser', {
                    title: 'Error',
                    message: 'A user with that name already exists.'
                  });
                }

                return res.negotiate(err);
              }
              
              sails.sockets.blast('newuser', {
                    id: createdUser.id,
                    username: createdUser.username,
                    description: createdUser.description,
                    time: createdUser.time,
                    car: createdUser.car
              }, req);
              return res.view('adduser', {
                title: 'Success',
                message: createdUser.username +  " was added."
              });
            });
          }
        });
      }
    });
  },

  updateUser: function(req, res) {
    let id = req.param('id');
    let username = req.param('username');
    let email = req.param('email');
    
    if (_.isUndefined(email)) {
      return res.badRequest('An email address is required!');
    }

    if (_.isUndefined(username) || username == "") {
      return res.badRequest('A username is required!');
    }

    if (!_.isString(username) || username.match(/[a-z0-9]+[\ \-]+[a-z0-9]/)) {
      return res.badRequest('Invalid username: must consist of numbers and letters only.');
    }

    Emailaddresses.validate({
      string: email,
    }).exec({
      // An unexpected error occurred.
      error: function(err) {
        return res.serverError(err);
      },
      // The provided string is not an email address.
      invalid: function() {
        return res.badRequest('Doesn\'t look like an email address to me!');
      },
      // OK.
      success: function() {
        User.update({id: id}, { 
          username: username,
          email: email
        }).exec(function(err, updatedUser) {
              if (err) {
                console.log('the error is: ', err.invalidAttributes);

                // Check for duplicate email address
                if (err.invalidAttributes && err.invalidAttributes.email && err.invalidAttributes.email[0] && err.invalidAttributes.email[0].rule === 'unique') {
                  return res.badRequest('Email address is already taken by another user, please try again.');
                }

                // Check for duplicate username
                if (err.invalidAttributes && err.invalidAttributes.username && err.invalidAttributes.username[0] && err.invalidAttributes.username[0].rule === 'unique') {
                  return res.badRequest('Username is already taken by another user, please try again.');
                }

                return res.negotiate(err);
              }

              sails.sockets.blast('updateuser', {
                id: id,
                username: username,
                email: email
              }, req);

              return res.jsonx(username + " was successfully updated.");
            });
      }
    });
  },

  deleteUser: function(req, res) {
    User.destroy({ id: req.param('id') }).exec(function(err) {
    
      if (err) return res.negotiate(err);

      sails.sockets.blast('deleteuser', {
        id: req.param('id')
      }, req);
      
      return res.ok();
    });
  },

  generateRecoveryEmail: function(req, res) {
    // secondary check for email parameter
    if (_.isUndefined(req.param('email'))) {
      return res.badRequest('An email address is required!');
    }
    
    // Find user by the incoming `email` parameter
    User.findOne({
      email: req.param('email')
    }).exec(function foundUser(err, user) {

      if (err) return res.negotiate(err);

      if (!user) return res.send('The email ' + req.param('email') + ' was not found. Please check that you entered the correct email or contact Jose.');

      // Generate random alphanumeric string for the passwordRecoveryToken
      try {

        var randomString = Strings.random({}).execSync();

      } catch (err) {
        return res.serverError(err);
      }

      // Update user's paswordRecoveryToken attribute with the newly created alphanumeric string
      User.update({
        id: user.id
      }, {
        passwordRecoveryToken: randomString
      }).exec(function updateUser(err, updatedUser) {
        if (err) return res.negotiate(err);

        // email user with a URL which includes the password recovery token as a parameter

        // The Url that inclues the password recovery token as a parameter
        var recoverUrl = sails.config.mailgun.baseUrl + '/password-reset-form/' + updatedUser[0].passwordRecoveryToken;

        var messageTemplate = 'Forgot your password? Don\'t worry! \n' +
                   '\n' +
                   'You can use the following link to reset it: \n' +
                   recoverUrl + '\n' +
                   '\n' +
                   'Thanks, Jose';

        // Send a simple plaintext email.
        Mailgun.sendPlaintextEmail({
          apiKey: sails.config.mailgun.apiKey,
          domain: sails.config.mailgun.domain,
          toEmail: updatedUser[0].email,
          subject: 'Please reset your io_board password',
          message: messageTemplate,
          fromEmail: 'it@mg.circleofcarecmo.org',
          fromName: 'Jose Rosario',
        }).exec({
          // An unexpected error occurred.
          error: function(err) {
            return res.negotiate(err);

          },
          // OK.
          success:  function() {
            return res.view('./password-recovery/password-recovery-email-sent', {email: updatedUser[0].email});
          },
        });
      });
    });
  },

  resetPassword: function(req, res) {
    // check for token parameter
    if (!_.isString(req.param('passwordRecoveryToken'))) {
      return res.badRequest('A password recovery token is required!');
    }

    // secondary check for password parameter
    if (!_.isString(req.param('password'))) {
      return res.badRequest('A password is required!');
    }

    // Fallback to client-side length check validation
    if (req.param('password').length < 6) {
      return res.badRequest('Password must be at least 6 characters!');
    }

    // Try to find user with passwordRecoveryToken
    User.findOne({
      passwordRecoveryToken: req.param('passwordRecoveryToken')
    }).exec(function foundUser(err, user){
      if (err) return res.negotiate(err);

      // If this token doesn't correspond with a real user record, it is invalid.
      // We send a 404 response so that our front-end code can show an
      // appropriate error message.
      if (!user) {
        return res.send('The reset link you clicked doesn\'t seem to have been the lastest. Please check your email again. Also check your email junk folder.');
      }

      // Encrypt new password
      Passwords.encryptPassword({
        password: req.param('password'),
      }).exec({
        error: function(err) {
          return res.serverError(err);
        },
        success: function(encryptedPassword) {

          User.update(user.id, {
            encryptedPassword: encryptedPassword,
            passwordRecoveryToken: null
          }).exec(function (err, updatedUsers) {
            if (err) {
              return res.negotiate(err);
            }

            // Log the user in
            req.session.userId = updatedUsers[0].id;

            // If successful redirect to homepage
            return res.redirect('/');
          });
        }
      });
    });
  },


  changePassword: function(req, res) {

    // Fallback to client-side required validation
    if (_.isUndefined(req.param('password'))) {
      return res.badRequest('A password is required!');
    }

    // Fallback to client-side length check validation
    if (req.param('password').length < 6) {
      return res.badRequest('Password must be at least 6 characters!');
    }

    Passwords.encryptPassword({
      password: req.param('password'),
    }).exec({
      error: function(err) {
        return res.serverError(err);
      },
      success: function(result) {

        User.update({
          id: req.session.userId
        }, {
          encryptedPassword: result
        }).exec(function(err, updatedUser) {
          if (err) {
            return res.negotiate(err);
          }
          return res.json({
            username: updatedUser[0].username});
        });
      }
    });
  },

  updateAdmin: function(req, res) {

    User.update(req.param('id'), {
      admin: req.param('admin')
    }).exec(function(err, update) {
      if (err) return res.negotiate(err);
      if (req.param('admin') == 'true') {
        return res.ok(req.param('username') + ' is now an admin.');
      } else {
        return res.ok(req.param('username') + ' is no longer an admin.');
      }
    });
  },

  updateDisabled: function(req, res) {
    let id = req.param('id');
    let username = req.param('username');
    let disabled = req.param('disabled');

    User.update(id, {
      disabled: disabled
    }).exec(function(err, update) {
      if (err) return res.negotiate(err);

      sails.sockets.blast('disableuser', {
        id: id,
        username: username,
        disabled: disabled
      });

      if (disabled == 'true') {
        return res.ok(username + ' is now disabled.');
      } else {
        return res.ok(username + ' is no longer disabled.');
      }
    });
  },
};