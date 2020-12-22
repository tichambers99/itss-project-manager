const authRouter = require('./auth')
const registerRouter = require('./register')
const homeRouter = require('./home')
const searchRouter = require('./search')
const userRouter = require('./user')
const projectRouter = require('./create')
const commentRouter = require('./comment')
var cookieParser = require('cookie-parser')


function route(app) {

    app.use('/sign-in', authRouter);
    app.use('/users', userRouter);
    app.use('/register', registerRouter);
    app.use('/', homeRouter)
    app.use('/search', searchRouter);
    app.use('/project', projectRouter);
    app.use('/comment/', commentRouter);

    app.use('/private', (req, res, next) => {
        try {
            var token = req.cookies.token;
            var ketqua = jwt.verify(token, privateKey);
            if (ketqua) {

                next();
            }
        } catch (error) {
            return res.redirect('/sign-in')
        }
    }, (req, res) => {
        res.json("Wellcome")
    })

}
module.exports = route;