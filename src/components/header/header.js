const scrollUp = "scroll-up";
const scrollDown = "scroll-down";
const canvasLock = "o-canvas--lock";
let lastScroll = 0;

// navigation scroll
window.addEventListener("scroll", function () {
  const currentScroll = window.pageYOffset;
  // if contains lock don't add anything....
  if ((currentScroll + 82) > lastScroll && !body.classList.contains(canvasLock)) {
    // down

      body.classList.remove(scrollUp);
      body.classList.add(scrollDown);

  } else if (currentScroll < lastScroll && body.classList.contains(scrollDown)) {
    // up
    body.classList.remove(scrollDown);
    body.classList.add(scrollUp);
  }
  lastScroll = currentScroll;
});
