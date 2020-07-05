const drawerContainer = document.querySelectorAll(".o-canvas__wrapper");
const toggleButtons = document.querySelectorAll("button.bttn--drawer");
const canvasDrawer = document.querySelectorAll(".o-canvas__drawer");

//const searchBox = document.querySelectorAll(".uids-search input");
//const searchButton = document.getElementById("search--button");
//const searchLabel = document.getElementById("search-button-label");

// drawer open/close functionality

document.addEventListener(
  "click",
  function (e) {
    if (!e.target.classList.contains("bttn--drawer")) return;
    // Add the active/open class
    e.target.classList.toggle("active");
    e.target.parentNode.classList.toggle("o-canvas--open");

    /*
        document.body.classList.remove("search-is-open");
        searchButton.setAttribute("aria-pressed", "false");
           if (searchButton.getAttribute('aria-pressed') === 'true') {
            searchLabel.innerHTML = 'Close';
           } else if (searchButton.getAttribute('aria-pressed') === 'false') {
             searchLabel.innerHTML = 'Search';
           }
    */

    // add focus for search
    /*     if (e.target.classList.contains("bttn--search")) {
          for (let i = 0; i < searchBox.length; i++) {
      searchBox[i].classList.add("search-focused");
    }
         } else {
         }
    */

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
    for (var i = 0; i < toggleButtons.length; i++) {
      // skip clicked link
      if (toggleButtons[i] === e.target) continue;
      toggleButtons[i].classList.remove("active");
      toggleButtons[i].classList.remove("inactive");
      toggleButtons[i].setAttribute("aria-expanded", "false");
      toggleButtons[i].parentNode.classList.remove("o-canvas--open");
      toggleButtons[i].nextElementSibling.setAttribute("aria-hidden", "true");



    }
  },
  false
);

/*
canvasDrawer[0].addEventListener("transitionend", e => {
  canvasDrawer[0].querySelector("#superfish-main-accordion li a").focus();
});
*/
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
      for (let i = 0; i < toggleButtons.length; i++) {
        toggleButtons[i].classList.remove("active");
        toggleButtons[i].setAttribute("aria-expanded", "false");
        toggleButtons[i].nextElementSibling.setAttribute("aria-hidden", "true");
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
    for (let i = 0; i < toggleButtons.length; i++) {
      toggleButtons[i].classList.remove("active");
    }
  }
});
