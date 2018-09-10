const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lvbaige', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error: '));
db.once('open', () => console.log("DB connected"));

module.exports = mongoose;