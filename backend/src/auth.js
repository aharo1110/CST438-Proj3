const passport = require("passport");
const knex = require('./database');
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
      callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("Google profile:", profile); 

      try {
        const user = await knex('users').where({ google_id: profile.id }).first();
        if (!user) {
          const newUser = {
            username: profile.displayName,
            email: profile.emails[0].value,
            google_id: profile.id,
            display_name: profile.displayName
          };
          await knex('users').insert(newUser);
          done(null, { profile, isNew: true });
        } else {
          done(null, { profile, isNew: false });
        }
      } catch (error) {
        done(error, null);
      }
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