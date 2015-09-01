var ghpages = require('gh-pages')
  , path = require('path')
  , options = {};

options.logger = console.log.bind(this);

function callback(err) {
  if (err) {
    console.error('Error publishing to gh-pages', err);
  } else {
    console.log('Successfully published to gh-pages');
  }
}

ghpages.publish(path.join(__dirname, '../examples'), options, callback);
