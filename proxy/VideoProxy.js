const mongoose = require('mongoose');
const memjs = require('memjs');
const memcacheClient = memjs.Client.create()
const Constants = require('../utils/Constant');
const videoSchema = require('../db/schemas/VideoSchema');

const Video = mongoose.model("Video", videoSchema);

const projection = 'id title realUrl';

function getHotVideos(callback) {
    Video.find({isLatest: 1}, projection, function (error, data) {
        callback(error, data)
    })
}

function getVideosByStar(star, callback) {
    console.log(star);
    Video.find({label: star}, projection,  function (error, data) {
        callback(error, data);
    })
}

function getAllVideos(callback) {
    Video.find({}, projection, function (error, data) {
        callback(error, data);
    })
}


function addVideo(data, callback) {
    let labels = data.labels;
    let subLabel = labels.substring(0, labels.length - 1);
    let labelArray = subLabel.split(",");
    console.log(data.sourceUrl);
    let video = new Video({
        id: data.id,
        category: data.category,
        title: data.title,
        label: labelArray,
        location: data.location,
        year: data.year,
        realUrl: data.sourceUrl,
        sourceId: data.source
    });
    video.save(function (error, data) {
        callback(error, data);
    })
}

function resetHotFlag(callback) {
    Video.updateMany({isLatest: 1}, {isLatest: 0}, function (error, data) {
        callback(error, data);
    })
}

module.exports.addVideo = addVideo;
module.exports.resetHotFlag = resetHotFlag;
module.exports.getHotVideos = getHotVideos;
module.exports.getVideoByStar = getVideosByStar;
module.exports.getAllVideos = getAllVideos;