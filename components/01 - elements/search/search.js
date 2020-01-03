const toggleButtons = document.querySelectorAll('button.drawer-button');
const drawerContainer = document.querySelectorAll('.drawer-wrapper');

function handleToggleButtonClick(event) {

  const button = event.target;
  button.classList.toggle("active");
  button.parentNode.classList.toggle("drawer-is-open");

  const isActive = button.classList.contains("active")

  if (isActive) {
    button.setAttribute("aria-expanded", "true");
    button.classList.remove("inactive");
    button.nextElementSibling.setAttribute("aria-hidden", "false");
    document.body.classList.remove("drawer-complete");
    document.body.classList.add("drawer-lock");
  } else {
    button.setAttribute("aria-expanded", "false");
    button.classList.add("inactive");
    button.nextElementSibling.setAttribute("aria-hidden", "true");
    document.body.classList.add("drawer-complete");
    document.body.classList.remove("drawer-lock");
  }

  for (let i = 0; i < toggleButtons.length; i++) {
    // If the link is the one clicked, skip it
    if (toggleButtons[i] === button) continue;
    toggleButtons[i].classList.remove("active");
    toggleButtons[i].classList.remove("inactive");
    toggleButtons[i].setAttribute("aria-expanded", "false");
    toggleButtons[i].parentNode.classList.remove("drawer-is-open");
  }
}

// bind function for each item

toggleButtons.forEach(toggleButton => {
  toggleButton.addEventListener('click', handleToggleButtonClick);
});

// close menu if clicked outside or esc

function closeMenu() {
   for (let i = 0; i < drawerContainer.length; i++) {
     drawerContainer[i].classList.remove("drawer-is-open");
   }
}

document.addEventListener('click', function (event) {
  if (!event.target.closest('.drawer_group')) {
    document.body.classList.remove("drawer-lock");
    document.body.classList.add("drawer-complete");
    closeMenu();
    for (let i = 0; i < toggleButtons.length; i++) {
      toggleButtons[i].classList.remove("active");
    }
  }
}, false);

window.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    document.body.classList.remove("drawer-lock");
    document.body.classList.add("drawer-complete");
    closeMenu();
     for (let i = 0; i < toggleButtons.length; i++) {
       toggleButtons[i].classList.remove("active");
     }
  }
});
