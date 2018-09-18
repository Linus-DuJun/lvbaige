const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    nickname: {type: String, required: true},
    gender: {type: Number, enum: [0, 1], default: 1},  // 0 = 女，1 = 男
    vip: {type: Number, enum: [0, 1], default: 0},      // 0 = false, 1 = true;
    vipDate: {type: Date, default: Date.now()}
});

userSchema.methods.greeting = function () {
    return 'hello I am ' + this.nickname;
}

module.exports = userSchema;