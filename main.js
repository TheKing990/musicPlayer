const electron = require('electron')
// Module to control application life.
const app = electron.app
const Menu = electron.Menu
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')


var template = [
   {},
   {
     label: 'Select Music',
     submenu: [
       {
         label:'Select Folder',
         accelerator:'CommandOrControl+O',
         click:function(){
           console.log('click select');
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
  mainWindow = new BrowserWindow({width: 800, height: 600})




  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))


  // var menu = Menu.buildFromTemplate(menuTemplate);
  // mainWindow.setMenu(menu);

  // Open the DevTools.
   //mainWindow.webContents.openDevTools()

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
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
