// main.js
const ipc = electron.ipcMain;

ipc.on('open-error-dialog', function(event, message){
    dialog.showErrorBox('An error message', 'Demo of an error message');
    event.sender.send('opened-error-dialog', message);
});

// index.html
<script src="index.js"></script>

// index.js
const electron = require("electron");
const ipc = electron.ipcRenderer;

const testBtn = document.getElementById('testBtn');
testBtn.addEventListener('click', function(){
    ipc.send('open-error-dialog', 'Renderer asked main dialogue to open an error message');
})

ipc.on('opened-error-dialog', function(event, arg){
    console.log(arg);
})