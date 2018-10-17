const mongoose = require('mongoose');
const memcacheClient = require('../cache/MemCacheClient');
const MemCacheUtil = require('../utils/MemCacheUtil');
const Constants = require('../utils/Constant');
const videoSchema = require('../db/schemas/VideoSchema');

const Video = mongoose.model("Video", videoSchema);

const projection = 'id title realUrl';

function getHotVideos(callback) {
    memcacheClient.get(Constants.VIDEO_GET_A_HOT, function (error, cache) {
        if (error) {
           logMemCacheGetError(Constants.VIDEO_GET_A_HOT)
        } else {
            if (cache === undefined) {
                Video.find({isLatest: 1}, projection, function (error, data) {
                    logMemCacheGetFromDb(Constants.VIDEO_GET_A_HOT);
                    MemCacheUtil.save(Constants.VIDEO_GET_A_HOT, data, Constants.MEM_CACHE_TTL_HOT);
                    callback(error, data);
                })
            } else {
                logMemCacheGetFromCache(Constants.VIDEO_GET_A_HOT);
                callback(null, cache);
            }
        }
    })
}

function getVideosByStar(star, callback) {
    memcacheClient.get(star, function(error, cache) {
        if (error) {
            logMemCacheGetError(star)
        } else {
            if (cache === undefined) {
                Video.find({label: star}, projection,  function (error, data) {
                    logMemCacheGetFromDb(star);
                    MemCacheUtil.save(star, data, Constants.MEM_CACHE_TTL_START);
                    callback(error, data);
                })
            } else {
                logMemCacheGetFromCache(star)
                callback(null, cache);
            }
        }
    })
}

function getAllVideos(callback) {
    memcacheClient.get(Constants.VIDEO_GET_A_ALL, function (error, cache) {
        if (error) {
            logMemCacheGetError(Constants.VIDEO_GET_A_ALL);
        } else {
            if (cache === undefined) {
                logMemCacheGetFromDb(Constants.VIDEO_GET_A_ALL);
                Video.find({}, projection, function (error, data) {
                    MemCacheUtil.save(Constants.VIDEO_GET_A_ALL, data, Constants.MEM_CACHE_TTL_ALL);
                    callback(error, data);
                })
            } else {
                logMemCacheGetFromCache(Constants.VIDEO_GET_A_ALL);
                callback(null, cache);
            }
        }
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
        if (error) {
            console.log(error);
        } else {

        }
        callback(error, data);
    })
}

function logMemCacheGetFromCache(key) {
    console.log("get data from memcache: " + key);
}

function logMemCacheGetFromDb(key) {
    console.log("get data from db" + key);
}

function logMemCacheGetError(key, error) {
    console.log("Get data from mem cache got error: " + key);
    console.log(error);
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