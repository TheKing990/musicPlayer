
//<script src="/node_modules/howler"></script>
const ipc = require('electron').ipcRenderer;
const fs = require("fs");
var arr1 = new Array();


 var sound = require('howler');
 var args;

 var isPlaying =  false;

ipc.on('model-music',function(event, arg) {

  fs.readdir(arg, (err, dir) => {
  //console.log(dir);
  for(var i = 0; i < dir.length; i++) {
    var filePath = dir[i];
    arr1.push(filePath); 
  console.log(filePath)
  //console.log("here is the array " + arr1[i]);
  }

  });

  console.log("hey fuck face" + arg);
  document.getElementById('helloP').innerHTML = arg;
  console.log("here is the array " + arr1.length);


    args = arg;



})


function PlayMe() {
  if (isPlaying === false) {

    document.getElementById('playbutton').innerHTML = 'Stop';
    sound = new Howl({
      src: [args]
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


// when you click stop and play the sound should stop or play
// also the button text should change
