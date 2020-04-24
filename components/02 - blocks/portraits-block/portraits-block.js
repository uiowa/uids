const toggleButton = document.querySelectorAll("button.vidbttn");
const ctrlVideo = document.querySelectorAll(".player");
const textOverlay = document.querySelectorAll(".portrait .highlight__wrapper");
const videoContainer = document.querySelectorAll(".embed-responsive");
const buttonLabel = document.getElementById("label");
const debug = false;

document.addEventListener(
  "click",
  function (e) {
    if (!e.target.classList.contains("vidbttn")) return;
    e.target.classList.toggle("paused");
    for (var i = 0; i < videoContainer.length; i++) {
      videoContainer[i].classList.toggle("active");
    }

    for (var i = 0; i < ctrlVideo.length; i++) {
      ctrlVideo[i].play();
      e.target.classList.toggle("active");
    }

    for (var i = 0; i < buttonLabel.length; i++) {}

    if (e.target.classList.contains("active")) {
      for (var i = 0; i < textOverlay.length; i++) {
        textOverlay[i].classList.add("active");
      }

      for (var i = 0; i < ctrlVideo.length; i++) {
        document.getElementById("label").innerHTML = "Pause";
        ctrlVideo[i].setAttribute("controls", "true");
      }
    } else {
      for (var i = 0; i < ctrlVideo.length; i++) {
        // skip clicked link
        ctrlVideo[i].pause();

        document.getElementById("label").innerHTML = "Play";
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
    }
  },
  false
);

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
