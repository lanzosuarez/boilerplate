require('dotenv').config();
const
    restify = require('restify'),
    { dbconn } = require('./src/utils/database_utils'),
    fs = require('fs');

dbconn(function (err) {
    if (err)
        console.log(err);
    else
        console.log('MongoDB successfully connected to: ', process.env.MONGOLAB_URI);
});

//create server
var api = restify.createServer();
api.use(restify.acceptParser(api.acceptable));
api.use(restify.queryParser());
api.use(restify.bodyParser());
api.use(restify.gzipResponse());

/** CORS SETUP */
api.use(
    function crossOrigin(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        return next();
    }
);

function unknownMethodHandler(req, res) {
    if (req.method.toLowerCase() === 'options') {
        var allowHeaders = ['Accept', 'Accept-Version', 'Content-Type', 'Api-Version', 'x-access-token'];

        if (res.methods.indexOf('OPTIONS') === -1) res.methods.push('OPTIONS');

        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Headers', allowHeaders.join(', '));
        res.header('Access-Control-Allow-Methods', res.methods.join(', '));
        res.header('Access-Control-Allow-Origin', req.headers.origin);

        return res.send(204);
    }
    else
        return res.send(new restify.MethodNotAllowedError('Invalid Method'));
}

api.on('MethodNotAllowed', unknownMethodHandler);

var port = process.env.PORT || 3000;
api.listen(port, function () {
    console.log('Server started @ ' + port);
});

module.exports.api = api;

//Root route
api.get('/', function (req, res) { res.send(200, { msg: 'Welcome to AUTOVAULT' }) });

//Unauthenticated routes

// login
require('./src/endpoints/Auth/routes');

// registration
require('./src/endpoints/Admin/routes');

//client routes
require('./src/endpoints/Client/routes');

//transactions routes
require('./src/endpoints/Transactions/routes');

//booking routes
require('./src/endpoints/Bookings/routes');

//booking routes
require('./src/endpoints/Subscription/routes');

