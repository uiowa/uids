const toggleButton = document.querySelectorAll("button.vidbttn");
const ctrlVideo = document.querySelectorAll(".player");
const textOverlay = document.querySelectorAll(".portrait .highlight__wrapper");
const videoContainer = document.querySelectorAll(".embed-responsive");
const buttonLabel = document.getElementById("label");

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
    if (!e.target.classList.contains("vidbttn")) return;
    e.target.classList.toggle("paused");
    for (var i = 0; i < videoContainer.length; i++) {
      videoContainer[i].classList.toggle("active");
    }

    for (var i = 0; i < ctrlVideo.length; i++) {
      ctrlVideo[i].play();
      e.target.classList.toggle("active");
    }

    for (var i = 0; i < buttonLabel.length; i++) {
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
      //buttonLabel[i].innerHTML = "Play";
      textOverlay[i].classList.remove("active");
      toggleButton[i].classList.remove("paused");
      videoContainer[i].classList.remove("active");
    }
  },
  false
);


