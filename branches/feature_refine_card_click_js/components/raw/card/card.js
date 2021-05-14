const cards = document.querySelectorAll('.card:not([data-uids-no-link])');
const link_elements = ['.card__title a', '.card__media a', 'a.bttn'];
const RIGHT_CLICK_EVENT_ID = 3;

Array.prototype.forEach.call(cards, card => {
  let up, down, link, i;
  // Loop through options and break on the first match.
  for (i = 0; i < link_elements.length; i++) {
    if (link = card.querySelector(link_elements[i])) {
      break;
    }
  }

  // If we have a match, attach behaviors.

  if (link) {
    card.style.cursor = 'pointer';
    card.onmousedown = (e) => {
      if (e.which === RIGHT_CLICK_EVENT_ID) {
        return;
      }
      down = +new Date();
    }
    card.onmouseup = (e) => {
      if (e.which === RIGHT_CLICK_EVENT_ID) {
        return;
      }
      up = +new Date();
      // Trigger click event if the duration is short enough.
      if ((up - down) < 200) {
        link.click();
      }
    }
  }
});
