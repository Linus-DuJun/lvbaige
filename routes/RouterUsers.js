const express = require('express');
const router = express.Router();
const fs = require('fs');
const bodyPaser = require('body-parser');
const userProxy = require('../proxy/UserProxy');
const Constant = require('../utils/Constant')
const User = require('../db/schemas/user');

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
        userProxy.addUser(req.body, dbData => {
            let statusCode = dbData.code;
            if (statusCode === Constant.STATUS_CODE_OK) {
                req.session.user = dbData.data;
                console.log("register: " + req.session.id);
                res.redirect('./reset.html');
            }
            // res.json(dbData)
        });
    } else if (action === Constant.USER_A_LOGIN) {

    } else if (action === Constant.USER_A_SET_SHARE) {
        userProxy.updateShare(req.body, data => res.json(data));
    } else if (action === Constant.USER_A_SET_VIP) {
        userProxy.updateVip(req.body, data => res.json(data));
    }
})

module.exports = router;
