const express = require('express');
const router = express.Router();
const VideoProxy = require("../proxy/VideoProxy");
const Constants = require("../utils/Constant");
const JsonUtil = require('../utils/JsonFormater');
const SessionStore = require('../sessions/MongoSessionStore');

router.get("/", function (request, response, next) {
    let action = request.query._a;
    if (Constants.VIDEO_GET_A_ALL === action) {
        SessionStore.get(request.session.id, function (error, session) {
            if (error) {
                response.json(JsonUtil.generateJsonResponse(Constants.STATUS_CODE_OK, Constants.STATUS_NOT_USER));
            } else {
                console.log(session);
                getAllVideos(request, response, next);
            }
        });
    } else if (Constants.VIDEO_GET_A_HOT === action) {
        getHotVideos(request, response, next);
    } else if (Constants.VIDEO_GET_A_STAR === action) {
        SessionStore.get(request.session.id, function (error, session) {
            if (error) {
                response.json(JsonUtil.generateJsonResponse(Constants.STATUS_CODE_OK, Constants.STATUS_NOT_USER));
            } else {
                getVideoByStar(request, response, next);
            }
        });
    }
});

router.post("/", function (request, response, next) {
    let action = request.body._a;
    if (Constants.VIDEO_POST_RESET === action) {
        SessionStore.get(request.session.id, function (error, session) {
            if (error) {
                console.log(error);
                response.status(404);
            } else {
                if (session.user.role === 917) {
                    resetHotFlag(request, response, next);
                } else {
                    response.status(404);
                }
            }
        });
    } else if (Constants.VIDEO_POST_ADD === action) {
        SessionStore.get(request.session.id, function (error, session) {
            if (error) {
                console.log(error);
                response.status(404);
            } else {
                if (session.user.role === 917) {
                    addVideo(request, response, next);
                } else {
                    response.status(404);
                }
            }
        })
    }
});

function getHotVideos(request, response, next) {
    VideoProxy.getHotVideos(function (error, data) {
        if (error) {
            console.log(error);
            sendResponseWithErrorInfo(response)
        } else {
            sendResponseWithData(response, data)
        }
    })
}

function getAllVideos(request, response, next) {
    VideoProxy.getAllVideos(function (error, data) {
        if (error) {
            console.log(error);
            sendResponseWithErrorInfo(response)
        } else {
            console.log(data);
            sendResponseWithData(response, data)
        }
    })
}

function getVideoByStar(request, response, next) {
    VideoProxy.getVideoByStar(request.query.star, function (error, data) {
        if (error) {
            console.log(error);
            sendResponseWithErrorInfo(response)
        } else {
            console.log(data);
            sendResponseWithData(response, data)
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

function sendResponseWithErrorInfo(response) {
    response.status(200).json(JsonUtil.generateJsonResponse(Constants.STATUS_CODE_OK, data))
}

function sendResponseWithData(response, data) {
    response.status(200).json(JsonUtil.generateJsonResponse(Constants.STATUS_CODE_OK, data))
}

module.exports = router;