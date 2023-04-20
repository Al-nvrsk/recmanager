import passport from "passport";
import Google from "passport-google-oauth20"
import { prisma } from "../../db";

const GoogleStrategy = Google.Strategy

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID || '',
            clientSecret:process.env.CLIENT_SECRET || '',
            callbackURL: "/auth/google/callback",
            scope: ["profile", "email"],
        },
        async function (accessToken, refreshToken, profile, callback) {
            try {
                console.log('email', profile.emails![0].value)
                const checkUser = await prisma.google.findUnique({
                    where: {googleId: profile.id},
                })
                if (checkUser) {
                    return callback(null, checkUser.localUserId)
                }
                const newUser = await prisma.user.create({
                    data: {
                        email: profile.emails![0].value,
                        login: profile.displayName,
                        password: profile.provider + profile.id,
                        firstName: profile.name?.givenName ?? '',
                        secondName: profile.name?.givenName ?? '',
                        avatar: profile.photos![0]?.value,
                        googleId: {
                            create: {googleId:profile.id}
                        }
                    }
                })
                return callback(null, newUser.id)
        }
        catch(e) {
            console.log('error', e)
            callback('error')
        }
        }
    )
);
