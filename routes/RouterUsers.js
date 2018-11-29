const express = require('express');
const router = express.Router();
const fs = require('fs');
const bodyParser = require('body-parser');
const userProxy = require('../proxy/UserProxy');
const Constant = require('../utils/Constant')
const SessionStore = require('../sessions/MongoSessionStore');
const JsonFormater = require('../utils/JsonFormater');


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
            let user = dbData.data;
            user.pwd = request.session.id;
            if (user.role === 917) {
                response.redirect('./reset.html');
            } else {
                response.json(JsonFormater.generateJsonResponse(Constant.STATUS_CODE_OK, user));
            }
        } else {
            response.json(dbData);
        }
    });
}

function login(req, res) {
    userProxy.login(req.body, dbData => {
        let statusCode = dbData.code;
        if (statusCode === Constant.STATUS_CODE_OK) {
            req.session.user = dbData.data;
            let user = dbData.data;
            user.pwd = req.session.id;
            if (dbData.data.role === 917) {
                res.redirect('./reset.html');
            } else {
                res.json(JsonFormater.generateJsonResponse(Constant.STATUS_CODE_OK, user));
            }
        } else {
            res.json(dbData);
        }
    })
}

function updateShare(req, res) {
    SessionStore.get(req.session.id, function (error, session) {
        if (error) {
            res.json(JsonFormater.generateJsonResponse(Constant.STATUS_CODE_ERROR, Constant.STATUS_ERROR_MESSAGE))
        } else {
            let user = session.user;
            if (user.email === req.body.email) {
                userProxy.updateShare(req.body, dbData => {
                    if (dbData.code === Constant.STATUS_CODE_OK) {
                        user.isShared = true;
                        req.session.user.isShared = true;
                        res.json(JsonFormater.generateJsonResponse(Constant.STATUS_CODE_OK, Constant.STATUS_OK_MESSAGE));
                    } else {
                        res.json(dbData)
                    }
                });
            }
        }
    })
}

function updateVip(req, res) {
    SessionStore.get(req.session.id, function (error, session) {
        if (error) {
            res.json(JsonFormater.generateJsonResponse(Constant.STATUS_CODE_ERROR, Constant.STATUS_ERROR_MESSAGE))
        } else {
            let user = session.user;
            if (user.email === req.body.email) {
                userProxy.updateVip(req.body, dbData => {
                    if (dbData.code === Constant.STATUS_CODE_OK) {
                        let date = new Date();
                        date = date.setMonth(date.getMonth() + 1);
                        req.session.user.vipDate = date;
                        res.json(JsonFormater.generateJsonResponse(Constant.STATUS_CODE_OK, Constant.STATUS_OK_MESSAGE))
                    } else {
                        //TODO add failed record to file.
                        res.json(dbData)
                    }
                });         
            }
        }
    });
}

module.exports = router;
