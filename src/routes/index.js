const homeRouter = require('./homeRoute');
const loginRouter = require('./loginRoute');
const logoutRouter = require('./logoutRoute');
const managerRouter = require('./managerRoute');
const songsRouter = require('./songsRoute');
const singersRouter = require('./singersRoute');
const musiciansRouter = require('./musiciansRoute');
var session = require('express-session');

function route(app){
    app.use(session({ 
        secret: '123456cat',
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 60000 }
    }))
    app.use('/manager', managerRouter);
    app.use('/login', loginRouter);
    app.use('/logout', logoutRouter);
    app.use('/songs', songsRouter);
    app.use('/singers', singersRouter);
    app.use('/musicians', musiciansRouter);
    app.use('/', homeRouter);
}
module.exports = route;
