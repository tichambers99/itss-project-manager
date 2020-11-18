const authRouter = require('./auth')
const registerRouter = require('./register')

function route(app) {

    app.use('/sign-in', authRouter);
    app.use('/register', registerRouter);

}
module.exports = route;