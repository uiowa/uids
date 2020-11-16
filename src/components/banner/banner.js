const banners = document.querySelectorAll('.banner');
const banner_link = ['.bold-headline a', 'a.bttn'];
Array.prototype.forEach.call(banners, banner => {
  let up, down, link, i;
  // Loop through options and break on the first match.
  for (i = 0; i < banner_link.length; i++) {
    if (link = banner.querySelector(banner_link[i])) {
      break;
    }
  }

  // If we have a match, attach behaviors.
  if (link) {
    banner.style.cursor = 'pointer';
    banner.onmousedown = () => down = +new Date();
    banner.onmouseup = () => {
      up = +new Date();
      // Trigger click event if the duration is short enough.
      if ((up - down) < 200) {
        link.click();
      }
    }
  }
});




// Banner Video cut straight from hero, needs refactoring for multiple banner instances.
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
