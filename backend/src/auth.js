const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: "496413801232-l6mitcluf383rqaao053r2tsm5rdrb10.apps.googleusercontent.com", 
      clientSecret: "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", 
      callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("Google profile:", profile); 
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  console.log('Serializing user:', user);
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  console.log('Deserializing user:', obj);
  done(null, obj);
});

module.exports = passport;