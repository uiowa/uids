const toggleButton = document.querySelectorAll("button.vidbttn");
const ctrlVideo = document.querySelectorAll(".player");
const textOverlay = document.querySelectorAll(".portrait .highlight__wrapper");
const videoContainer = document.querySelectorAll(".embed-responsive");
const trackElements = document.querySelectorAll("track");
const debug = false;

document.addEventListener(
  "click",
  function (e) {
    if (!e.target.classList.contains("vidbttn")) return;
    e.target.classList.toggle("paused");

    for (var i = 0; i < ctrlVideo.length; i++) {
      ctrlVideo[i].play();
      e.target.classList.toggle("active");
      videoContainer[i].classList.toggle("active");
    }

    if (e.target.classList.contains("active")) {
      for (var i = 0; i < ctrlVideo.length; i++) {
        ctrlVideo[i].setAttribute("controls", "true");
        trackElements[i].track.mode = "showing";
        textOverlay[i].classList.add("active");

      }
    } else {
      for (var i = 0; i < ctrlVideo.length; i++) {
        e.target.classList.remove("active");
      }
    }

    for (var i = 0; i < toggleButton.length; i++) {
      // skip clicked link
      if (toggleButton[i] === e.target) continue;
      ctrlVideo[i].pause();
      toggleButton[i].classList.remove("active");
      textOverlay[i].classList.remove("active");
      toggleButton[i].classList.remove("paused");
      videoContainer[i].classList.remove("active");
      ctrlVideo[i].removeAttribute("controls", "true");
      trackElements[i].track.mode = "hidden";
    }
  },
  false
);


var isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};
if (isMobile.any()) {
  document.querySelectorAll(".player")[0].controls = true;
  document.querySelectorAll(".player")[1].controls = true;
  document.querySelectorAll(".player")[2].controls = true;
}

// Set video controls to true for small viewport
// Define our viewportWidth variable
var viewportWidth;

// Set/update the viewportWidth value
var setViewportWidth = function () {
  viewportWidth = window.innerWidth || document.documentElement.clientWidth;
};

// Log the viewport width into the console
var logWidth = function () {
  if (viewportWidth > 768) {
    if (debug) {
      console.log("Wide viewport");
    }
  } else {
    document.querySelectorAll(".player")[0].controls = true;
    document.querySelectorAll(".player")[1].controls = true;
    document.querySelectorAll(".player")[2].controls = true;
  }
};

// Set our initial width and log it
setViewportWidth();
logWidth();

// On resize events, recalculate and log
window.addEventListener(
  "resize",
  function () {
    setViewportWidth();
    logWidth();
  },
  false
);
