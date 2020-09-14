const Router = require('express').Router();
const passport = require('../authentication/passport');
const apiRoutes = require('./apiRoutes');
const authRoutes = require('../authentication/authRoutes');
const path = require('path');

//Router.use('/api', passport.authenticate('jwt', { session: false }), apiRoutes);
Router.use('/auth', authRoutes);
// For anything else, render the html page
Router.use(function (req, res) {
  res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
});

module.exports = Router;
