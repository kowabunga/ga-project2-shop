const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');

// configuring Passport!
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
    },
    async function (accessToken, refreshToken, profile, cb) {
      // a user has logged in via OAuth!
      // refer to the lesson plan from earlier today in order to set this up

      try {
        let user = await User.findOne({ googleId: profile.id });

        if (user) return cb(null, user);

        user = await User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
        });
      } catch (error) {
        return cb(error);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  // Find your User, using your model, and then call done(err, whateverYourUserIsCalled)
  // When you call this done function passport assigns the user document to req.user, which will
  // be availible in every Single controller function, so you always know the logged in user
  try {
    let userDoc = await User.findById(id);
    done(null, userDoc);
  } catch (error) {
    done(error);
  }
});
