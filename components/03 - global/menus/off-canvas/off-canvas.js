/////


const toggleButtons = document.querySelectorAll('button.bttn--drawer');
const drawerContainer = document.querySelectorAll('.o-canvas__wrapper');

function handleToggleButtonClick(event) {

  const button = event.target;
  button.classList.toggle("active");
  button.parentNode.classList.toggle("o-canvas--open");
  const drawerItself = document.querySelectorAll('.o-canvas__drawer');

  const isActive = button.classList.contains("active")

  if (isActive) {
    button.setAttribute("aria-expanded", "true");
    button.classList.remove("inactive");
    document.body.classList.remove("o-canvas--complete");
    document.body.classList.add("o-canvas--lock");
      for (let i = 0; i < drawerItself.length; i++) {
        if (drawerItself[i] === isActive) continue;
      drawerItself[i].setAttribute("aria-hidden", "false");
    }
  } else {
    button.setAttribute("aria-expanded", "false");
    button.classList.add("inactive");
    document.body.classList.add("o-canvas--complete");
    document.body.classList.remove("o-canvas--lock");
    for (let i = 0; i < drawerItself.length; i++) {
       drawerItself[i].setAttribute("aria-hidden", "true");
     }
  }


  for (let i = 0; i < toggleButtons.length; i++) {
    // If the link is the one clicked, skip it
    if (toggleButtons[i] === button) continue;
    toggleButtons[i].classList.remove("active");
    toggleButtons[i].classList.remove("inactive");
    toggleButtons[i].setAttribute("aria-expanded", "false");
    toggleButtons[i].parentNode.classList.remove("o-canvas--open");
  }
}

// bind function for each item

toggleButtons.forEach(toggleButton => {
  toggleButton.addEventListener('click', handleToggleButtonClick);
});

// close menu if clicked outside or esc

function closeMenu() {
  for (let i = 0; i < drawerContainer.length; i++) {
    drawerContainer[i].classList.remove("o-canvas--open");
  }
}

document.addEventListener('click', function (event) {
  if (!event.target.closest('.o-canvas__group')) {
    document.body.classList.remove("o-canvas--lock");
    document.body.classList.add("o-canvas--complete");
    closeMenu();
    for (let i = 0; i < toggleButtons.length; i++) {
      toggleButtons[i].classList.remove("active");
    }
  }
}, false);

window.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    document.body.classList.remove("o-canvas--lock");
    document.body.classList.add("o-canvas--complete");
    closeMenu();
    for (let i = 0; i < toggleButtons.length; i++) {
      toggleButtons[i].classList.remove("active");
    }
  }
});
