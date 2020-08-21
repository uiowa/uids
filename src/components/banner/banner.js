const banners = document.querySelectorAll('.banner');
const link_elements = ['.bold-headline a', 'a.bttn'];
Array.prototype.forEach.call(banners, banner => {
  let up, down, link, i;
  // Loop through options and break on the first match.
  for (i = 0; i < link_elements.length; i++) {
    if (link = banner.querySelector(link_elements[i])) {
      break;
    }
  }

  // If we have a match, attach behaviors.
  if (link) {
    banner.style.cursor = 'pointer';
    banner.onmousedown = () => down = +new Date();
    banner.onmouseup = () => {
      up = +new Date();
      // Trigger click event if the duration is short enough.
      if ((up - down) < 200) {
        link.click();
      }
    }
  }
});
