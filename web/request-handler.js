var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var fs = require('fs');
// require more modules/folders here!



var requestHandlers = {
  'GET': function(req, res) {
    var status = 200;
    res.writeHead(status, httpHelpers.headers);
    fs.readFile(__dirname + '/public/index.html', (err, data) => {
      if (err) { throw err; }
      res.end(data);
    });
  },
  'POST': function(req, res) {
    console.log('RECIEVED POST');
    var status = 200;
    res.writeHead(status, httpHelpers.headers);
    fs.readFile(__dirname + '/public/loading.html', (err, data) => {
      if (err) { throw err; }
      res.end(data);
    });
  },
  'OPTIONS': function(req, res) {
    res.end(archive.paths.list);
    return true;
  }, 
  'ERROR': function(res) {
    res.end('ERROR: undefined endpoint');
  }
};

exports.handleRequest = function (req, res) {
  
  var action = requestHandlers[req.method];
  action ? action(req, res) : requestHandlers['ERROR'](res);
  
};
