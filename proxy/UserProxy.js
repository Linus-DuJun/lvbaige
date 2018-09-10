const mongoose = require('../db/connection');
const userSchema = require('../db/schemas/user');

const User = mongoose.model('User', userSchema);

function addUser(callback) {
    let linus = new User({
        email: 'linus.du@stoamigo.com',
        nickname: 'linus.du',
        password: '123456'
    })

    linus.save(function (error, user) {
        if (error) {
            console.log(error);
        } else {
            callback(null, user);
        }
    })
}

module.exports.addUser = addUser;