const items = document.querySelectorAll('.click-container:not([data-uids-no-link])');
const link_elements = ['.click-target'];
const RIGHT_BUTTON_CODE = 2;

Array.prototype.forEach.call(items, item => {
  let up, down, link, i;
  // Loop through options and break on the first match.
  for (i = 0; i < link_elements.length; i++) {
    if (link = item.querySelector(link_elements[i])) {
      break;
    }
  }

  // If we have a match, attach behaviors.

  if (!link) {
    return;
  }
  item.style.cursor = 'pointer';
  item.onmousedown = (e) => {
    console.log(e);
    if (!ignoreClick(e)) {
      down = +new Date();
    }
  }
  item.onmouseup = (e) => {
    console.log(e);
    if (!ignoreClick(e)) {
      up = +new Date();
      // Trigger click event if the duration is short enough.
      if ((up - down) < 200) {
        link.click();
      }
    }
  }
});

/**
 * Ignore right button and <a> or <button> clicks.
 */
function ignoreClick(e) {
  return e.button === RIGHT_BUTTON_CODE || ['A', 'BUTTON'].indexOf(e.target.nodeName) !== -1;
}
