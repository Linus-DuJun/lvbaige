const express = require('express');
const router = express.Router();
const fs = require('fs');
const bodyPaser = require('body-parser');
const userProxy = require('../proxy/UserProxy');
const Constant = require('../utils/Constant')

router.use(function (req, res, next) {
    console.log(Date.now());
    next();
})
/* GET users listing. */
router.get('/', function(req, res, next) {
    fs.readFile('./views/register.html', function (error, data) {
        if (error) {
            console.log(error);
            res.send("error happened");
        } else {
            res.send(data.toString());
        }
    })
});

router.get('/count', function (req, res, next) {
    res.send("Total user count: "  + 5);
})

router.post('/', function (req, res, next) {
    let action = req.body._a;
    if (action === Constant.USER_A_REGISTER) {
        userProxy.addUser(req.body, function (error, user) {
            if (error) {
                res.send('error happened');
            } else {
                res.send(user.greeting());
            }
        })
    } else if (action === Constant.USER_A_LOGIN) {

    } else if (action === Constant.USER_A_SET_SHARE) {

    } else if (action === Constant.USER_A_SET_VIP) {

    }

})

module.exports = router;
