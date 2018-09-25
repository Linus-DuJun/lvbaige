const express = require('express');
const router = express.Router();


router.post("/", function (request, response, next) {
    let action = request.body._a;
    console.log(action);
    if ("reset" === action) {
        //TODO   add logic for update latest videos.
        response.redirect("./addvideo.html");
    } else {
        response.redirect("./addvideo.html");
    }
})


module.exports = router;