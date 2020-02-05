if (document.getElementById("video-btn")) {
  document.getElementById("video-btn").addEventListener("click", pausePlay);
}

const video = document.getElementById("video-container");
const btn = document.getElementById("video-btn");

// Pause and play
function pausePlay() {
  if (video.paused) {
    video.play();
    btn.innerHTML = "<span class='element-invisible'>" + "Pause" + "</span>";
    btn.classList.remove("video-btn__play");
    btn.classList.add("video-btn__pause");
  } else {
    video.pause();
    btn.innerHTML = "<span class='element-invisible'>" + "Play" + "</span>";
    btn.classList.remove("video-btn__pause");
    btn.classList.add("video-btn__play");
  }
}