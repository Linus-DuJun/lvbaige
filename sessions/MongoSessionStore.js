const Session = require('express-session');
const MongoStore = require('connect-mongo')(Session);

const Store = new MongoStore({
    url: 'mongodb://localhost/lvbaige',
    ttl: 7 * 24 * 3600,  // 7 days
    autoRemove: 'interval',
    autoRemoveInterval: 10,  // 10 minutes
    touchAfter: 24 * 3600
});

Store.on('create', sessionId => console.log("A session has been created and ID is " + sessionId));

Store.on('touch', sessionId => console.log('A session has been touched (but not modified) and ID is ' + sessionId));

Store.on('update', sessionId => console.log('A session has been updated and ID is ' + sessionId));

Store.on('set', sessionId => console.log('A session has been created OR updated (for compatibility purpose) and ID is ' + sessionId));

Store.on('destroy', sessionId => console('A session has been destroyed and ID is ' + sessionId));


module.exports = Store;