
var request = require('request');

var m = require('./config.js');



request('https://www.reddit.com/r/music.json', function (error, response, body) {
  var obj = JSON.parse(body);
  console.log(obj);
  console.log(obj.data.children[10].data.title);
  console.log(obj.data.children[10].data.link_flair_text);
  console.log(obj.data.children[10].data.permalink);
  console.log(obj.data.children[10].data.author);
  console.log(obj.data.children[10].data.url);

});
