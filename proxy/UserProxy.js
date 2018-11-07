const mongoose = require('../db/connection');
const userSchema = require('../db/schemas/user');
const JsonFormater = require('../utils/JsonFormater');
const Constants = require('../utils/Constant');
const md5 = require("md5");

const User = mongoose.model('User', userSchema);

function addUser(data, callback) {
    date.setMonth(date.getMonth() + 9);
    let user = new User({
        email: data.email
    });

    User.findOne({email: data.email}, function (error, data) {
        if (error) {
            callback(JsonFormater.generateJsonResponse(Constants.STATUS_CODE_ERROR, Constants.STATUS_ERROR_MESSAGE));
        } else {
            if (data != null) {
                callback(JsonFormater.generateJsonResponse(Constants.STATUS_USER_EXISTED, Constants.STATUS_USER_EXISTED_MESSAGE));
            } else {
                user.save(function (error, user) {
                    if (error) {
                        callback(JsonFormater.generateJsonResponse(Constants.STATUS_CODE_ERROR, Constants.STATUS_ERROR_MESSAGE));
                    } else {
                        callback(JsonFormater.generateJsonResponse(Constants.STATUS_CODE_OK, user));
                    }
                })
            }
        }
    })
}

function updateVip(data, callback) {
    User.updateOne({email: data.email}, {vip: 1, vipDate: getVipDate()}, function (error, data) {
        if (error) {
            callback(JsonFormater.generateJsonResponse(Constants.STATUS_CODE_ERROR, Constants.STATUS_ERROR_MESSAGE));
        } else {
            console.log(data.vipDate);
            callback(JsonFormater.generateJsonResponse(Constants.STATUS_CODE_OK, data));
        }
    })
}

function updateShare(data, callback) {
    User.updateOne({email: data.email}, {isShared: 1}, function (error, data) {
        if (error) {
            callback(JsonFormater.generateJsonResponse(Constants.STATUS_CODE_ERROR, Constants.STATUS_ERROR_MESSAGE));
        } else {
            callback(JsonFormater.generateJsonResponse(Constants.STATUS_CODE_OK, data))
        }
    })
}

function login(data, callback) {
    User.findOne({email: data.email}, function (error, data) {
        if (error) {
            callback(JsonFormater.generateJsonResponse(Constants.STATUS_CODE_ERROR, Constants.STATUS_ERROR_MESSAGE));
        } else {
            if (data === null) {
                let user = new User({
                    email: data.email,
                })
                user.save(function (error, user) {
                    if (error) {
                        callback(JsonFormater.generateJsonResponse(Constants.STATUS_CODE_ERROR, Constants.STATUS_ERROR_MESSAGE));
                    } else {
                        callback(JsonFormater.generateJsonResponse(Constants.STATUS_CODE_OK, user));
                    }
                })
            } else {
                callback(JsonFormater.generateJsonResponse(Constants.STATUS_CODE_OK, data));
            }
        }
    })
}

function getVipDate() {
    let date = new Date();
    date.setMonth(date.getMonth() + 1);
    console.log(date.toLocaleString());
    return date;
}

function getCount(callback) {
    //TODO get count
}

module.exports.addUser = addUser;
module.exports.updateVip = updateVip;
module.exports.updateShare = updateShare;
module.exports.getCount = getCount;
module.exports.login = login;