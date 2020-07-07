const scrollUp = "scroll-up";
const scrollDown = "scroll-down";
const canvasLock = "o-canvas--lock";
const menuDrawer = document.querySelector('.header-not-sticky .o-canvas__drawer');
const menuDrawerMobile = document.querySelector('.o-canvas__drawer');
const header = document.querySelector('[data-uids-header]');
const menuMq = window.matchMedia("(min-width: 855px)");
let height = header.clientHeight;
let lastScroll = 0;

// navigation scroll
window.addEventListener("scroll", function () {
  const currentScroll = window.pageYOffset;
  // remove classes if scrolled all the way up
  if (currentScroll <= height) {
    body.classList.remove(scrollUp);
    body.classList.remove(scrollDown);
    if (menuMq.matches) {
      if (menuDrawer) {
        menuDrawer.style.top = Math.max(height - this.scrollY) + 'px';
      }
    } else {
      menuDrawerMobile.style.top = Math.max(height - this.scrollY) + 'px';
    }
    return;
  }
  // if contains lock don't add anything....
  if (currentScroll > lastScroll && !body.classList.contains(canvasLock)) {
    // down
    if (currentScroll > height) {
      body.classList.remove(scrollUp);
      body.classList.add(scrollDown);
    }
  } else if (currentScroll < lastScroll && body.classList.contains(scrollDown)) {
    // up
    body.classList.remove(scrollDown);
    body.classList.add(scrollUp);
  }
  lastScroll = currentScroll;
});

window.addEventListener("orientationchange", function (event) {
  var afterOrientationChange = function () {
    menuDrawerMobile.style.top = Math.max(header.offsetHeight - this.scrollY) + 'px';
    window.removeEventListener('resize', afterOrientationChange);
  };
  window.addEventListener('resize', afterOrientationChange);
  return;
});
