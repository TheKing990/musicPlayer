
//<script src="/node_modules/howler"></script>
//<link href="./node_modules/clusterize.js/clusterize.css" rel="stylesheet">

const ipc = require('electron').ipcRenderer;
const fs = require("fs");
// var sound = require('howler');
var isPlaying =  false;
var   arr1 ;
var Clusterize = require('clusterize.js');
//window.$ = window.jQuery = require('jquery');

 ipc.on('model-music',function(event, arg)
{
  //songUI(arg);
  loadUI(arg);

 // sound = new Howl({
 //  src: [arg[0].songpath]
 // });
 // sound.play();



});
//console.log(arr1);


function loadUI(array) {
  let data = [];
  let tr = ' ';
  let td = ' ';
  let item = ' ';
  let string_td = ' ';
  for (var i = 0; i < array.length; i++) {
    td = "<td><button id=\"currentplay\"><span class=\"glyphicon glyphicon-play\" aria-hidden=\"true\"></span></button></td>";
    string_td += td;

    item = array[i].name;
    td = "<td>" + item + "</td>";
    string_td += td;

    item = array[i].artist;
    td = "<td>" + item + "</td>";
    string_td += td;

    item = array[i].Album;
    td = "<td>" + item + "</td>";
    string_td += td;

    item = String(array[i].count);
    td = "<td>" + item + "</td>";
    string_td += td;

    tr = "<tr>" + string_td + "</tr>";
    data.push(tr);
    string_td = ' ';
  }
  console.log(data);


  let clusterize = new Clusterize({
    rows: data,
    scrollId: 'scrollArea',
    contentId: 'contentArea'
  });

// document.getElementById('contentArea').onclick = function(e) {
//   e = e || event;
//   var target = e.target || e.srcElement;
//   if(target.nodeName != 'TR') return;
//   console.log("this row index is " + e.rowIndex);
//   // do stuff with row
//   PlayMe();
// }




  function songUI(arg) {


    for (var i = 0; i < arg.length; i++) {
      const table = document.createElement('tr');
      //  table.addEventListener("click", (function(){ alert(this.rowIndex); }));


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
      newCount.innerHTML = String(arg[i].count);
      table.appendChild(newCount);

      document.getElementById('mytable').appendChild(table); //tr
    }

  }
}



// when you click stop and play the sound should stop or play
// also the button text should change
