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
    let body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      // at this point, `body` has the entire request body stored in it as a string
      console.log('body: ', body);
      console.log('POST request: ', req.headers);
      //stuff
      var requestedURL = archive.makeValidURL(body.split('=')[1]);
      console.log('requested URL ', requestedURL);
      archive.isUrlInList(requestedURL, (foundUrl) => {
        console.log('requested URL in isURLInList callback ', requestedURL);
        if (foundUrl) {
          console.log('found it!'); 
          //res.end('foundit');
          httpHelpers.serveAssets(res, archive.paths.archivedSites + '/' + requestedURL);
        } else {
          httpHelpers.serveAssets(res, __dirname + '/public/loading.html', null);
          archive.addUrlToList(requestedURL, () => {});
        }
      });
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
