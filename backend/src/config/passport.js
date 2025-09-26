const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Replace with your Google client details
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:5000/api/auth/google/callback',
},
(accessToken, refreshToken, profile, done) => {
  // Simulate user object with hardcoded role for POC
  const user = {
    id: profile.id,
    displayName: profile.displayName,
    email: profile.emails[0].value,
    role: profile.emails[0].value === 'admin@example.com' ? 'admin' : 'user', // Example RBAC
  };
  return done(null, user);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;