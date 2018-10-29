const Session = require('express-session');
const MongoStore = require('./MongoSessionStore');

module.exports = Session({
    secret: 'egiabvl',
    resave: false,
    saveUninitialized: false,
    store: MongoStore,
    cookie: {
        secure: false,
        path: '/',
        maxAge: 1000 * 3600
    },
    name: 'lvbaige',

})