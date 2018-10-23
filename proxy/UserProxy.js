const mongoose = require('../db/connection');
const userSchema = require('../db/schemas/user');
const md5 = require("md5");

const User = mongoose.model('User', userSchema);

function addUser(data, callback) {
    let user = new User({
        email: data.email,
        nickname: data.username,
        password: md5(data.password + "user-lbg"),
        gender: data.gender
    })

    user.save(function (error, user) {
        if (error) {
            console.log(error);
        } else {
            callback(null, user);
        }
    })
}

function getCount(callback) {
    //TODO get count
}

module.exports.addUser = addUser;