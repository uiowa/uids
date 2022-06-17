const ctrlVideo = document.querySelectorAll(".player");

for (i = 0; i < ctrlVideo.length; ++i) {
  ctrlVideo[i].onplay = (event) => {
    for (j = 0; j < ctrlVideo.length; ++j) {
      if (ctrlVideo[j] != event.target) {
        setVideoState(ctrlVideo[j], false);
      }
    }
    setVideoState(event.target, true);
  };

  ctrlVideo[i].onpause = (event) => {
    setVideoState(event.target, false);
  };
}

function setVideoState(video, active) {
  const container = video.parentElement;
  const button = container.querySelector('.vidbttn');
  const highlight = container.parentElement.querySelector('.highlight__wrapper');

  if (active) {
    container.classList.add("active");
    highlight.classList.add("active");
    button.classList.add("active");
  }

  else {
    video.pause();

    container.classList.remove("active");
    highlight.classList.remove("active");
    button.classList.remove("active");
  }
}
