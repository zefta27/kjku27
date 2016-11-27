// var users = require('../../app/controllers/users.server.controller');
//
// module.exports = function(app){
//   app.route('/users')
//   .post(users.create)
//   .get(users.list);
//
//   app.route('/users/:userId')
//   .get(users.read)
//   .put(users.update)
//   .delete(users.delete);
//
//   app.param('userId', users.userByID);
// };

 var users = require('../../app/controllers/users.server.controller'),
  passport = require('passport');

module.exports = function (app) {
  app.route('/signup')
    .get(users.renderSignUp)
    .post(users.signup);

  app.route('/signin')
    .get(users.renderSignIn)
    .post(passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/signin',
      failureFlash: true
    }));

    app.get('/signout', users.signout);

    app.get('/oauth/facebook/:id', function(req,res,next) {
        passport.authenticate(
          'facebook',
           {callbackURL:"/oauth/facebook/callback/"+req.params.id}
        ) (req,res,next);
    });

    // app.get('/oauth/facebook', passport.authenticate('facebook',{
    //   failureRedirect : '/signin'
    // }));

    // app.get('/oauth/facebook/callback/:id', passport.authenticate('facebook',{
    //   failureRedirect: '/signin',
    //   successRedirect: '/'
    // }));

    app.get('/oauth/facebook/callback/:id', function (req,res,next) {
      passport.authenticate(
        'facebook',
        {
          callbackURL: "/oauth/facebook/callback/"+req.params.id
          , successRedirect : "/"
          , failureRedirect : "/signin"
        }
      ) (req, res, next);
    });
};
