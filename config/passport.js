const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("../config/keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport =>{

    console.log("Inside Passport..");

    passport.use(new JWTStrategy(opts, (jwt_payload,done) =>{
       // console.log("JWT _ payload :: " + jwt_payload);

        User.findById(jwt_payload.id).then(user =>{
            if(user){
                console.log("Passport User found : ", user);
                return done(null, user);
            }

            console.log("NO User:: ")
            return done(null, false);
        })
        .catch(err => console.log(err));

    }));
}