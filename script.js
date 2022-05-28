let songindex = 0
let audioelement = new Audio('/resources/songs/1.mp3')
let masterplay = document.getElementById('masterplay');
let myprogressbar = document.getElementById('range');
let currsong = document.getElementById('currsong');
let songitem = Array.from(document.getElementsByClassName('songitem'))
let gif = document.getElementById('gif');
let mysongs = [
    { songname: "As It Was", filepath: "/resources/songs/1.mp3", coverpath: "/resources/covers/1.jpeg", duration: "2:46" },
    { songname: "Day Light", filepath: "/resources/songs/1.mp3", coverpath: "/resources/covers/1.jpeg", duration: "2:45" },
    { songname: "Little Freak", filepath: "/resources/songs/1.mp3", coverpath: "/resources/covers/1.jpeg", duration: "3:22" },
    { songname: "Matilda", filepath: "/resources/songs/1.mp3", coverpath: "/resources/covers/1.jpeg", duration: "4:06" },
    { songname: "Cinema", filepath: "/resources/songs/1.mp3", coverpath: "/resources/covers/1.jpeg", duration: "4:04" },
    { songname: "Daydreaming", filepath: "/resources/songs/1.mp3", coverpath: "/resources/covers/1.jpeg", duration: "3:08" },
    { songname: "Keep Driving", filepath: "/resources/songs/1.mp3", coverpath: "/resources/covers/1.jpeg", duration: "2:21" },
    { songname: "Sattelite", filepath: "/resources/songs/1.mp3", coverpath: "/resources/covers/1.jpeg", duration: "3:39" },
    { songname: "Boyfriends", filepath: "/resources/songs/1.mp3", coverpath: "/resources/covers/1.jpeg", duration: "3:15" },
    { songname: "Love Of My Life", filepath: "/resources/songs/1.mp3", coverpath: "/resources/covers/1.jpeg", duration: "3:12" }
]
songitem.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = mysongs[i].coverpath;
    element.getElementsByClassName("songname")[0].innerText = mysongs[i].songname;
    element.getElementsByClassName("time")[0].innerText = mysongs[i].duration + " ";

});
masterplay.addEventListener('click', () => {
    if (audioelement.paused || audioelement.currentTime <= 0) {
        audioelement.play();
        masterplay.classList.remove('fa-play');
        masterplay.classList.add('fa-pause');
        gif.style.opacity = 1;
        currsong.innerText = mysongs[songindex].songname;
    }
    else {
        audioelement.pause();
        masterplay.classList.add('fa-play');
        masterplay.classList.remove('fa-pause');
        gif.style.opacity = 0;
    }
})
audioelement.addEventListener('timeupdate', () => {
    progress = parseInt((audioelement.currentTime / audioelement.duration) * 100)
    myprogressbar.value = progress;
})
myprogressbar.addEventListener('change', () => {
    audioelement.currentTime = (myprogressbar.value * audioelement.duration) / 100;
})
const makeallplays = () => {
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}
Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeallplays();
        gif.style.opacity = 1;
        currsong.innerText = mysongs[songindex].songname;
        songindex = parseInt(e.target.id);
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        audioelement.src = `/resources/songs/${songindex + 1}.mp3`
        audioelement.currentTime = 0;
        audioelement.play();
        masterplay.classList.remove('fa-play');
        masterplay.classList.add('fa-pause');
    })
})
document.getElementById('next').addEventListener('click', () => {
    if (songindex === 9) {
        songindex = 0;
    }
    else {
        songindex += 1;
    }
    makeallplays();
    currsong.innerText = mysongs[songindex].songname;
    audioelement.src = `/resources/songs/${songindex + 1}.mp3`
    audioelement.currentTime = 0;
    audioelement.play();
    masterplay.classList.remove('fa-play');
    masterplay.classList.add('fa-pause');
})
document.getElementById('previous').addEventListener('click', () => {
    if (songindex === 0) {
        songindex = 9;
    }
    else {
        songindex -= 1;
    }
    makeallplays();
    currsong.innerText = mysongs[songindex].songname;
    audioelement.src = `/resources/songs/${songindex + 1}.mp3`
    audioelement.currentTime = 0;
    audioelement.play();
    masterplay.classList.remove('fa-play');
    masterplay.classList.add('fa-pause');
})