const Auth0Strategy = require('passport-auth0');

const {CLIENT_ID, CLIENT_SECRET, DOMAIN} = process.env;

const strat = new Auth0Strategy(
    {
        domain: DOMAIN,
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        callbackURL: '/login',
        scope: 'openid email profile'
    },
    (accessToekn, refreshToken, extraParams, profile, done) => {
        return done(null, profile);
    }
);

const logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect(process.env.REACT_APP_HOME);
    })
};

module.exports = {
    strat,
    logout
}