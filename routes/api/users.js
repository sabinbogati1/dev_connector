const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require("../../config/keys");

//Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//Load User Model
const User = require("../../models/User");


//@route GET api/users/test
//@desc Users post route
//@access PUBLIC
router.get("/test", (req,res) => res.json({msg: "Users Works"}));

//@route GET api/users/register
//@desc Register
//@access PUBLIC
router.post("/register", (req,res) =>{

    const {errors, isValid} = validateRegisterInput(req.body);

    //Check Validation
    if(!isValid){
        return res.status(400).json(errors);
    }

    User.findOne({email: req.body.email})
    .then(user =>{
        if(user){
            errors.email = "Email Already Exits";
            return res.status(400).json(errors);
        } else{

            const avatar = gravatar.url(req.body.email, {
                s: "200",
                r: "pg",
                d: "mm"
            });

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password
            });

            bcrypt.genSalt(10, (err, salt) =>{
                bcrypt.hash(newUser.password, salt, (err, hash) =>{
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                })
            })

        }
    })
});


//@route GET api/users/login
//@desc Login User //Returning JWT TOKEN
//@access PUBLIC

router.post("/login", (req,res) =>{

    const {errors, isValid} = validateLoginInput(req.body);

    //Check Validation
    if(!isValid){
        return res.status(400).json(errors);
    }


    const email = req.body.email;
    const password = req.body.password;


//Find User BY Email
User.findOne({email: email}) .then(
    user =>{
        //Check For user
        if(!user){
            errors.email = "User Not Found";
            return res.status(404).json({errors});
        }

        //Check Password
        bcrypt.compare(password, user.password)
            .then(isMatch =>{
                if(isMatch){
                    //User Match
                    //Create JWT Payload

                    console.log(" password match.... ");
                    const payload = {id: user.id, name: user.name, avatar: user.avatar}

                    //Sign Token
                    jwt.sign(payload, keys.secretOrKey, {
                        expiresIn: 3600
                    }, (err, token)=>{
                        console.log("Err :: ", err);
                        console.log("token :: ", token);
                            res.json({
                                success: true,
                                token: "Bearer " + token
                            })
                    });

                   // res.json({msg: "Success"})
                } else{
                    errors.password = "Password incorrect";
                    return res.status(400).json({errors})
                }
            })
    }
)
})


//@route GET api/users/current
//@desc Return current User
//@access PRIVATE
router.get("/current", passport.authenticate("jwt", {session: false}), 
(req,res) =>{
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});


module.exports = router;