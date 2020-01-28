  const wrapper = document.querySelector(".search-overlay");
  const body = document.body;
  const button = document.querySelector("button.search-button");


  if (document.querySelector(".search-button")) {
  document.querySelector(".search-button").addEventListener("click", searchToggle);
  document.querySelector(".search-button").addEventListener('keydown', function (event) {
    if (event.key == "Escape") {
      this.setAttribute("aria-expanded", "false");
      document.querySelector(".search-overlay").setAttribute("aria-expanded", "false");
    }
  });
}

function searchToggle() {

// document.getElementById("#bttnav").removeEventListener("click");

  if (body.classList.contains("search-is-open")) {
    this.setAttribute("aria-expanded", "false");
    //wrapper.classList.remove("is-open");
    wrapper.setAttribute("aria-expanded", "false");
    body.classList.remove("search-is-open");
  } else {
    //wrapper.classList.add("is-open");
    wrapper.setAttribute("aria-expanded", "true");
    this.setAttribute("aria-expanded", "true");
    body.classList.add("search-is-open");
  }

    //const isAriaPressed = button.getAttribute('aria-pressed') === 'true';
    //button.setAttribute('aria-pressed', isAriaPressed ? 'false' : 'true');

    if (button.getAttribute('aria-expanded') === 'true') {
      document.getElementById('search-button-label').innerHTML = 'Close';
      document.getElementById("search-input").focus();
    } else {
      document.getElementById('search-button-label').innerHTML = 'Search';
    }

}


// click outside of menu drawer

document.addEventListener(
  "click",
  function (event) {
    if (!event.target.closest(".search-wrapper")) {
     document.body.classList.remove("search-is-open");
      document.getElementById('search-button-label').innerHTML = 'Search';
    // wrapper.classList.remove("is-open");
     wrapper.setAttribute("aria-expanded", "false");
     button.setAttribute("aria-expanded", "false");
        console.log("outside");
    }
  },
  false
);



