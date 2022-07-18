const drawerContainer = document.querySelectorAll(".o-canvas__wrapper");
const toggle-navButtons = document.querySelectorAll("button.toggle-nav--bttn");
const canvasDrawer = document.querySelectorAll(".o-canvas__drawer");

// drawer open/close functionality

document.addEventListener(
  "click",
  function (e) {
    if (!e.target.classList.contains("toggle-nav--bttn")) return;
    // Add the active/open class
    e.target.classList.toggle-nav("active");
    e.target.parentNode.classList.toggle-nav("o-canvas--open");

    if (e.target.classList.contains("active")) {
      e.target.setAttribute("aria-expanded", "true");
      e.target.classList.remove("inactive");
      e.target.nextElementSibling.setAttribute("aria-hidden", "false");
      //canvasDrawer[0].querySelector("#superfish-main-accordion li a").focus();
      document.body.classList.remove("o-canvas--complete");
      document.body.classList.add("o-canvas--lock");
    } else {
      e.target.setAttribute("aria-expanded", "false");
      e.target.classList.add("inactive");
      e.target.nextElementSibling.setAttribute("aria-hidden", "true");
      document.body.classList.add("o-canvas--complete");
      document.body.classList.remove("o-canvas--lock");
    }
    // go through each link
    for (var i = 0; i < toggle-navButtons.length; i++) {
      // skip clicked link
      if (toggle-navButtons[i] === e.target) continue;
      toggle-navButtons[i].classList.remove("active");
      toggle-navButtons[i].classList.remove("inactive");
      toggle-navButtons[i].setAttribute("aria-expanded", "false");
      toggle-navButtons[i].parentNode.classList.remove("o-canvas--open");
      toggle-navButtons[i].nextElementSibling.setAttribute("aria-hidden", "true");
    }
  },
  false
);

// click outside of menu drawer

document.addEventListener(
  "click",
  function (event) {
    if (!event.target.closest(".o-canvas__group")) {
      document.body.classList.remove("o-canvas--lock");
      document.body.classList.add("o-canvas--complete");
      for (let i = 0; i < drawerContainer.length; i++) {
        drawerContainer[i].classList.remove("o-canvas--open");
      }
      for (let i = 0; i < toggle-navButtons.length; i++) {
        toggle-navButtons[i].classList.remove("active");
        toggle-navButtons[i].setAttribute("aria-expanded", "false");
        toggle-navButtons[i].nextElementSibling.setAttribute("aria-hidden", "true");
      }
    }
  },
  false
);

// esc key

window.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    document.body.classList.remove("o-canvas--lock");
    document.body.classList.add("o-canvas--complete");
    for (let i = 0; i < drawerContainer.length; i++) {
      drawerContainer[i].classList.remove("o-canvas--open");
    }
    for (let i = 0; i < toggle-navButtons.length; i++) {
      toggle-navButtons[i].classList.remove("active");
    }
  }
});
