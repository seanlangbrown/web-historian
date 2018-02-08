var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var fs = require('fs');
// require more modules/folders here!



var requestHandlers = {
  'GET': function(req, res) {
    httpHelpers.serveAssets(res, __dirname + '/public/index.html', null);
  },
  'POST': function(req, res) {
    archive.isUrlInList(req.url, (foundUrl) => {
      if (foundUrl) {
        console.log('found it!'); //httpHelpers.serveAssets(res, archive.path.archvedSites + 'url');
      } else {
        httpHelpers.serveAssets(res, __dirname + '/public/loading.html', null);
        archive.addUrlToList(req.url, () => {});
      }
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
