const items = document.querySelectorAll('.click-container:not([data-uids-no-link])');
const link_elements = ['.click-target'];
const RIGHT_BUTTON_CODE = 2;

class A11yClickTarget {
  constructor(item) {
    let up, down, link, i;
    // Loop through options and break on the first match.
    for (i = 0; i < link_elements.length; i++) {
      link = item.querySelector(link_elements[i])
      if (link) {
        break;
      }
    }

    // If we have a match, attach behaviors.
    if (!link) {
      return;
    }
    item.style.cursor = 'pointer';
    item.onmousedown = (e) => {
      if (!this.ignoreClick(e)) {
        down = +new Date();
      }
    };
    item.onmouseup = (e) => {
      if (!this.ignoreClick(e)) {
        up = +new Date();
        // Trigger click event if the duration is short enough.
        if ((up - down) < 200) {
          link.click();
        }
      }
    };
  }

  ignoreClick(e) {
    return (
      e.button === RIGHT_BUTTON_CODE || ['A', 'BUTTON'].indexOf(e.target.nodeName) !== -1
    );
  }
}

Array.prototype.forEach.call(items, item => {
  new A11yClickTarget(item);
});

export default A11yClickTarget
