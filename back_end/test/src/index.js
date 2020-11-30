const path = require('path');
const express = require('express')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const sass = require('node-sass');
const handlebars = require('express-handlebars');
const jwt = require('jsonwebtoken');
const port = 8080

const route = require('./app/routes/index')
const db = require('./app/config/db.config')
    // connect db
db.connection;

const app = express()
    // logger 
    // app.use(morgan('combined'))
app.use(express.static(path.join(__dirname, 'public')))
    // lay ra du lieu tu js ve
app.use(express.json());
app.use(cookieParser("K2L"));
// tao ra body_paser de lay duoc du lieu 
app.use(express.urlencoded({ extended: true }));
app.engine('.hbs', handlebars({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources/views'));
route(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})