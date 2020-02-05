const toggleButton = document.querySelectorAll("bttn--video");
var ctrlVideo = document.querySelectorAll(".player");
var textOverlay = document.querySelectorAll(".portrait__overlay");
var videoContainer = document.querySelectorAll(".embed-responsive");
/*
Object.defineProperty(HTMLMediaElement.prototype, "playing", {
  get: function () {
    return !!(
      this.currentTime > 0 &&
      !this.paused &&
      !this.ended &&
      this.readyState > 2
    );
  }
});
*/
document.addEventListener(
  "click",
  function (e) {
    if (!e.target.classList.contains("bttn--video")) return;
    e.target.classList.toggle("paused");
    for (var i = 0; i < videoContainer.length; i++) {
      videoContainer[i].classList.toggle("active");
    }

    for (var i = 0; i < ctrlVideo.length; i++) {
      ctrlVideo[i].play();

      e.target.classList.toggle("active");
      document.getElementById("label").innerHTML = "Pause";
    }

    /*
      if (document.querySelector('video').playing) {
       console.log("play");
      }
*/

    if (e.target.classList.contains("active")) {
      for (var i = 0; i < textOverlay.length; i++) {
        textOverlay[i].classList.add("active");
      }

      for (var i = 0; i < ctrlVideo.length; i++) {
        document.getElementById("label").innerHTML = "Pause";
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
      document.getElementById("label").innerHTML = "Pause";
      textOverlay[i].classList.remove("active");
      toggleButton[i].classList.remove("paused");
      videoContainer[i].classList.remove("active");
    }
  },
  false
);
