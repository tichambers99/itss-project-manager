const authRouter = require('./auth')
const registerRouter = require('./register')
const homeRouter = require('./home')
const searchRouter = require('./search')
const userRouter = require('./user')
const commentRouter = require('./comment')
var cookieParser = require('cookie-parser')
const createRouter = require('./create')
const updateRouter = require('./update')
const deleteRouter = require('./delete')

const authMiddleware = require('../middlewares/auth.middelware')

function route(app) {
    app.use('/auth', authRouter);
    app.use('/users', userRouter);
    app.use('/register', registerRouter);
    app.use('/project', authMiddleware.requireAuth, homeRouter)
    app.use('/search', authMiddleware.requireAuth, searchRouter);
    app.use('/create', authMiddleware.requireAuth, createRouter)
    app.use('/update', authMiddleware.requireAuth, updateRouter)
    app.use('/delete', authMiddleware.requireAuth, deleteRouter)
    app.use('/comment/', commentRouter);
}
module.exports = route;