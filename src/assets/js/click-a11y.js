const RIGHT_BUTTON_CODE = 2;

/**
 * A class for setting click targets.
 */
class A11yClickTarget {
  constructor(item, link_elements) {
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

/**
 * Initializes the click target on the specified selectors.
 *
 * @param selector
 * @param link_elements
 */
function applyClickA11y(selector, link_elements = ['.click-target']) {
  const items = document.querySelectorAll(selector);
  Array.prototype.forEach.call(items, (item) => {
    new A11yClickTarget(item, link_elements);
  });
}

export { applyClickA11y }
