const express = require('express');
const router = express.Router();
const VideoProxy = require("../proxy/VideoProxy");
const Constants = require("../utils/Constant");

router.get("/", function (request, response, next) {
    let action = request.query._a;
    if (Constants.VIDEO_GET_A_ALL === action) {
        getAllVideos(request, response, next);
    } else if (Constants.VIDEO_GET_A_HOT === action) {
        getHotVideos(request, response, next);
    } else if (Constants.VIDEO_GET_A_STAR === action) {
        getVideoByStar(request, response, next);
    }
});

router.post("/", function (request, response, next) {
    let action = request.body._a;
    console.log(action);
    if (Constants.VIDEO_POST_RESET === action) {
        resetHotFlag(request, response, next);
    } else if (Constants.VIDEO_POST_ADD === action) {
        addVideo(request, response, next);
    }
});

function getHotVideos(request, response, next) {
    VideoProxy.getHotVideos(function (error, data) {
        if (error) {
            console.log(error);
        } else {
            console.log(data);
        }
    })
}

function getAllVideos(request, response, next) {
    VideoProxy.getAllVideos(function (error, data) {
        if (error) {
            console.log(error);
        } else {
            console.log(data);
        }
    })
}

function getVideoByStar(request, response, next) {
    VideoProxy.getVideoByStar(request.query.star, function (error, data) {
        if (error) {
            console.log(error);
        } else {
            console.log(data);
        }
    })
}

function resetHotFlag(request, response, next) {
    VideoProxy.resetHotFlag(function (error, data) {
        if (error) {
            console.log(error);
            response.send(error);
        } else {
            response.redirect("./addvideo.html");
        }
    })
}

function addVideo(request, response, next) {
    VideoProxy.addVideo(request.body, function (error, data) {
        if (error) {
            console.log(error)
            response.send(error);
        } else {
            response.redirect("./addvideo.html");
        }
    })
}

module.exports = router;