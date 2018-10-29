const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    tel: {type: Number, required: true},
    nickname: {type: String},
    gender: {type: Number, enum: [0, 1], default: 1},  // 0 = 女，1 = 男
    vip: {type: Number, enum: [0, 1], default: 0},      // 0 = false, 1 = true;
    isShared: {type: Boolean, enum: [0, 1], default: 0}, // 0 = false, 1 = true;
    role:{type: Number, enum:[0, 917], default: 0},
    vipDate: {type: Date, default: Date.now}
});

userSchema.methods.greeting = function () {
    return 'hello I am ' + this.nickname;
}

module.exports = userSchema;