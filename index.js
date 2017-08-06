
//<script src="/node_modules/howler"></script>
const ipc = require('electron').ipcRenderer;
const fs = require("fs");
var sound = require('howler');
var arr1 = new Array();

var args;

var isPlaying =  false;

ipc.on('model-music',function(event, arg)
{
console.log(arg[0].songpath);

 sound = new Howl({
  src: [arg[0].songpath]
 });
 sound.play();



  //sound.play();

/*
  arr1 = fs.readdirSync(arg);
  for (var i = 0; i < arr1.length; i++) {

   arr1[i] = arg + "/" + arr1[i];
  }


  document.getElementById('helloP').innerHTML = arg;

  console.log("here is the array " + arr1.length);

  for (var i = 0; i < arr1.length; i++)
  {
    console.log(arr1[i]);
  }


    args = arg;
    */



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


// when you click stop and play the sound should stop or play
// also the button text should change
