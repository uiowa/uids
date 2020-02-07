const toggleButton = document.querySelectorAll("button.vidbttn");
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
    if (!e.target.classList.contains("vidbttn")) return;
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
  iPhone: function () {
    return navigator.userAgent.match(/iPhone/i);
  },
  iPad: function () {
    return navigator.userAgent.match(/iPad/i);
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
