import express from 'express'
import passport from 'passport'

const routerOAuth = express.Router();

routerOAuth.get("/google",
    passport.authenticate("google", {
        scope:["profile", 'email']
    }));

routerOAuth.get("/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/login/failed",
    }),
    (req, res) => {
            req.session!.userId = req.user
        res.redirect(`${process.env.HOST_URL}`);
    }
);

routerOAuth.get("/github",
    passport.authenticate("github", {
        scope: ["profile",'user:email'] 
    }));

routerOAuth.get("/github/callback",
    passport.authenticate("github", {
        failureRedirect: "/login/failed",
    }),
    (req, res) => {
            req.session!.userId = req.user
        res.redirect(`${process.env.HOST_URL}`);
    }
);

routerOAuth.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "failure",
    });
});

export { routerOAuth }
