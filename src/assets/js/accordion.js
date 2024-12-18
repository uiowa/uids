/**
 * A class for controlling accordion behavior.
 */
class Accordion {
  constructor(element) {
    const accordionItems = element.querySelectorAll('details');

    // Loop through each accordion item and add a listener for when the accordion is toggled.
    Array.prototype.forEach.call(accordionItems, (item) => {
      item.addEventListener('toggle', (event) => {
        this.toggleAccordion(item, item.open);
      });
    });

    // Add a listener that listens for when the URL is changed.
    window.addEventListener('popstate', (event) => {
      // Activate an accordion based upon the hash parameters in the URL.
      this.activateAccordionByHash();
    });

    // Activate any accordion that is defined in the hash parameter if there is one.
    this.activateAccordionByHash();
  }

  isAccordionOpen(accordionItem) {
    return accordionItem.getAttribute('expanded') === 'true' || false;
  }

  toggleAccordion(accordionItem, open) {
    if (open === undefined) {
      open = this.isAccordionOpen(accordionItem);
    }

    // Set the relevant attributes for 'accordion' based on 'open'.
    accordionItem.setAttribute('aria-expanded', open);
    accordionItem.setAttribute('aria-selected', open);

    // If the accordion is not open (but will be)...
    if (!open) {
      // Define historyString here to be used later.
      let historyString = '#' + accordionItem.id;

      // Change window location to add URL params
      if (window.history && history.pushState && historyString !== '#') {
        // NOTE: doesn't take into account existing params
        history.replaceState("", "", historyString);
      }
    }
    // Else if the accordion is closed...
    else {
      // Empty the history string.
      history.replaceState("", "", null);
    }
  }

  /**
   * Opens an accordion based on the hash in the URL.
   */
  activateAccordionByHash() {
    // Get the hash parameter.
    let hash = window.location.hash.substr(1);

    // If the hash parameter is not empty...
    if (hash !== '') {
      // Get the accordion to focus.
      let accordionToFocus = document.getElementById(hash);

      // If the defined hash parameter finds an element...
      if (accordionToFocus !== null) {
        // Get the accordion wrapper of the hash parameter and this accordion wrapper to compare later.
        let accordionToFocusAccordionWrapper = accordionToFocus.parentElement
        let accordionWrapper = this.accordionItems[0].parentElement;

        // If the accordion wrapper defined by the hash and this accordion wrapper are the same...
        if (accordionToFocusAccordionWrapper === accordionWrapper) {
          // Activate the accordion defined in the hash parameters.
          this.toggleAccordion(accordionToFocus, true);
        }
      }
    }
  }
}

/**
 * Initializes the accordion on each of the specified selectors.
 *
 * @param selector
 */
function applyAccordion(selector) {
  const items = document.querySelectorAll(selector);

  Array.prototype.forEach.call(items, (item) => {
    new Accordion(item);
  });
}

export { applyAccordion }

