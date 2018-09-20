const express = require('express');
const router = express.Router();


router.post("/", function (request, response, next) {
    console.log(request.body);
})


module.exports = router;