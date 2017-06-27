
//<script src="/node_modules/howler"></script>
const ipc = require('electron').ipcRenderer;


 var sound = require('howler');
 var args;

 var isPlaying =  false;

ipc.on('model-music',function(event, arg) {
  console.log("hey fuck face" + arg);
  document.getElementById('helloP').innerHTML = arg;

    args = arg;


})

function PlayMe() {
  document.getElementById('playbutton').innerHTML = 'Stop';
  sound = new Howl({
    src: [args]
  });


// when you click stop and play the sound should stop or play
// also the button text should change

  if (isPlaying === false) {

    sound.play();
    isPlaying = true;
  }
  else{

    isPlaying = false;
      document.getElementById('playbutton').innerHTML = 'Play';
      sound.stop(args);
  }

}
