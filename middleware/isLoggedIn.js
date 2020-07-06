// write a function to use as middleware
module.exports = function(req, res, next) {
    // check and see if we have a user variable set
    if (!req.user) {
        req.flash('error', 'You must be logged in to view this page.');
        res.redirect('/auth/login');
    } else {
        next();
    }
}

    // if we do, we will allow our app to carry on
    // if we do not, we will let user know they have to be logged in to access
    // redirec user to /auth/login