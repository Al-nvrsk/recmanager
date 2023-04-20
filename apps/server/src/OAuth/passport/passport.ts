import passport from "passport";
import '../github/githubStrategy'
import '../google/googleStrategy'

passport.serializeUser((user , cb) => {
    cb(null, user);
});

passport.deserializeUser((user: Express.User, cb) => { 
    cb(null, user )
});
