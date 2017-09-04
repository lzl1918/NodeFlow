'use strict';

var http = require('http');

var flow = require('./modules/flow').create();
var logger = function (context, next) {
    console.log(context.req.url);
    next();
};
var notfound = function (context, next) {
    context.res.writeHead(404);
    context.res.end();
    // no call of next()
};

flow.add(logger);
flow.add(notfound);

http.createServer(function (req, res) {
    var app = flow.build();
    app({
        req: req,
        res: res
    });
}).listen(8081);
