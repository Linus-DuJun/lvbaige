const memcacheClient = require('../cache/MemCacheClient');


function save(key, data, ttl) {
    memcacheClient.set(key, data, ttl, function (error, data) {
        if (error) {
            console.log("Save memcache got ERROR!!!!");
            console.log(error);
        } else {
            // SAVE CACHE SUCCESSFULLY
        }
    });
}

module.exports.save = save;