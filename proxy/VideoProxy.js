const mongoose = require('mongoose');
const videoSchema = require('../db/schemas/video');

const Video = mongoose.model("Video", videoSchema);

function addVideo(data, callback) {
    let labels = data.labels;
    console.log(typeof labels);
    let subLabel = labels.substring(0, labels.length - 1);
    let labelArray = subLabel.split(",");
    console.log(labelArray);
    console.log(typeof labelArray);
    let video = new Video({
        id: data.id,
        category: data.category,
        title: data.title,
        label: labelArray,
        location: data.location,
        year: data.year,
        sourceId: data.source
    });
    video.save(function (error, data) {
        callback(error, data);
    })
}

module.exports.addVideo = addVideo;