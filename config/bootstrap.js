/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)

  User.count().exec(function(err, numberOfUsers) {
    
    if (err) return cb(err);

    if (numberOfUsers > 0) {
      console.log('Number of users found: ', numberOfUsers);
    } else {

      var users = [

        {
          "email": "clarkkent@ioboard.org",
          "username": "Clark",
          "deleted": false,
          "admin": true,
          "supervisor": false,
          "leadershipt": false,
          "is_in": false,
          "description": "",
          "encryptedPassword": "$2a$10$AB5orQcrZ55RQgm90xpwlOGCcx9fpzxQsc/JInV8SMLu9ewZECwKK",
          "time": "",
          "car": ""
        },
        {
          "email": "jario@ioboard.org",
          "username": "JoseR",
          "deleted": false,
          "admin": true,
          "supervisor": false,
          "leadershipt": false,
          "is_in": false,
          "description": "",
          "encryptedPassword": "$2a$10$AB5orQcrZ55RQgm90xpwlOGCcx9fpzxQsc/JInV8SMLu9ewZECwKK",
          "time": "",
          "car": ""
        },
        {
          "email": "tclos@ioboard.org",
          "username": "Tairine",
          "deleted": false,
          "admin": true,
          "supervisor": false,
          "leadership": false,
          "is_in": false,
          "description": "",
          "encryptedPassword": "$2a$10$AB5orQcrZ55RQgm90xpwlOGCcx9fpzxQsc/JInV8SMLu9ewZECwKK",
          "time": "",
          "car": ""
        },
        {
          "email": "mshan@ioboard.org",
          "username": "Mandy",
          "deleted": false,
          "admin": false,
          "supervisor": false,
          "leadership": false,
          "is_in": false,
          "description": "",
          "encryptedPassword": "$2a$10$AB5orQcrZ55RQgm90xpwlOGCcx9fpzxQsc/JInV8SMLu9ewZECwKK",
          "time": "",
          "car": ""
        },
        {
          "email": "lfer@ioboard.org",
          "username": "Larry",
          "deleted": false,
          "admin": false,
          "supervisor": false,
          "leadership": false,
          "is_in": false,
          "description": "",
          "encryptedPassword": "$2a$10$AB5orQcrZ55RQgm90xpwlOGCcx9fpzxQsc/JInV8SMLu9ewZECwKK",
          "time": "",
          "car": ""
        },
        {
          "email": "iger@ioboard.org",
          "username": "Irv",
          "deleted": false,
          "admin": false,
          "supervisor": false,
          "leadership": false,
          "is_in": false,
          "description": "",
          "encryptedPassword": "$2a$10$AB5orQcrZ55RQgm90xpwlOGCcx9fpzxQsc/JInV8SMLu9ewZECwKK",
          "time": "",
          "car": ""
        },
        {
          "email": "asomo@ioboard.org",
          "username": "AshleyS",
          "deleted": false,
          "admin": false,
          "supervisor": false,
          "leadership": false,
          "is_in": false,
          "description": "",
          "encryptedPassword": "$2a$10$AB5orQcrZ55RQgm90xpwlOGCcx9fpzxQsc/JInV8SMLu9ewZECwKK",
          "time": "",
          "car": ""
        },
        {
          "email": "mcdonalds@ioboard.org",
          "username": "Jane",
          "deleted": false,
          "admin": false,
          "supervisor": false,
          "leadership": false,
          "is_in": true,
          "description": "",
          "encryptedPassword": "$2a$10$AB5orQcrZ55RQgm90xpwlOGCcx9fpzxQsc/JInV8SMLu9ewZECwKK",
          "time": "",
          "car": ""
        },
        {
          "email": "bull@ioboard.org",
          "username": "Regina",
          "deleted": false,
          "admin": false,
          "supervisor": false,
          "leadership": false,
          "is_in": true,
          "description": "",
          "encryptedPassword": "$2a$10$AB5orQcrZ55RQgm90xpwlOGCcx9fpzxQsc/JInV8SMLu9ewZECwKK",
          "time": "",
          "car": ""
        },
        {
          "email": "seller@ioboard.org",
          "username": "Cynthia",
          "deleted": false,
          "admin": false,
          "supervisor": false,
          "leadership": false,
          "is_in": false,
          "description": "",
          "encryptedPassword": "$2a$10$AB5orQcrZ55RQgm90xpwlOGCcx9fpzxQsc/JInV8SMLu9ewZECwKK",
          "time": "",
          "car": ""
        },
        {
          "email": "can@ioboard.org",
          "username": "Liz",
          "deleted": false,
          "admin": false,
          "supervisor": false,
          "leadership": false,
          "is_in": false,
          "description": "PTO",
          "encryptedPassword": "$2a$10$AB5orQcrZ55RQgm90xpwlOGCcx9fpzxQsc/JInV8SMLu9ewZECwKK",
          "time": "Monday",
          "car": ""
        },
        {
          "email": "jwas@ioboard.org",
          "username": "Jessie",
          "deleted": false,
          "admin": false,
          "supervisor": false,
          "leadership": false,
          "is_in": false,
          "description": "",
          "encryptedPassword": "$2a$10$AB5orQcrZ55RQgm90xpwlOGCcx9fpzxQsc/JInV8SMLu9ewZECwKK",
          "time": "",
          "car": ""
        },
        {
          "email": "mmil@ioboard.org",
          "username": "Megan",
          "deleted": false,
          "admin": false,
          "supervisor": false,
          "leadership": false,
          "is_in": true,
          "description": "",
          "encryptedPassword": "$2a$10$AB5orQcrZ55RQgm90xpwlOGCcx9fpzxQsc/JInV8SMLu9ewZECwKK",
          "time": "",
          "car": ""
        },
        {
          "email": "mpi@ioboard.org",
          "username": "Mary",
          "deleted": false,
          "admin": false,
          "supervisor": false,
          "leadership": false,
          "is_in": true,
          "description": "",
          "encryptedPassword": "$2a$10$AB5orQcrZ55RQgm90xpwlOGCcx9fpzxQsc/JInV8SMLu9ewZECwKK",
          "time": "",
          "car": ""
        },
        {
          "email": "lto@ioboard.org",
          "username": "Luz",
          "deleted": false,
          "admin": false,
          "supervisor": false,
          "leadership": false,
          "is_in": false,
          "description": "",
          "encryptedPassword": "$2a$10$AB5orQcrZ55RQgm90xpwlOGCcx9fpzxQsc/JInV8SMLu9ewZECwKK",
          "time": "",
          "car": ""
        },
        {
          "email": "ezpr@ioboard.org",
          "username": "Emily",
          "deleted": false,
          "admin": false,
          "supervisor": false,
          "leadership": false,
          "is_in": true,
          "description": "",
          "encryptedPassword": "$2a$10$AB5orQcrZ55RQgm90xpwlOGCcx9fpzxQsc/JInV8SMLu9ewZECwKK",
          "time": "",
          "car": ""
        },
        {
          "email": "dres@ioboard.org",
          "username": "Deannie",
          "deleted": false,
          "admin": false,
          "supervisor": false,
          "leadership": false,
          "is_in": false,
          "description": "",
          "encryptedPassword": "$2a$10$AB5orQcrZ55RQgm90xpwlOGCcx9fpzxQsc/JInV8SMLu9ewZECwKK",
          "time": "",
          "car": ""
        },
        {
          "email": "ybre@ioboard.org",
          "username": "Yulie",
          "deleted": false,
          "admin": false,
          "supervisor": false,
          "leadership": false,
          "is_in": true,
          "description": "",
          "encryptedPassword": "$2a$10$AB5orQcrZ55RQgm90xpwlOGCcx9fpzxQsc/JInV8SMLu9ewZECwKK",
          "time": "",
          "car": ""
        },
        {
          "email": "chards@ioboard.org",
          "username": "Julie",
          "deleted": false,
          "admin": false,
          "supervisor": false,
          "leadership": false,
          "is_in": false,
          "description": "",
          "encryptedPassword": "$2a$10$AB5orQcrZ55RQgm90xpwlOGCcx9fpzxQsc/JInV8SMLu9ewZECwKK",
          "time": "",
          "car": ""
        },
        {
          "email": "mler@ioboard.org",
          "username": "MelissaL",
          "deleted": false,
          "admin": false,
          "supervisor": false,
          "leadership": false,
          "is_in": false,
          "description": "",
          "encryptedPassword": "$2a$10$AB5orQcrZ55RQgm90xpwlOGCcx9fpzxQsc/JInV8SMLu9ewZECwKK",
          "time": "",
          "car": ""
        },
        {
          "email": "jadan@ioboard.org",
          "username": "Joselyn",
          "deleted": false,
          "admin": false,
          "supervisor": false,
          "leadership": false,
          "is_in": false,
          "description": "",
          "encryptedPassword": "$2a$10$AB5orQcrZ55RQgm90xpwlOGCcx9fpzxQsc/JInV8SMLu9ewZECwKK",
          "time": "",
          "car": ""
        },
        {
          "email": "andeen@ioboard.org",
          "username": "Aaliyah",
          "deleted": false,
          "admin": false,
          "supervisor": false,
          "leadership": false,
          "is_in": true,
          "description": "",
          "encryptedPassword": "$2a$10$AB5orQcrZ55RQgm90xpwlOGCcx9fpzxQsc/JInV8SMLu9ewZECwKK",
          "time": "",
          "car": ""
        },
        {
          "email": "dmoiel@ioboard.org",
          "username": "Diana",
          "deleted": false,
          "admin": false,
          "supervisor": false,
          "leadership": false,
          "is_in": false,
          "description": "",
          "encryptedPassword": "$2a$10$AB5orQcrZ55RQgm90xpwlOGCcx9fpzxQsc/JInV8SMLu9ewZECwKK",
          "time": "",
          "car": ""
        },
        {
          "email": "apows@ioboard.org",
          "username": "Alexis",
          "deleted": false,
          "admin": false,
          "supervisor": false,
          "leadership": false,
          "is_in": false,
          "description": "",
          "encryptedPassword": "$2a$10$AB5orQcrZ55RQgm90xpwlOGCcx9fpzxQsc/JInV8SMLu9ewZECwKK",
          "time": "",
          "car": ""
        },
        {
          "email": "eed@ioboard.org",
          "username": "Amira",
          "deleted": false,
          "admin": false,
          "supervisor": false,
          "leadership": false,
          "is_in": true,
          "description": "",
          "encryptedPassword": "$2a$10$AB5orQcrZ55RQgm90xpwlOGCcx9fpzxQsc/JInV8SMLu9ewZECwKK",
          "time": "",
          "car": ""
        },
        {
          "email": "asverino@ioboard.org",
          "username": "Armi",
          "deleted": false,
          "admin": false,
          "supervisor": false,
          "leadership": false,
          "is_in": false,
          "description": "",
          "encryptedPassword": "$2a$10$AB5orQcrZ55RQgm90xpwlOGCcx9fpzxQsc/JInV8SMLu9ewZECwKK",
          "time": "",
          "car": ""
        },
        {
          "email": "amae@ioboard.org",
          "username": "Caleigh",
          "deleted": false,
          "admin": false,
          "supervisor": false,
          "leadership": false,
          "is_in": true,
          "description": "",
          "encryptedPassword": "$2a$10$AB5orQcrZ55RQgm90xpwlOGCcx9fpzxQsc/JInV8SMLu9ewZECwKK",
          "time": "",
          "car": ""
        },
        {
          "email": "aye@ioboard.org",
          "username": "Aikins",
          "deleted": false,
          "admin": false,
          "supervisor": false,
          "leadership": false,
          "is_in": true,
          "description": "",
          "encryptedPassword": "$2a$10$AB5orQcrZ55RQgm90xpwlOGCcx9fpzxQsc/JInV8SMLu9ewZECwKK",
          "time": "",
          "car": ""
        },
        {
          "email": "astos@ioboard.org",
          "username": "Anthony",
          "deleted": false,
          "admin": false,
          "supervisor": false,
          "leadership": false,
          "is_in": true,
          "description": "",
          "encryptedPassword": "$2a$10$AB5orQcrZ55RQgm90xpwlOGCcx9fpzxQsc/JInV8SMLu9ewZECwKK",
          "time": "",
          "car": ""
        }
      ];

      User.create(users).exec(function(err, usersAdded) {
      
        if (err) return cb(err);

        console.log(usersAdded);
      });
    }


    Car.count().exec(function(err, numberOfCars) {
    
      if (err) return cb(err);

      if (numberOfCars > 0) {
        console.log('Number of cars found: ', numberOfCars);
        return cb();
      }

      Car.create([
        {car: "TB - Toyota Corolla Beige"},
        {car: "TBL - Toyota Corolla Blue"},
        {car: "TG - Toyota Corolla Gray"},
        {car: "TGR - Toyota Corolla Green"},
        {car: "TS - Toyota Corolla Silver"}
      ], function(err, createdCar) {
        if (err) return res.negotiate(err);
        return cb();
      });
    });
  });
};
