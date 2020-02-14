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
  ({
    target
  }) => {
    if (!target.classList.contains("vidbttn")) return;
    target.classList.toggle("paused");
    for (var i = 0; i < videoContainer.length; i++) {
      videoContainer[i].classList.toggle("active");
    }

    for (var i = 0; i < ctrlVideo.length; i++) {
      ctrlVideo[i].play();
      target.classList.toggle("active");
    }

    for (var i = 0; i < buttonLabel.length; i++) {
    }
    /*
      if (document.querySelector('video').playing) {
       console.log("play");
      }
*/

    if (target.classList.contains("active")) {
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
        target.classList.remove("active");
      }
    }

    for (var i = 0; i < toggleButton.length; i++) {
      // skip clicked link
      if (toggleButton[i] === target) continue;
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



const isMobile = {
  Android() {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  iPhone() {
    return navigator.userAgent.match(/iPhone/i);
  },
  iPad() {
    return navigator.userAgent.match(/iPad/i);
  },
  Opera() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any() {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};



if (isMobile.any()) {
  document.querySelectorAll(".player")[0].controls = true;
  document.querySelectorAll(".player")[1].controls = true;
  document.querySelectorAll(".player")[2].controls = true;
}
