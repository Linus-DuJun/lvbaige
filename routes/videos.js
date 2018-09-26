const express = require('express');
const router = express.Router();
const VideoProxy = require("../proxy/VideoProxy");


router.post("/", function (request, response, next) {
    let action = request.body._a;
    console.log(action);
    if ("reset" === action) {
        //TODO   add logic for update latest videos.
        response.redirect("./addvideo.html");
    } else {
        VideoProxy.addVideo(request.body, function (error, data) {
            if (error) {
                console.log(error)
                response.send(error);
            } else {
                response.redirect("./addvideo.html");
            }
        })
    }
})


module.exports = router;