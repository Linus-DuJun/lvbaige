const  mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
    id: {type: String, required: true},
    category: {type: Number, enum: [1, 2, 3, 4, 5], required: true}, // 1 = 男双， 2 = 混双， 3 = 女双， 4 = 男单， 5 = 女单
    title: {type: String, required: true},
    label: {type: Array, required: true, default: []},
    location: {type: String, required: true},
    year: {type: Number, required: true},
    isLatest: {type: Number, enum: [0, 1], default: 1}, // 1 = true, 0 = false
    sourceId: {type: Number, enum: [1, 2, 3, 4], required: true, default: 1} // 1 = 腾讯视频， 2 = B站， 3 = 优酷   4 = 自己
});


module.exports = videoSchema;
