var sound = require('howler');


function PlayMe(num, arg) {


  sound = new Howl({
    src: [arg[num].songpath]
  });
  sound.play();


}
