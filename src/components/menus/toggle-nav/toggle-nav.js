const drawerContainer = document.querySelector(".o-canvas__wrapper");
const toggleButtons = document.querySelectorAll("button.toggle-nav__bttn");
const scrollUp = 'scroll-up';
const scrollDown = 'scroll-down';
const menuDrawer = document.querySelector('.header-not-sticky .o-canvas__drawer');
const menuDrawerMobile = document.querySelector('.o-canvas__drawer');
const header = document.querySelector('[data-uids-header]');
const menuMq = window.matchMedia('(min-width: 855px)');
let height = header.clientHeight;
let lastScroll = 0;

// Set positioning of menuDrawerMobile based on iowaBar height
let iowaBarHeight = header.offsetHeight;
menuDrawerMobile.style.top = `${iowaBarHeight}px`;

// drawer open/close functionality
document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("toggle-nav__bttn")) return;
  // Add the active/open class
  e.target.classList.toggle("active");
  e.target.parentNode.classList.toggle("o-canvas--open");

  const isActive = e.target.classList.contains("active");
  e.target.setAttribute("aria-expanded", isActive ? "true" : "false");
  e.target.classList.toggle("inactive", !isActive);
  e.target.nextElementSibling.setAttribute("aria-hidden", !isActive);

  // go through each link
  toggleButtons.forEach((button) => {
    if (button !== e.target) {
      button.classList.remove("active", "inactive");
      button.setAttribute("aria-expanded", "false");
      button.parentNode.classList.remove("o-canvas--open");
      button.nextElementSibling.setAttribute("aria-hidden", "true");
    }
  });

  document.body.classList.toggle("o-canvas--complete", !isActive);
  document.body.classList.toggle("o-canvas--lock", isActive);
});

// click outside of menu drawer
document.addEventListener("click", (event) => {
  if (!event.target.closest(".o-canvas__group")) {
    document.body.classList.remove("o-canvas--lock");
    document.body.classList.add("o-canvas--complete");
    drawerContainer.classList.remove("o-canvas--open");
    toggleButtons.forEach((button) => {
      button.classList.remove("active");
      button.setAttribute("aria-expanded", "false");
      button.nextElementSibling.setAttribute("aria-hidden", "true");
    });
  }
});

// esc key
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    document.body.classList.remove("o-canvas--lock");
    document.body.classList.add("o-canvas--complete");
    drawerContainer.classList.remove("o-canvas--open");
    toggleButtons.forEach((button) => {
      button.classList.remove("active");
    });
  }
});

// navigation scroll
window.addEventListener('scroll', function () {
  const currentScroll = window.pageYOffset;
  // remove classes if scrolled all the way up
  if (currentScroll <= height) {
    document.body.classList.remove(scrollUp);
    document.body.classList.remove(scrollDown);
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
  if (currentScroll > lastScroll && !document.body.classList.contains('o-canvas--lock')) {
    // down
    if (currentScroll > height) {
      document.body.classList.remove(scrollUp);
      document.body.classList.add(scrollDown);
    }
  } else if (currentScroll < lastScroll && document.body.classList.contains(scrollDown)) {
    // up
    document.body.classList.remove(scrollDown);
    document.body.classList.add(scrollUp);
  }
  lastScroll = currentScroll;
});

window.addEventListener('orientationchange', function (event) {
  const afterOrientationChange = function () {
    menuDrawerMobile.style.top = Math.max(header.offsetHeight - this.scrollY) + 'px';
    window.removeEventListener('resize', afterOrientationChange);
  };
  window.addEventListener('resize', afterOrientationChange);
  return;
});

window.addEventListener('resize', function () {
  // Update iowaBarHeight and reposition menuDrawerMobile
  iowaBarHeight = header.offsetHeight;
  menuDrawerMobile.style.top = `${iowaBarHeight}px`;
});
