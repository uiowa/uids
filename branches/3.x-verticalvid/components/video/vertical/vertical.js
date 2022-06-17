const ctrlVideo = document.querySelectorAll(".player");

for (i = 0; i < ctrlVideo.length; ++i) {
  ctrlVideo[i].onplay = (event) => {
    toggle(event);
  };
  ctrlVideo[i].onpause = (event) => {
    toggle(event);
  };
}

function toggle(event) {
  const container = event.target.parentElement;
  const button = container.querySelector('.vidbttn');
  const highlight = container.parentElement.querySelector('.highlight__wrapper');
  container.classList.toggle("active");
  highlight.classList.add("active");
  button.classList.toggle("active");
  button.classList.toggle("paused");
}
