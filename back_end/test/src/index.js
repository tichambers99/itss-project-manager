const path = require('path');
const express = require('express')
const cookieParser = require('cookie-parser')
const handlebars = require('express-handlebars');
const cors = require('cors');
const port = 8000

const route = require('./app/routes/index')
const db = require('./app/config/db.config')
    // connect db
db.connection;

const app = express()

// allow sharing info between backend and frontend
app.use(cors({ 
    origin: "http://localhost:3000", 
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token', 'Authorization'],
    credentials: true, 
}));

    // logger 
    // app.use(morgan('combined'))
app.use(express.static(path.join(__dirname, 'public')))
    // lay ra du lieu tu js ve
    // static file
app.use(express.json());
app.use(cookieParser("K2L"));
    // tao ra body_paser de lay duoc du lieu 
// app.use(express.urlencoded({ extended: true }));
app.engine('.hbs', handlebars({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources/views'));
route(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})