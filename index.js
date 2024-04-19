let cards = document.querySelectorAll(".card");
cards.forEach(card => {

    card.addEventListener("mouseover", () => {
        card.firstElementChild.style.display = "flex";
    });

    card.addEventListener("mouseout", () => {
        card.firstElementChild.style.display = "none";
    });

    card.addEventListener("click", main);
});


let songPlaying = new Audio();
let songIndex = 0;

function playMusic(audio, pause=false) {
    songPlaying.src = audio.filePath;
    if(!pause) {
    songPlaying.play();
    playPauseBtn.src = 'assets/pause-play.svg';
    }
    document.querySelector(".audioInfo").innerHTML = audio.songName;
    document.querySelector(".audioTime").innerHTML = '00:00 / 00:00';
}

function convertSecondsToMinutesAndSeconds(seconds) {
    if(isNaN.seconds || seconds < 0) {
        return "Invalid input";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = String(minutes).padStart(2,0);
    const formattedSeconds = String(remainingSeconds).padStart(2,0);
    return `${formattedMinutes}:${formattedSeconds}`;
}

function getSongs() {
    let songsArr=[
        {songName:"Ae Dil Hai Mushkil Title Track",filePath:"/Ae Dil Hai Mushkil Title Track (From Ae Dil Hai Mushkil).mp3"},
        {songName:"Apna Bana Le",filePath:"/Apna Bana Le (From Bhediya).mp3"},
        {songName:"Ek Tarfa",filePath:"/Ek Tarfa - Reprise.mp3"},
        {songName:"Jeena Jeena",filePath:"/Jeena Jeena.mp3"},
        {songName:"Mercy",filePath:"/Mercy.mp3"},
        {songName:"Param Sundari",filePath:"/Param Sundari.mp3"}
    ]  
    return songsArr;
}

function main() {

    //Get srcs of all songs by href of all the anchor tags
    songs = getSongs();
    document.querySelector(".playbar").style.display = "block";

    playPauseBtn = document.querySelector(".playPauseBtn");
    previousBtn = document.querySelector(".previousBtn");
    nextBtn = document.querySelector(".nextBtn");

    //Store all info related to songs in cards and display them in libraray
    let songsInfo = document.querySelector(".songs");
    songs.forEach(song => {
        songsInfo.innerHTML += `<div class="songCard border p-2">
        <div class="info">
        <span class="songName">${song.songName}</span>
        <span class="songInfo">XYZ</span>
        </div>
        <img src="assets/play-pause.svg" alt="play" class="invert">
        </div>`;
    });
    
    playMusic(songs[0], true);
    songPlaying.volume = 0.1;

    //Play audio on clicking libraray songs
    let audios = document.querySelectorAll(".songCard");
    for(let i = 0 ; i < audios.length ; i++) {
        audios[i].addEventListener("click", () => {
            songIndex = i;
            playMusic(songs[i]);
        });
    }

    //Play-pause song on clicking play-pause button 
    playPauseBtn.addEventListener("click", ()=> {
        if(songPlaying.paused) {
            songPlaying.play();
            playPauseBtn.src = 'assets/pause-play.svg';
        }
        else {
            songPlaying.pause();
            playPauseBtn.src = 'assets/play-pause.svg';
        }
    });

    //Updating time and seekbar
    songPlaying.addEventListener("timeupdate", ()=> {
        if(!isNaN(songPlaying.duration)) {
            document.querySelector(".audioTime").innerHTML = `${ convertSecondsToMinutesAndSeconds(songPlaying.currentTime)} / ${convertSecondsToMinutesAndSeconds(songPlaying.duration)}`;
            document.querySelector(".circle").style.left = songPlaying.currentTime/songPlaying.duration*100 + '%';
        }
    });

    //Seeking using seekbar
    document.querySelector(".seekbar").addEventListener("click", event => {
        let percentage = (event.offsetX/event.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percentage+'%';
        songPlaying.currentTime = (songPlaying.duration * percentage) / 100;
    });

    //Play next song using nextBtn
    document.querySelector(".nextBtn").addEventListener("click", () => {
        songIndex = (songIndex+1)%songs.length;
        playMusic(songs[songIndex]);
    });

    //Play
    document.querySelector(".previousBtn").addEventListener("click", () => {
        songIndex = (songIndex+songs.length-1)%songs.length;
        playMusic(songs[songIndex]);
    });

    //Volume control
    let vol = document.querySelector("#volumeBar");
    vol.addEventListener("change", () => {
        songPlaying.volume = parseInt(vol.value)/100;
    });

}

//Hamburger function
document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector(".leftPanel").style.left = "0";
});

//Close function
document.querySelector(".cross").addEventListener("click", () => {
    document.querySelector(".leftPanel").style.left = "-100%";
});
