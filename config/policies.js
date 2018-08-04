module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions (`true` allows public     *
  * access)                                                                  *
  *                                                                          *
  ***************************************************************************/

  // '*': true,

  /***************************************************************************
  *                                                                          *
  * Here's an example of mapping some policies to run before a controller    *
  * and its actions                                                          *
  *                                                                          *
  ***************************************************************************/
	// RabbitController: {

		// Apply the `false` policy as the default for all of RabbitController's actions
		// (`false` prevents all access, which ensures that nothing bad happens to our rabbits)
		// '*': false,

		// For the action `nurture`, apply the 'isRabbitMother' policy
		// (this overrides `false` above)
		// nurture	: 'isRabbitMother',

		// Apply the `isNiceToAnimals` AND `hasRabbitFood` policies
		// before letting any users feed our rabbits
		// feed : ['isNiceToAnimals', 'hasRabbitFood']
  // }
  

  PageController: {
    home: ['isLoggedIn', 'nocache'],
    logout: ['isLoggedIn'],
    signin: ['isLoggedOut'],
    addUser: ['isLoggedIn'],
    passwordRecoveryEmail: ['isLoggedOut'],
    passwordRecoveryEmailSent: ['isLoggedOut'],
    passwordReset: ['isLoggedOut'],
    adminUsers: ['isLoggedIn', 'isAdmin'],
    adminCars: ['isLoggedIn', 'isAdmin']
  },

  BoardController: {
    board: ['isLoggedIn', 'isAdmin', 'nocache']
  },

  UserController: {
    login: ['isLoggedOut'],
    logout: ['isLoggedIn'],
    addUser: ['isLoggedIn', 'isAdmin'],
    updateUser: ['isLoggedIn', 'isAdmin'],
    updateAdmin: ['isLoggedIn', 'isAdmin'],
    updateDisabled: ['isLoggedIn', 'isAdmin'],
    deleteUser: ['isLoggedIn', 'isAdmin'],
    generateRecoveryEmail: ['isLoggedOut'],
    resetPassword: ['isLoggedOut'],
    changePassword: ['isLoggedIn'],
  },

  CarController: {
    addCar: ['isLoggedIn', 'isAdmin'],
    updateCar: ['isLoggedIn', 'isAdmin'],
    removeCar: ['isLoggedIn', 'isAdmin']
  },

  HistoryController: {
    show: ['isLoggedIn', 'isAdmin'],
    store: ['isLoggedIn', 'isAdmin'],
    destroy: ['isLoggedIn', 'isAdmin'],
    destroyAll: ['isLoggedIn', 'isAdmin']
  },

  CurrentStatusController: {
    updateStatus: ['isLoggedIn'],
    updateDescription: ['isLoggedIn'],
    updateTime: ['isLoggedIn'],
    updateCar: ['isLoggedIn']
  }
};
