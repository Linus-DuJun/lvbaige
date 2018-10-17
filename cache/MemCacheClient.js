const Memcached = require('memcached');
const clientOptions = {
    retries:10,
    retry:10000,
    remove:true,
    poolSize: 20
};
const Client = new Memcached(['127.0.0.1:11211'], clientOptions);

Client.connect('127.0.0.1:11211', function (error, connection) {
    if (error) throw new Error(error);
    console.log("Client connected on " + connection.serverAddress);
});

Client.on('issue', function (details) {
    console.log('Issue event emitted');
});

Client.on('failure', function( details ){
    console.log( "Server " + details.server + "went down due to: " + details.messages.join( '' ));
});
Client.on('reconnecting', function( details ){
    console.log( "Total downtime caused by server " + details.server + " :" + details.totalDownTime + "ms");
});

module.exports = Client;