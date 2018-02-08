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
  fs.readFile(exports.paths.list, 'utf-8',function(err, data) {
    console.log(typeof data);
    console.log(data); // data is a buffer, we need to deal with this somehow
    var dataArr = data.split('\n');
    callback1(dataArr);
  });
};

exports.isUrlInList = function(url, callback2) {
  exports.readListOfUrls((urlArr) => {
    console.log('url list ', urlArr);
    var urlIsInList = urlArr.indexOf(url);
    console.log('index ', url, ' found at ', urlIsInList);
    urlIsInList >= 0 ? urlIsInList = true : urlIsInList = false; 
    callback2(urlIsInList);
  });   
};

exports.addUrlToList = function(url, callback3) {
  // write url to the list;
  fs.appendFile(exports.paths.list, `${url}\n`, 'utf-8', (err) => {
    if (err) { throw err; }
    console.log('added ', url, ' to archive list');
    callback3 ? callback3() : null; 
  });
};

exports.isUrlArchived = function(url, callback4) {
  // check url against contents of archive
  fs.stats(exports.paths.archivedSites + '/' + url, (err, stats) => {
    if (err) {
      throw err;
    }
    //callback(boolean isInArchive) 
    callback4(stats.isFile());
  });
  

};

exports.downloadUrls = function(url) {
  //get html from url
  
  var file = fs.createWriteStream(exports.paths.archivedSites + '/' + url);
  var request = http.get(url, function(response) {
    response.pipe(file);
  });
  
  /*
  
  http.get(url, function(html) {
    fs.writeFile(exports.paths.archivedSites + '/' + url, html, (err) => {
      if (err) { throw err; }
    });
  })
  //write to file*/
};

exports.makeValidUrl = function(url) {
  //if no http, add
  //if no www, add
  if (!url.match('^https?:\/\/www\.')) {
    //if it doesn't start with http(s)://www.
    //if it starts with only www, replace with http(s)://www.
    if (url.match('^www\.')) {
      url.replace('^www\.', 'https:\/\/www.');
    } else if (url.match('^http')) {
    //if it starts with only https://, replace with http(s)://www.
      url.replace('^https?:\/\/', 'https:\/\/www.');
    } else {
    //if it does not start with http at this point, it has neither, add http(s)://www.
      url = 'https:\/\/www.' + url;
    }
  }
  return url;

};



