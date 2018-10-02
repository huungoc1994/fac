module.exports = (app, config, passport) => {
    const FacebookStrategy = require('passport-facebook').Strategy;

    passport.use(new FacebookStrategy({
        clientID: '1884317688321793',
        clientSecret: 'addb7db5d863efb2b6308a07c5f520c4',
        callbackURL: "https://facapp.herokuapp.com/auth/facebook/callback"
      },
      function(accessToken, refreshToken, profile, done) {
        // User.findOrCreate(..., function(err, user) {
        //   if (err) { return done(err); }
        //   done(null, user);
        // });
        console.log(profile);
        console.log('....');
        console.log(accessToken);
        console.log('....');
        console.log(refreshToken);
      }
    ));

    // Route
    app.get('/auth/facebook', passport.authenticate('facebook', {
        authType: 'rerequest',
        scope: [
            'email', 'user_birthday', 'user_friends', 'user_gender', 'user_location',
            'user_posts','user_status', 'manage_pages', 'pages_messaging',
            'pages_messaging_phone_number', 'pages_show_list', 'publish_pages',
            'publish_to_groups'
        ]
    }));

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/',
        successRedirect: '/fac'
    }));
}