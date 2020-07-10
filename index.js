
require('dotenv').config();

const Express = require('express');
const app = Express();
const ejsLayouts = require('express-ejs-layouts');

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


app.get('/:team', isLoggedIn, function(req, res) {
    //find team where id = req.params.team
    db.team.findOne({
        where: {
            id: req.params.team
        },
    })
    res.render('team', {team: db.team,
                        users: db.team.user, 
                        goals: db.team.goal,
                        projects: db.goal.project,
                        milestones: db.project.milestone})
})


app.listen(process.env.PORT || 3000, function() {
    console.log(`listening to port ${process.env.PORT} 🎷🐍`)
});