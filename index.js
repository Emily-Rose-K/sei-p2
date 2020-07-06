// configure dotenv
require('dotenv').config();
// require express and set up express app instance (server engine. engine engine engine 🚂)
const Express = require('express');
const app = Express();
// require and set view engine using ejs
const ejsLayouts = require('express-ejs-layouts');
// set app to use false urlencoding
app.use(Express.urlencoded({extended: false})); // look for Anna's slack thread on the stack overflow explanation
// set app public directory for use
app.use(Express.static(__dirname + '/public'));
// set app ejsLayouts for render
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(require('morgan')('dev'));
// require all middleware for app/authentication
// helmet, morgan, passport, and custom middleware, express-sessions, sequelize sessions, flash
const helmet = require('helmet');
const session = require('express-session');
const flash = require('flash');
const passport = require('./config/ppConfig');
const db = require('./models');
const isLoggedIn = require('./middleware/isLoggedIn');
app.use(helmet());
// want add a link to our customer middleware for isLoggedIn
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// create new instance of class Sequilize Store
const sessionStore = new SequelizeStore({
    db: db.sequelize,
    expiration: 1000 * 60 * 30
})

app.use(session({
    secret: process.env.SESSION_SECRET,
    session: sessionStore,
    resave: false,
    saveUninitialized: true
}))

sessionStore.sync();

// initialize and link flash messages and passport and session
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(function(req, res, next) {
    res.locals.alert = req.flash();
    res.locals.currentUser = req.user;

    next();
})


// ROUTES

app.get('/', function(req, res) {
    // check to see if user is logged in
    res.render('index');
})

app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile')
})

// include auth controller
app.use('/auth', require('./controllers/auth'));


app.listen(process.env.PORT || 3000, function() {
    console.log(`listening to port ${process.env.PORT} 🎷🦆`)
});