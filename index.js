const electron = require("electron");
const remote = electron.remote;
const ipc = electron.ipcRenderer;

var videos = [];

document.getElementById('minimize-button').addEventListener('click', () => {
    remote.getCurrentWindow().minimize();
});

document.getElementById('maximize-button').addEventListener('click', () => {
    const currentWindow = remote.getCurrentWindow();
    if (currentWindow.isMaximized()) {
        currentWindow.unmaximize();
    } else {
        currentWindow.maximize();
    }
});

document.getElementById('close-button').addEventListener('click', () => {
    remote.app.quit();
});

ipc.on('opened-file', function(event, arg){
    console.log(arg);
})

function getVideos() {
    ipc.send('get-videos');
}

function runFile(filepath) {
    ipc.send('run-file', filepath);
}

ipc.on('videos-received', function(event, arg) {
    videos = arg;
    videos.sort();

    for (i = 0; i < videos.length; i++) {
        thumb = "./thumbs/" + videos[i][0] + ".jpg";
        
        document.getElementById('videos').innerHTML +=  
            "<div class='video-box' onclick='runFile(\"" + videos[i][1] + "\")\' style=\"background-image: url(\'./images/TheaterPlaceholder.png\');\" >"
                + "<div class='video-thumb' style=\"background-image: url(\'" + thumb + "\');\">"
            + "</div>"
            + videos[i][0] + "</div>";
    }

    document.getElementById('videos').innerHTML += "<br>";
})

getVideos();