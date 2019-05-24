const User = require('../models/User');
var jwt = require('jsonwebtoken');
const config = require('config');


const signup = async (req, res, next) => {
    console.log(req.body);

    let username = req.body.username;
    let password = req.body.password;
    
    const user = new User({
        username: username 
    });
    await user.setPassword(password); 
    await user.save().then(result => {
        let token = jwt.sign({
            uid: result._id
        }, config.get('jwt.secret'))

        res.json({
            "status": "succes",
            "data": {
                "token": token
            }
        })
    }).catch(error => {
            res.json({
                "status": "succes"
            })
    });
};

const login = async (req, res, next) => {
    const user = await User.authenticate()(req.body.username, req.body.password).then(result => {
        if(!result.user) {
            res.json({
                "status": "failed",
                "message": "failed attempt"
            })
        }
        let token = jwt.sign({
            uid: result.user._id,
            user: result.user.username
        }, config.get('jwt.secret'))

        res.json({
            "status": "succes", 
            "data": {
                "token": token
            }
        })
    }).catch(error => {
        res.json({
            "status": "error",
            "message": error
        })
    });

}

module.exports.signup = signup;
module.exports.login = login;