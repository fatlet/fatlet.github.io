window.onload = initPlayer;

const musicPlayList = [
  {
    name: "Lost in the City Lights",
    author: "Cosmo Sheldrake",
    cover: "./images/cover-1.png",
    source: "./assets/lost-in-city-lights-145038.mp3",
  },
  {
    name: "Forest Lullaby",
    author: "Lesfm",
    cover: "./images/cover-2.png",
    source: "./assets/forest-lullaby-110624.mp3",
  },
];

let musicIndex = 0;
let audio = null;
let isPlay = false;

function initPlayer() {
  console.log("initPlayer");

  setAudioInfo();

  document.getElementById("play").addEventListener("click", function () {
    audio.play();
    // TODO show pause icon
  });

  document.getElementById("prev").addEventListener("click", function () {
    isPlay = true;
    musicIndex = musicIndex - 1;
    if (musicIndex < 0) musicIndex = 0;
    setAudioInfo();
  });

  document.getElementById("next").addEventListener("click", function () {
    console.log("next");
    isPlay = true;
    musicIndex = musicIndex + 1;
    if (musicIndex > musicPlayList.length - 1) musicIndex = 0;
    setAudioInfo();
  });

  document.getElementById("bar").addEventListener("click", function (e) {
    const percent = ((e.offsetX / e.target.clientWidth) * 100).toFixed(2);
    console.log(Number((audio.duration * percent * 0.01).toFixed(0)));
    audio.currentTime = Number((audio.duration * percent * 0.01).toFixed(0));
    if (isPlay) {
      audio.play();
      // TODO show pause icon
    }
  });
}

function setAudioInfo() {
  const { name, author, cover, source } = musicPlayList[musicIndex];

  audio = new Audio(source);
  audio.addEventListener("canplay", function () {
    if (isPlay) {
      audio.play();
      // TODO show pause icon
    }
    const duration = sec2time(audio.duration);

    document.getElementsByClassName(
      "cover",
    )[0].style.backgroundImage = `url('${cover}')`;

    document.getElementsByClassName("name")[0].innerText = name;
    document.getElementsByClassName("author")[0].innerText = author;
    document.getElementsByClassName("time")[1].innerHTML = duration;

    audio.addEventListener("timeupdate", function () {
      const currentTime = sec2time(audio.currentTime);
      if (currentTime != document.getElementsByClassName("time")[0].innerHTML) {
        document.getElementsByClassName("time")[0].innerHTML = currentTime;
        const percent =
          Math.ceil((audio.currentTime / audio.duration) * 100) + "%";
        document.getElementById("bar").style.setProperty("--width", percent);
      }
    });
  });
}

function sec2time(oriDuration) {
  const durationMM = Math.floor(oriDuration / 60);
  const durationSS = Number((oriDuration - durationMM * 60).toFixed(0));
  const duration = `${durationMM < 10 ? "0" + durationMM : durationMM}:${
    durationSS < 10 ? "0" + durationSS : durationSS
  }`;

  return duration;
}
