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
       addUser(req, res);
    } else if (action === Constant.USER_A_LOGIN) {
       login(req, res);
    } else if (action === Constant.USER_A_SET_SHARE) {
       updateShare(req, res);
    } else if (action === Constant.USER_A_SET_VIP) {
       updateVip(req, res);
    }
})

function addUser(request, response) {
    userProxy.addUser(request.body, dbData => {
        if (dbData.code === Constant.STATUS_CODE_OK) {
            request.session.user = dbData.data;
            if (user.role === 917) {
                response.redirect('./reset.html');
            } else {
                response.json(dbData);
            }
        }
    });
}

function login(req, res) {
    userProxy.login(req.body, dbData => {
        let statusCode = dbData.code;
        if (statusCode === Constant.STATUS_CODE_OK) {
            req.session.user = dbData.data;
            if (user.role === 917) {
                res.redirect('./reset.html');
            } else {
                res.json(dbData);
            }
        }
    })
}

function updateShare(req, res) {
    userProxy.updateShare(req.body, dbData => {
        if (dbData.code === Constant.STATUS_CODE_OK) {
            req.session.user = dbData.data;
            res.json(dbData)
        }
    });
}

function updateVip(req, res) {
    userProxy.updateVip(req.body, dbData => {
        req.session.user = dbData.data;
        res.json(dbData)
    });
}

module.exports = router;
