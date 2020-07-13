
require('dotenv').config();

const Express = require('express');
const app = Express();
const ejsLayouts = require('express-ejs-layouts');
var methodOverride = require('method-override');
app.use(methodOverride('_method'));
const request = require("request");
app.use(Express.urlencoded({extended: false})); 
app.use(Express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(require('morgan')('dev'));

const helmet = require('helmet');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('./config/ppConfig');
const db = require('./models');
const isLoggedIn = require('./middleware/isLoggedIn');
const  SlackBot  = require('slackbots');
const axios = require('axios');


app.use(Express.json());
app.post('/', (req, res) => {
var data = {form: {
      token: process.env.SLACK_AUTH_TOKEN,
      channel: "#general",
      text: "Hi! :wave: \n I'm your new bot."
    }};
request.post('https://slack.com/api/chat.postMessage', data, function (error, response, body) {
      // Sends welcome message
      res.json();
    });
});




app.use(helmet());

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

// include  controllers
app.use('/auth', require('./controllers/auth'));
app.use('/goal', require('./controllers/goal'));
app.use('/project', require('./controllers/project'));
app.use('/milestone', require('./controllers/milestone'));



app.listen(process.env.PORT || 3000, function() {
    console.log(`listening to port ${process.env.PORT} 🎷🐍`)
});
