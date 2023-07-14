const drawerContainer = document.querySelector(".o-canvas__wrapper");
const toggleButtons = document.querySelectorAll("button.toggle-nav__bttn");
const canvasDrawer = document.querySelector('.o-canvas__drawer');
const iowaHeader = document.querySelector('[data-uids-header]');

let exactheight = iowaHeader.clientHeight;
let lScroll = 0;

// Set positioning of canvasDrawer based on iowaBar height
let iowaBarHeight = iowaHeader.offsetHeight;
canvasDrawer.style.top = `${iowaBarHeight}px`;

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

window.addEventListener('resize', function () {
  // Update iowaBarHeight and reposition canvasDrawer
  iowaBarHeight = iowaHeader.offsetHeight;
  canvasDrawer.style.top = `${iowaBarHeight}px`;
});

// Update canvasDrawer position on scroll if body class is "header-not-sticky"
function adjustCanvasDrawerPosition() {
  if (document.body.classList.contains("header-not-sticky")) {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > height) {
      // Scrolling down
      canvasDrawer.style.top = "0";
    } else {
      // Scrolling up or at the top
      canvasDrawer.style.top = `${Math.max(iowaBarHeight - currentScroll, 0)}px`;
    }

    lastScroll = currentScroll;
  }
}

window.addEventListener('scroll', adjustCanvasDrawerPosition);
