/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

  /*************************************************************
  * JSON API ENDPOINTS                                         *
  *************************************************************/
  'POST /login': 'UserController.login',
  'POST /logout': 'UserController.logout',
  'POST /user/adduser': 'UserController.addUser',
  'PUT /user/change-password': 'UserController.changePassword',
  'PUT /user/update/:id': 'UserController.updateUser',
  'PUT /user/update-admin/:id': 'UserController.updateAdmin',
  'PUT /user/update-disabled/:id': 'UserController.updateDisabled',
  'POST /user/generate-recovery-email': 'UserController.generateRecoveryEmail', // TODO: change to put and update form too
  'POST /user/reset-password': 'UserController.resetPassword', // TODO: change to put and update form too
  'DELETE /user/delete/:id': 'UserController.deleteUser',

  'PUT /currentstatus/name/:id': 'CurrentStatusController.updateStatus',
  'PUT /currentstatus/description/:id': 'CurrentStatusController.updateDescription',
  'PUT /currentstatus/time/:id': 'CurrentStatusController.updateTime',
  'PUT /currentstatus/car/:id': 'CurrentStatusController.updateCar',

  'POST /car/create': 'CarController.addCar',
  'PUT /car/update/:id': 'CarController.updateCar',
  'DELETE /car/delete/:id': 'CarController.removeCar',

  'GET /history/:user_id': 'HistoryController.show',
  'POST /history': 'HistoryController.store',
  'DELETE /history/:user_id': 'HistoryController.destroy',
  'DELETE /history': 'HistoryController.destroyAll',

  'POST /settings/update': 'SettingsController.update',

  /*************************************************************

  * Server Rendered HTML Page Endpoints                        *
  *************************************************************/
  'GET /signin': 'PageController.signin',
  'GET /adduser': 'PageController.adduser',
  'GET /': 'PageController.home',
  'GET /board-signin': 'PageController.boardSignin',
  'GET /board': 'BoardController.board',
  'GET /logout': 'PageController.logout',
  'GET /user/admin-users': 'PageController.adminUsers',
  'GET /car/admin-cars': 'PageController.adminCars',
  'GET /password-recovery-email': 'PageController.passwordRecoveryEmail',
  'GET /password-recovery-email-sent': 'PageController.passwordRecoveryEmailSent',  
  'GET /password-reset-form/:passwordRecoveryToken': 'PageController.passwordReset',
  'GET /history': 'PageController.history',
  'GET /settings': 'PageController.settings'

}