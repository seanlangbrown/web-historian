// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
archive = require('../helpers/archive-helpers.js');

archive.readListOfUrls(function(urls) {
  console.log('urls in readListOfUrls callback: ', urls);
  for (var i = 0; i < urls.length; i++) {
    archive.isUrlArchived(urls[i], (isArchived, url) => {
      console.log('url in isArchived: ', url);
      if (!isArchived) {
        archive.downloadUrls(url);
        console.log('downloading: ', url);
      }
    });
  }
  
  
});