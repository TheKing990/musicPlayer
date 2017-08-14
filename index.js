
//<script src="/node_modules/howler"></script>
const ipc = require('electron').ipcRenderer;
const fs = require("fs");
var sound = require('howler');
var arr1 = new Array();

var args;

var isPlaying =  false;

ipc.on('model-music',function(event, arg)
{
  arr1 = arg;
  for (var i = 0; i < arr1.length; i++) {
    console.log(arr1[i]);
  }
//  LoadSongMusic();
console.log(arg[0].songpath);

 sound = new Howl({
  src: [arg[0].songpath]
 });
 sound.play();


});


function PlayMe() {
  if (isPlaying === false) {

    document.getElementById('playbutton').innerHTML = 'Stop';
    sound = new Howl({
      src: [arr1[1].songpath]
    });



      sound.play();
      isPlaying = true;
  }
  else {
    document.getElementById('playbutton').innerHTML = 'Play';
    isPlaying = false;
    sound.stop();

  }


}
function LoadSongMusic (){
  console.log("HEEEeeeeeeeey");








  for (var i = 0; i < arr1.length; i++) {
    const name = document.getElementById('select_Name_id');
    const artist = document.getElementById('select_Artist_id');
    const album = document.getElementById('select_Album_id');
    const count = document.getElementById('select_Count_id');

      let newName = document.createElement('td');
      let newArtist = document.createElement('td');
      let newAlbum = document.createElement('td');
      let newCount = document.createElement('td');

    newName.innerHTML = arr1[i].name;
    newArtist.innerHTML = arr1[i].artist;
    newAlbum.innerHTML = arr1[i].Album;
    newCount.innerHTML = String(arr1[i].count);
    name.appendChild(newName);
    artist.appendChild(newArtist);
    count.appendChild(newCount);

     document.getElementById('select_Name_id').appendChild(newName);
   document.getElementById('select_Artist_id').appendChild(newArtist);
     document.getElementById('select_Album_id').appendChild(newAlbum);
    document.getElementById('select_Count_id').appendChild(newCount);

    console.log("there is that is going on " + arr1);
  }


}

function shit1(){
  var shit =  document.getElementsByClassName('createShit');

}

// when you click stop and play the sound should stop or play
// also the button text should change
