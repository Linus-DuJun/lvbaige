const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    nickname: String,
    gender: {type: Number, default: 1}
});

userSchema.methods.greeting = function () {
    return 'hello I am ' + this.nickname;
}

module.exports = userSchema;