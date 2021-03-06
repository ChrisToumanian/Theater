// Modules to control application life and create native browser window
//const {app, dialog, BrowserWindow} = require('electron');
const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const app = electron.app;
const dialog = electron.dialog;
const ipc = electron.ipcMain;
const path = require('path');
const fs = require('fs');
const open = require('open');

// Variables
var videoDirectory = "";
var videoFileFormats = [".mov", ".avi", ".mkv", ".mp2", ".wmv", ".mp4", ".mpg", ".ogg", ".m4v"];
var videos = [];
var video = {
    "name" : "",
    "filepath" : ""
};

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1201,
    height: 900,
    frame: false,
    icon: __dirname + './images/theater.ico',
    webPreferences: {
        nodeIntegration: true,
        preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  // Hide menubar
  mainWindow.setMenu(null)
  mainWindow.setAutoHideMenuBar(true)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// open error dialog
ipc.on('open-error-dialog', function(event, message){
    dialog.showErrorBox('Error', message);
});

// read settings
function readSettings()
{
    var fs = require('fs');

    fs.readFile('settings.txt', 'utf8', function(err, data) {
        if (err) throw err;
        console.log(data);
        videoDirectory = data;
    });
}
readSettings();

// open file
ipc.on('openFile', function(event){
    // opens file dialogue looking for markdown
    const files = dialog.showOpenDialogSync(mainWindow, {
        properties: ['openFile'],
        filters: [{name: 'Markdown', extensions: ['md']}]
    });

    // if no files
    if (!files) return;

    // read file
    const file = files[0];
    const fileContent = fs.readFileSync(file).toString();
    //console.log(fileContent);

    event.sender.send('opened-file', fileContent);
});

function addFileToVideosList(filepath)
{
    filepath = filepath.replace(/\\/g, '/');
    for (i = 0; i < videoFileFormats.length; i++) {
        if (filepath.endsWith(videoFileFormats[i])) {
            //videos.push(filepath);
            var slash = filepath.lastIndexOf('/') + 1;
            name = filepath.substr(slash, filepath.length - slash);
            name = name.substr(0, name.lastIndexOf('.'));
            videos.push([name, filepath]);
        }
    }
}

function searchVideoDirectory(dir) {
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
            addFileToVideosList(fullPath);
            searchVideoDirectory(fullPath);
        } else {
            addFileToVideosList(fullPath);
        }  
    });
}

ipc.on('get-videos', function(event) {
    searchVideoDirectory(videoDirectory);
    event.sender.send('videos-received', videos);
});

ipc.on('run-file', function(event, filepath) {
    command = "\"\"" + filepath + "\"\"";
    // requires "npm install open"
    (async () => {
        await open(command);
    })();
});