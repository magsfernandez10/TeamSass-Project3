const router = require("express").Router();
const User = require("../../models/user")
const passport = require ("../../passport")

router.post("/user", (req, res) => {
    console.log("user signup");
    const { username, password } = req.body;
    //Add validation
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            console.log("the err is" + err);
        } else if (user) {
            res.json({ error: `${username} has already been used` })

        }
        else {
            const newUser = new User({
                username: username,
                password: password,
            })
            newUser.save((err, savedUser) => {
                if (err) return res.json(err);
                res.json(savedUser)
            })
        }
    })
})

router.post("/user/login", (req, res, next) => {
    console.log('routes/user.js, login, req.body: ')
    console.log(req.body)
    next()
},
    passport.authenticate('local'), (req, res) => {
        console.log("logged in", req.user);
        let userInfo = {
            username: req.user.username
        };
        res.send(userInfo);
    }
)

router.get('/user', (req,res,next) => {
    console.log(req.user);
    if(req.user){
        res.json({user: req.user})
    }else{
        res.json ({user: null})
    }
})

router.post('/user/logout', (req,res) => {
    if(req.user){
        req.logout();
        res.send({msg: "log out"})
    } else{
        res.send({msg: "nothing to log out"})
    }
})

module.exports = router;