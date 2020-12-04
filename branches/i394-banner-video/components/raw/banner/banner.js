const banners = document.querySelectorAll('.banner');
const link_queries = ['.banner__content > .headline a', '.banner__action > a.bttn'];

Array.prototype.forEach.call(banners, banner => {
  let up, down, links, link, i = 0;

  // Loop through link queries
  for (i; i < link_queries.length; i++) {
    // Break if we find matches.
    links = banner.querySelectorAll(link_queries[i]);
    if (links.length) {
      break;
    }
  }

  // If we have exactly one match, attach behaviors.
  if (links && links.length === 1) {
    link = links[0];
    banner.style.cursor = 'pointer';
    banner.onmousedown = () => down = +new Date();
    banner.onmouseup = (e) => {
      // If the user is clicking on the pause/play button of a video BG element...
      // Do not send an event to trigger a click on the banner link.
      if(banner.querySelectorAll('.video-controls').length > 0) {
        if (isEventInElement(e, banner.querySelector('.video-controls'))) {
          return false;
        }
      }

      // Trigger click event if the duration is short enough.
      up = +new Date();
      if ((up - down) < 200) {
        link.click();
      }
    }
  }
});

// This function detects if an event happens inside a specific element.
function isEventInElement(event, element)   {
  // Get the elements bounds.
  let rect = element.getBoundingClientRect();
  // check if the x and y pos of the event is within the bounds of the previsouly defined bounts of 'element'.
  let x = event.clientX;
  if (x < rect.left || x >= rect.right) return false;
  let y = event.clientY;
  if (y < rect.top || y >= rect.bottom) return false;
  // If it is, return true.
  return true;
}
