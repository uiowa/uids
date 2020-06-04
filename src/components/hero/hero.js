const video = document.getElementById("video-container");
const btn = document.getElementById("video-btn");
const motionQuery = matchMedia('(prefers-reduced-motion)');

function reducedMotionCheck() {
  if (motionQuery.matches) {
    video.pause();
    btn.innerHTML = "<span class='element-invisible'>" + "Play" + "</span>";
    btn.classList.remove("video-btn__pause");
    btn.classList.add("video-btn__play");
    btn.setAttribute("aria-label", "Play");
  }
}
reducedMotionCheck();
motionQuery.addListener(reducedMotionCheck);

if (document.getElementById("video-btn")) {
  document.getElementById("video-btn").addEventListener("click", pausePlay);
}

// Pause and play
function pausePlay() {
  if (video.paused) {
    video.play();
    btn.innerHTML = "<span class='element-invisible'>" + "Pause" + "</span>";
    btn.classList.remove("video-btn__play");
    btn.classList.add("video-btn__pause");
    btn.setAttribute("aria-label", "Pause");
  } else {
    video.pause();
    btn.innerHTML = "<span class='element-invisible'>" + "Play" + "</span>";
    btn.classList.remove("video-btn__pause");
    btn.classList.add("video-btn__play");
    btn.setAttribute("aria-label", "Play");
  }
}
