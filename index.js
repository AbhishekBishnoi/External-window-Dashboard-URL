var path = require('path');
var express = require('express');
var mime = require('mime-types');
var compression = require('compression');

var router = express.Router();
require('dotenv').load();

var app = express();
app.use(compression());
var bodyParser = require('body-parser');

//global root path
global.__base = __dirname + '/';


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('port', process.env.PORT || 3000);

//apis
var master = require('./api/master');
var config = require('./api/config');
var user = require('./api/user');

//routes
app.use('/api/master', master);
app.use('/api/config', config);
app.use('/api/service', router);
app.use('/api/user', user);


//Cron Job to send ticks to UI

var CronJob = require('cron').CronJob;
var CronTime = require('cron').CronTime;
let pumpingService = new CronJob('*/' + process.env.frequency + ' * * * * *', function () {
    var min = parseFloat(process.env.minRange),
        max = parseFloat(process.env.maxRange);
    var factor = (Math.random() * (max - min) + min).toFixed(4);
    io.emit('tick', factor);
}, null, true, 'America/Los_Angeles');

let deltaService = new CronJob('*/' + process.env.frequency + ' * * * * *', function () {
    var min = parseFloat(1),
        max = parseFloat(5);
    var factor = parseInt((Math.random() * (max - min) + min));
    io.emit('delta', { delta: factor, id: 204 });
}, null, true, 'America/Los_Angeles');
deltaService.start();


var server = require('http').createServer(app);
var io = require('socket.io')(server);
io.sockets.on('connection', function (socket) {
    // console.log('Hello there!');
});

router.post('/toggle', function (req, res) {
    if (req.body.start && !req.body.frequency) {
        pumpingService.setTime(new CronTime('*/' + process.env.frequency + ' * * * * *'));
        pumpingService.start();
    } else
        pumpingService.stop();
    if (req.body.frequency) {
        pumpingService.setTime(new CronTime('*/' + req.body.frequency + ' * * * * *'));
        pumpingService.start();
    }
    res.sendStatus(200);
});

router.post('/range', function (req, res) {
    process.env[req.body.name] = req.body.value;
    pumpingService.stop();
    pumpingService.start();
    res.sendStatus(200);
});


var oneWeek = 86400000 * 7;
app.use(express.static(path.join(__dirname, 'build'), {
    eTags: true,
    maxAge: oneWeek,
    setHeaders: function (res, path) {
        if (mime.lookup(path) === 'text/html') {
            res.setHeader('Cache-Control', 'public, max-age=0')
        }
        if (path.indexOf('app.min.js') >= 0) {
            res.setHeader('Cache-Control', 'public, max-age=0')
        }
        if (path.indexOf('vendor.min.js') >= 0 || path.indexOf('fonts') >= 0 || path.indexOf('images') >= 0) {
            res.setHeader('Cache-Control', 'public, max-age=31556952000')
        }
    }
}));

app.use('/*', function (req, res) {
    res.sendFile(__dirname + '/build/index.html');
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    if (app.get('env') !== 'development') {
        delete err.stack;
    }
    res.send(err);
});




server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
