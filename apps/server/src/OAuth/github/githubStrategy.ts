import passport from "passport";
import Github from "passport-github2"
import { prisma } from "../../db";

const GithubStrategy = Github.Strategy

passport.use(
    new GithubStrategy(
        {
            clientID: process.env.GIT_CLIENT_ID || '',
            clientSecret: process.env.GIT_CLIENT_SECRET || '',
            callbackURL: `${process.env.SERVER_URL}/auth/github/callback`,
            scope: ["profile",'user:email']
        },
        async function (
                accessToken: string,
                refreshToken: string,
                profile: Github.Profile,
                callback: (err?: string | Error | null | undefined, user?: Express.User | undefined) => void
            ) {
            try {
                const checkUser = await prisma.github.findUnique({
                    where: {githubId: profile.id},
                })
                if (checkUser) {
                    return callback(null, checkUser.localUserId)
                }
                const newUser = await prisma.user.create({
                    data: {
                        email: profile.emails![0].value,
                        login: profile.username!,
                        password: profile.provider + profile.id,
                        firstName: profile.username!,
                        secondName: profile.provider,
                        avatar: profile.photos![0]?.value,
                        githubId: {
                            create: {
                                githubId: profile.id
                                }
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
