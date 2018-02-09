var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');
var https = require('https');
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
    console.log('urls in readlist of urls: ', dataArr);
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
  fs.stat(exports.paths.archivedSites + '/' + url, (err, stats) => {
    if (err) {
      //throw err;
    }
    //callback(boolean isInArchive) 
    callback4(!!stats, url);
  });
  

};

exports.downloadUrls = function(url) {
  //get html from url
  console.log('url in downloadUrls: ', url);
  var file = fs.createWriteStream(exports.paths.archivedSites + '/' + url);
  var validUrl = exports.unEscapeURL(url);
  //validUrl = makeValidUrl(validUrl);
  console.log('unescaped url: ', validUrl);
  var request = https.get(validUrl, function(response) {
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

exports.makeValidURL = function(url) {
  //if no http, add
  //if no www, add
  url = exports.unEscapeURL(url);
  
  if (!url.match('^https?:\/\/www\.')) {
    //if it doesn't start with http(s)://www.
    //console.log('one');
    //if it starts with only www, replace with http(s)://www.
    if (url.match('^www\.')) {
      //console.log('twoA');
      url = url.replace(/^www\./, 'https:\/\/www.');
    } else if (url.match('^http')) {
      //console.log('twoB');
    //if it starts with only https://, replace with http(s)://www.
      url = url.replace(/^https?:\/\//, 'https:\/\/www.');
    } else {
      //console.log('three');
    //if it does not start with http at this point, it has neither, add http(s)://www.
      url =  'https:\/\/www.' + url;
    }
  }
  
  url = exports.escapeURL(url);
  
  return url;

};

exports.unEscapeURL = function(url) {
  //put in / instead of %2
  console.log('unEscaping ', url);
  if (url.match('\%2')) {
    return url.replace(/\%2/g, '\/');
  }
  return url;
};


exports.escapeURL = function(url) {
  //put in %2 instead of /
  if (url.match('\/')) {
    return url.replace(/\//g, '\%2'); 
  }
  return url;
};




