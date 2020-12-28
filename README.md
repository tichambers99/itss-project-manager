# thltweb-project-manager
thltm project at school - manage projects for users with leader and member in a team.

# Database
This database is used with mySQL, so you can open a sql server management like mySQL Workbench, DataGrip to make a new database.

# We have server side and client side

# On server:
## Firstly,

At thltweb-project-manager folder, move to test (server side) by `cd back-end/test` command.\
Then run `npm i` to install all the packages.\

## Secondly, 

  - Install packages with: `npm install`
  - Make folder config in `test/src/app` and add file db.config.js with content:
 
          module.exports = {
              HOST: "localhost",
              USER: "username",
              PASSWORD: "yourpassword",
              DB: "your_database"
          };
  - Run server with command: 
  
        npm start
  - Server will run on: http://localhost:8000/
  
# On client: 

## Firstly,

At thltweb-project-manager folder, move to my-app (client side) by `cd my-app` command.\
Then run `npm i` to install all the packages.\

## Secondly, 

Run `npm start` or `yarn start` command to start the project.

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
 
