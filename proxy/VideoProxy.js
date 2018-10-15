const mongoose = require('mongoose');
const videoSchema = require('../db/schemas/video');

const Video = mongoose.model("Video", videoSchema);

function getHotVideos(callback) {
    Video.query()
}

function getVideosByStar(star, callback) {

}

function getAllVideos(callback) {

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
        url: data.sourceUrl,
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