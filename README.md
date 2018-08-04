# io_board

a [Sails](http://sailsjs.org) application
"# io_board" 

What's an in/out board?

An in/out board is used at a work place where employees go out on the field. It allows employees in the office to know where other employees are and what are they doing. For example if an employee gets a call the secretary can quickly look at the board and know if the employee is at the office so they can take the call or that the employee is not in that day, or when the employee will be back.

Features that are implemented

Board Page: The in/out board app I am building will be used at my workplace with a board page opened in full screen in a big touch screen TV at the front lobby, where the secretary can see it. It will allow employees to quickly update their status with an on screen keyboard when they come in or leave. 

Homepage: page that everybody at the office can access from their computer and where employees can see people’s status and update their status. It also shows how many people are in right now.

Edit users page: where admin users can add, edit, and delete or disable users, agency cars.

Edit Cars Page: Add and edit cars

History Page: allows admins to see a user's status history.

Real-time: user’s status updates are seen on all pages that are connected to the app. This is implemented using web sockets.

How to deploy this system
1.	In Windows, go to https://nodejs.org/en/ and download one of the versions
2.	Install nodejs with default options.
3.	Open the Start menu and go to your installed programs. Open Nodejs->Nodejs command prompt
4.	Run this command: npm install sails –g 
(This will install the framework the project uses)
5.	Run this command: git clone https://github.com/aneudy2000/io_board.git 
(This will download the source code for the project)
6.	In the same command prompt cd to io_board
7.	Run this command npm install 
(This will install all dependencies the project needs to run)
8.	To run the app without installing MySQL open config/models.js and change connection to 'localDiskDb'. With command prompt or a terminal cd to io_board directory then run this command: sails lift
(This will start the app and add seed data. The project is ready to run now because it uses a built-in disk based database as default. To setup the project with MySQL continue step 10.)
9.	The default login is clarkkent@ioboard.org and password abc123
Open the app with two separate browsers to test the real-time capabilities.
10.	To use the project with MySQL.
a.	Run MySQL.
b.	Go to the Project folder and edit /config/connections.js with your favorite text editor. Write your MySQL settings in the MysqlServer section.
c.	Go to the /config/models.js and set connection to ‘MysqlServer’
d.	Next time you run the app, tables will be created with seed data.
11. With command prompt or a terminal cd to io_board directory then run this command: sails lift.
