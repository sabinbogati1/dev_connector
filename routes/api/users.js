const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

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
    User.findOne({email: req.body.email})
    .then(user =>{
        if(user){
            return res.status(400).json({email: "Email Already Exits"});
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
    const email = req.body.email;
    const password = req.body.password;

//Find User BY Email
User.findOne({email: email}) .then(
    user =>{
        //Check For user
        if(!user){
            return res.status(404).json({email: "User Not Found"});
        }

        //Check Password
        bcrypt.compare(password, user.password)
            .then(isMatch =>{
                if(isMatch){
                    //User Match
                    //Create JWT Payload
                    const payload = {id: user.id, name: user.name, avatar: user.avatar}

                    //Sign Token
                    jwt.sign(payload, keys.secretOrKey, {
                        expiresIn: 3600
                    }, (err, token)=>{
                            res.json({
                                success: true,
                                token: "Bearer" + token
                            })
                    });

                    res.json({msg: "Success"})
                } else{
                    return res.status(400).json({password: "Password incorrect"})
                }
            })
    }
)

})




module.exports = router;