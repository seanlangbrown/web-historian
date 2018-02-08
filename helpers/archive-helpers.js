var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback1) {
  fs.readFile(exports.paths.list, function(err, data) {
    console.log(typeof data);
    console.log(data); // data is a buffer, we need to deal with this somehow
    var dataArr = data.split('\n');
    callback1(dataArr);
  });
};

exports.isUrlInList = function(url, callback2) {
  exports.readListOfUrls((urlArr) => {
    var urlIsInList = urlArr.indexOf(url);
    urlIsInList >= 0 ? urlIsInList = true : urlIsInList = false; 
    callback2(urlIsInList);
  });   
};

exports.addUrlToList = function(url, callback3) {
  // write url to the list;
  fs.appendFile(exports.paths.list, `${url}\n`, 'utf8', (err) => {
    if (err) { throw err; }
    callback3 ? callback3() : null; 
  });
};

exports.isUrlArchived = function(url, callback4) {
  // 
};

exports.downloadUrls = function(urls) {
  
};






