
//<script src="/node_modules/howler"></script>
const ipc = require('electron').ipcRenderer;
const fs = require("fs");
var sound = require('howler');
var isPlaying =  false;

 ipc.on('model-music',function(event, arg)
{
  songUI(arg);


  for (var i = 0; i < arr1.length; i++) {
    console.log(arr1[i]);
  }
//  LoadSongMusic();
console.log(arg[0].songpath);

 sound = new Howl({
  src: [arg[0].songpath]
 });
 sound.play();
return arg;

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

function songUI(arg) {


    for (var i = 0; i < arg.length; i++) {
      const table =  document.createElement('tr');


      let newName = document.createElement('td');
      newName.innerHTML = arg[i].name;
      table.appendChild(newName);

      let newArtist = document.createElement('td');
      newArtist.innerHTML = arg[i].artist;
      table.appendChild(newArtist);

      let newAlbum = document.createElement('td');
      newAlbum.innerHTML = arg[i].Album;
      table.appendChild(newAlbum);

      let newCount = document.createElement('td');
      newCount.innerHTML = String(arg[i].name);
      table.appendChild(newCount);

      document.getElementById('mytable').appendChild(table); //tr
    }

}

// when you click stop and play the sound should stop or play
// also the button text should change
