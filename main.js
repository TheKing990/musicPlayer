const electron = require('electron')
// Module to control application life.
const app = electron.app
const Menu = electron.Menu

const {dialog} = require('electron')
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

//const path = require('path')
const url = require('url')
var mypath = [];
var mysongs = [];
const fs = require("fs");
var Datastore = require('nedb');
var path = require('path')

var Datastore = require('nedb');
var dbpath = new Datastore({ filename: __dirname + '/to/paths.db', autoload: true });
var songs = new Datastore({ filename: __dirname + '/to/songs.db', autoload: true });

var template = [
   {},
   {
     label: 'Select Music',
     submenu: [
       {
         label:'Select Folder',
         accelerator:'CommandOrControl+O',
         click:function(){
           openThing();
         }
       }
     ]// select musinc submenu
   }, // select music
   {
     label: 'Play Music',
     submenu: [
       {
         label:'Play',
         accelerator:'CommandOrControl+p',
         click:function(){
           console.log('You play the song');
         }
       }
     ]
   },
   {
     label: 'Pause Music',
     submenu: [
       {
         label:'Pause',
         accelerator:'CommandOrControl+s',
         click:function(){
           console.log('You Stop the music');
         }
       }
     ]
   },
   {
     label: 'Next',
     submenu: [
       {
         label:'Next Song',
         accelerator:'CommandOrControl+n',
         click:function(){
           console.log('You skip the song');
         }
       }
     ]
   },
   {
     label: 'Previous',
     submenu: [
       {
         label:'Prev',
         accelerator:'CommandOrControl+b',
         click:function(){
           console.log('You play the previous song');
         }
       }
     ]
   }
 ];


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 900, height: 800})




  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))


  // var menu = Menu.buildFromTemplate(menuTemplate);
  // mainWindow.setMenu(menu);

  // Open the DevTools.
   mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}





// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('ready', function () {
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

//   dbpath.remove({}, { multi: true }, function (err, numRemoved) {
// });
//
//   songs.remove({}, { multi: true }, function (err, numRemoved) {
// });


})

app.on('ready', () => {
  mainWindow.webContents.on('did-finish-load', () => {
    loadCurrentLibary();
  })
})



app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})


function openThing() {

  //'openDirectory', 'multiSelections'
dialog.showOpenDialog({properties: ['openDirectory']} ,
function (filepath) {
  console.log(filepath[0]);
  //mypath = filepath;

  //open a libary
  dbpath.findOne({ path: filepath[0] }, function(err, doc) {

    //check if db for the libary
    //console.log('Found user:', doc.name);
    if (err) {
      console.log("there is an error opeing libary");
    }
    else {

        if (doc == null) {
            //changin the current one to false;
            dbpath.update({current: true}, {$set: {current: false}}, {multi: true}, function (err, numReplaced) {
                // numReplaced = 3
                // Field 'system' on Mars, Earth, Jupiter now has value 'solar system'
            });

            var currentPath = {
                path: filepath[0],
                current: true
            }
            mypath.push(currentPath);


            dbpath.insert(mypath, function (err, docs) {

            });
            var arr1 = fs.readdirSync(filepath[0]);

            for (var i = 0; i < arr1.length; i++) {
                var arrSongs = {
                    path: filepath[0],
                    songpath: filepath[0] + "/" + arr1[i],
                    count: 0,
                    name: "Unknow",
                    artist: "Unknow",
                    Album: "Unknow"
                }
                mysongs.push(arrSongs);
                console.log(arrSongs);
            }
            songs.insert(mysongs, function (err, docs) {

            });

            songs.find({path: filepath[0]}, function (err, docs) {
                // docs is an array containing documents Mars, Earth, Jupiter
                // If no document is found, docs is equal to []
                if (err) {
                    console.log("there is an error finding song array");
                }
                else {
                  if (docs == null) {
                    console.log("there is something wrong!");

                  } else {
                    console.log(docs);
                    console.log("bitch");

                    mainWindow.webContents.send('model-music', docs);
                  }
                }


            });


        }
        else {
            //we had current path in db


            songs.find({path: filepath[0]}, function (err, docs) {
                // docs is an array containing documents Mars, Earth, Jupiter
                // If no document is found, docs is equal to []
                if (err) {
                    console.log("there is an error finding song array");
                }
                else {

                  if (docs == null) {
                    console.log("there is something wrong!");

                  } else {
                    console.log(docs);
                    console.log("what sup");

                    mainWindow.webContents.send('model-music', docs);
                  }
                }


            });
        }
    }
});


  ///mainWindow.webContents.send('model-music',filepath[0]);

});
}




function loadCurrentLibary()
{

  dbpath.findOne({ current: true }, function(err, doc)
  {

    if(err) {
      console.log("There is a error loading the libary");
    }
    else
    {

      if (doc == null)
       {
        console.log("path db is empty");
      } else
      {
        console.log('Found current path:' +  doc.path);

        //load songs current of the path and send it
        songs.find({path: doc.path}, function (err, docs) {
          console.log("ther is the doc.path" + doc.path);
            // docs is an array containing documents Mars, Earth, Jupiter
            // If no document is found, docs is equal to []
            if (err) {
                console.log("there is an error finding song array");
            }
            else {

              if (docs == null) {
                console.log("there is something wrong!");

              } else {
                console.log(docs);
                console.log("notsup");

                mainWindow.webContents.send('model-music', docs);
              }
            }


        });
    }


  }


});

}
