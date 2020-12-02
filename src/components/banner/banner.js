const banners = document.querySelectorAll('.banner');
const banner_link = ['.bold-headline a', '.banner-content>a.bttn'];

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
    banner.onmouseup = (e) => {
      // If the user is clicking on the pause/play button of a video BG element...
      // Do not send an event to trigger a click on the banner link.
      if(banner.querySelectorAll('.video-controls').length > 0) {
        if (isEventInElement(e, banner.querySelector('.video-controls'))) {
          return false;
        }
      }

      // Trigger click event if the duration is short enough.
      up = +new Date();
      if ((up - down) < 200) {
        link.click();
      }
    }
  }
});

// Check if the user prefers reduced motion.
const motionQuery = matchMedia('(prefers-reduced-motion)');

// Construct an array of all banner videos.
let banner_videos = [];
banners.forEach(function(item, index) {
  let banner_video_element = item.querySelector('video');
  if (banner_video_element) {
    banner_videos.push(banner_video_element);
  }
});

// For each banner video...
if (banner_videos[0] != null) {
  banner_videos.forEach(function(item, index){
    // Give each video an id so that we can index them individually later.
    // As well, no two elements should have the same ID, so assigning them like this ensures that is the case.
    let video = item;
    video.id = video.id + '-' + index;

    // Give each video button an id so that we can index them individually later.
    // As well, no two elements should have the same ID, so assigning them like this ensures that is the case.
    let video_btn = item.closest('.banner').querySelector('.video-controls .video-btn');
    video_btn.id = video_btn.id + '-' + index;

    // Do a reduced motion check, and attach a listener to do on every time it changes.
    reducedMotionCheck(video, video_btn);
    motionQuery.addListener(function() {reducedMotionCheck(video, video_btn)});

    // Add an event listener to the button of this banner video to toggle pause/play on the video.
    video_btn.addEventListener("click", function(e) {
      pausePlay(video, video_btn);
    });
  });
}

// This function pauses the video if the user prefers reduced motion.
function reducedMotionCheck(video, btn) {
  if (motionQuery.matches) {
    // Pause the video.
    video.pause();
    // When the video is paused, offer the user the option to play.
    setButtonDataPlay(btn);
  }
}

// This function toggles pause and play on a specific banner video.
function pausePlay(video, btn) {
  if (video.paused) {
    // Play the video.
    video.play();
    // When the video is playing, offer the user the option to pause.
    setButtonDataPaused(btn);
  } else {
    // Pause the video.
    video.pause();
    // When the video is paused, offer the user the option to play.
    setButtonDataPlay(btn);
  }
}

// This function sets the button to show a 'Pause' Icon.
function setButtonDataPaused(btn) {
  btn.innerHTML = "<span class='element-invisible'>" + "Pause" + "</span>";
  btn.classList.remove("video-btn__play");
  btn.classList.add("video-btn__pause");
  btn.setAttribute("aria-label", "Pause");
}

// This function sets the button to show a 'Play' Icon.
function setButtonDataPlay(btn) {
  btn.innerHTML = "<span class='element-invisible'>" + "Play" + "</span>";
  btn.classList.remove("video-btn__pause");
  btn.classList.add("video-btn__play");
  btn.setAttribute("aria-label", "Play");
}

// This function detects if an event happens inside a specific element.
function isEventInElement(event, element)   {
  // Get the elements bounds.
  let rect = element.getBoundingClientRect();
  // check if the x and y pos of the event is within the bounds of the previsouly defined bounts of 'element'.
  let x = event.clientX;
  if (x < rect.left || x >= rect.right) return false;
  let y = event.clientY;
  if (y < rect.top || y >= rect.bottom) return false;
  // If it is, return true.
  return true;
}
