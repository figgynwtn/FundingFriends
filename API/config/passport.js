const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../models/User');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

let authenticateLogin = async (email, password, cb) => {
    UserModel.findOne({email})
    .then(async (user) => {
        if (!user) {
            return cb(null, false);
        }
        const isValidPwd = await user.isValidPassword(password);

        if (isValidPwd) {
            return cb(null, user);
        } else {
            return cb(null, false);
        }
    })
    .catch((err) => {
        cb(err);
    });
};

let getUserFromToken = async (token, cb) => {
    try {
        return cb(null, token.payload);
    } catch(err) {
        cb(err);
    }
}

passport.use(
    'login',
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      authenticateLogin
    )
);
passport.use(
    new JWTstrategy(
        {
            secretOrKey: process.env.TOP_SECRET_KEY,
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
        },
        getUserFromToken
    )
);