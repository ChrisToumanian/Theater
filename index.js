const electron = require("electron");
const ipc = electron.ipcRenderer;

var videos = [];

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

    for (i = 0; i < videos.length; i++) {

        var slash = videos[i].lastIndexOf('/') + 1;
        name = videos[i].substr(slash, videos[i].length - slash);
        name = name.substr(0, name.lastIndexOf('.'));

        thumb = "./thumbs/" + name + ".jpg";
        
        document.getElementById('videos').innerHTML +=  
            "<div class='video-box' onclick='runFile(\"" + videos[i] + "\")\' style=\"background-image: url(\'./images/TheaterPlaceholder.png\');\" >"
                + "<div class='video-thumb' style=\"background-image: url(\'" + thumb + "\');\">"
            + "</div>"
            + name + "</div>";
    }
})

getVideos();