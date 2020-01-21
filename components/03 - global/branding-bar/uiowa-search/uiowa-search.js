  const wrapper = document.querySelector(".search-wrapper");
  const body = document.body;
  const button = document.querySelector("button.search-button");


  if (document.querySelector(".search-button")) {
  document.querySelector(".search-button").addEventListener("click", searchToggle);
  document.querySelector(".search-button").addEventListener('keydown', function (event) {
    if (event.key == "Escape") {
      this.setAttribute("aria-expanded", "false");
      document.querySelector(".search-wrapper").classList.remove("is-open");
    }
  });
}

function searchToggle() {

  if (wrapper.classList.contains("is-open")) {
    this.setAttribute("aria-expanded", "false");
    wrapper.classList.remove("is-open");
    body.classList.remove("search-is-open");
  } else {
    wrapper.classList.add("is-open");
    this.setAttribute("aria-expanded", "true");
    body.classList.add("search-is-open");
  }

    const isAriaPressed = button.getAttribute('aria-pressed') === 'true';
    button.setAttribute('aria-pressed', isAriaPressed ? 'false' : 'true');

    if (button.getAttribute('aria-pressed') === 'true') {
      document.getElementById('search-button-label').innerHTML = 'Close';
      document.getElementById("search-input").focus();
    } else {
      document.getElementById('search-button-label').innerHTML = 'Search';
    }

}


// click outside of menu drawer
/*

document.addEventListener(
  "click",
  function (event) {
    if (!event.target.closest(".search-wrapper.is-open", ".search-button")) {
      document.body.classList.remove("search-is-open");
        wrapper.classList.remove("is-open");
    }
  },
  false
);
*/

