const heroes = document.querySelectorAll('.hero');
const link_elements = ['.bold-headline a', 'a.bttn'];
Array.prototype.forEach.call(heroes, hero => {
  let up, down, link, i;
  // Loop through options and break on the first match.
  for (i = 0; i < link_elements.length; i++) {
    if (link = hero.querySelector(link_elements[i])) {
      break;
    }
  }

  // If we have a match, attach behaviors.
  if (link) {
    hero.style.cursor = 'pointer';
    hero.onmousedown = () => down = +new Date();
    hero.onmouseup = () => {
      up = +new Date();
      // Trigger click event if the duration is short enough.
      if ((up - down) < 200) {
        link.click();
      }
    }
  }
});
