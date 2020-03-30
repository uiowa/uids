const wrapper = document.querySelector(".search-overlay");
const body = document.body;
const button = document.querySelector("button.search-button");

if (document.querySelector(".search-button")) {
  document
    .querySelector(".search-button")
    .addEventListener("click", searchToggle);
  document
    .querySelector(".search-button")
    .addEventListener("keydown", function (event) {
      if (event.key == "Escape") {
        this.setAttribute("aria-expanded", "false");
        document
          .querySelector(".search-overlay")
          .setAttribute("aria-expanded", "false");
      }
    });
}

function searchToggle() {
  if (document.getElementById("search-button-label")) {
    if (body.classList.contains("search-is-open")) {
      this.setAttribute("aria-expanded", "false");
      wrapper.setAttribute("aria-expanded", "false");
      body.classList.remove("search-is-open");
    } else {
      wrapper.setAttribute("aria-expanded", "true");
      this.setAttribute("aria-expanded", "true");
      body.classList.add("search-is-open");
    }
  if (button.getAttribute("aria-expanded") === "true") {
      document.getElementsByName('search-terms')[0].focus();
    } else {
    }
  }
}

// click outside of menu drawer

document.addEventListener(
  "click",
  function (event) {
    if (!event.target.closest(".search-wrapper")) {
      if (document.getElementById("search-button-label")) {
        document.body.classList.remove("search-is-open");
        document.getElementById("search-button-label").innerHTML = "Search";
        wrapper.setAttribute("aria-expanded", "false");
        button.setAttribute("aria-expanded", "false");
      }
    }
  },
  false
);
