
var request = require('request');

var m = require('./config.js');



request('https://www.reddit.com/r/music.json', function (error, response, body) {
  var obj = JSON.parse(body);
  console.log(obj);
  let list = '<ul class="list-group">';
  var add;
  for (var i = 0; i < 20; i++) {
  //  var myspan = '<span style="visibility: hidden">' + i +'</span';
      if (obj.data.children[i].data.link_flair_text == 'music streaming' || 'video') {
        var lik = String(obj.data.children[i].data.url);

          $("#mylistgroup").append('<li class="list-group-item"><button type="button" class="btn btn-default navbar-btn" onclick = "PlayYouTube()"><span id="playbutton"class="glyphicon glyphicon-play" aria-hidden="true"></span></button>   ' + obj.data.children[i].data.title + '<span id=span_reddit style="visibility: hidden">' + i +'</span>' +'</li>');
          console.log('<li class="list-group-item"><button type="button" class="btn btn-default navbar-btn" onclick = "PlayYouTube(' + obj.data.children[i].data.url + ')"><span id="playbutton"class="glyphicon glyphicon-play" aria-hidden="true"></span></button>   ' + obj.data.children[i].data.title + '</li>');
        }

      }
})





function PlayYouTube() {
  $('ul li').click(function(){ console.log($(this).index());
  });


}
