const authRouter = require('./auth')
const registerRouter = require('./register')
const homeRouter = require('./home')
const searchRouter = require('./search')
const userRouter = require('./user')
const createRouter = require('./create')

const authMiddleware = require('../middlewares/auth.middelware')

function route(app) {
    app.use('/auth', authRouter);
    app.use('/users', userRouter);
    app.use('/register', registerRouter);
    app.use('/project', authMiddleware.requireAuth, homeRouter)
    app.use('/search', authMiddleware.requireAuth, searchRouter);
    app.use('/create', authMiddleware.requireAuth, createRouter)
}
module.exports = route;