const electron = require("electron");
const ipc = electron.ipcRenderer;

var videos = [];

const testBtn = document.getElementById('testBtn');
testBtn.addEventListener('click', function(){
    ipc.send('openFile');
    ipc.send('open-error-dialog', 'Renderer asked main dialogue to open an error message');
})

ipc.on('opened-file', function(event, arg){
    console.log(arg);
})

function getVideos() {
    document.getElementById('videos').innerHTML = "Videos will go here.";
}

function displayVideos() {

    for (i = 0; i < videos.length; i++) {
        thumb = "/thumbs/" + videos[i].name + ".jpg";
        document.getElementById('videos').innerHTML +=  
            "<div class='video-box' onclick='vlc(\"play\", \"" + videos[i].filename + "\")\'>"
                + "<div class='video-thumb' style=\"background-image: url(\'" + thumb + "\');\">"
            + "</div>"
            + videos[i].name + "</div>";
    }

}

getVideos();