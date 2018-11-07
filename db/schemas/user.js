const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {type: String, required: true},
    pwd: {type: String, required: true},
    nickname: {type: String},
    gender: {type: Number, enum: [0, 1], default: 1},  // 0 = 女，1 = 男
    isShared: {type: Boolean, enum: [0, 1], default: 0}, // 0 = false, 1 = true;
    role:{type: Number, enum:[0, 917], default: 0},
    vipDate: {type: Number, default: Date.now}
});


module.exports = userSchema;