
//<script src="/node_modules/howler"></script>
const ipc = require('electron').ipcRenderer;


 var sound = require('howler');
 var args;
ipc.on('model-music',function(event, arg) {
  console.log("hey fuck face" + arg);
  document.getElementById('helloP').innerHTML = arg;

    args = arg;


})

function PlayMe() {
  sound = new Howl({
    src: [args]
  });
    sound.play();
}
