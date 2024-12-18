/**
 * A class for controlling accordion behavior.
 */
class Accordion {
  constructor(element) {

    // Loop through each accordion item and add a listener for when the accordion is toggled.
    const accordionItems = element.querySelectorAll('details');
    Array.prototype.forEach.call(accordionItems, (item) => {
      // Add a listener for when the details element is toggled.
      item.addEventListener('toggle', (event) => {
        this.toggleAccordionItem(item, event.newState === 'open');
      });

      // Add a listener for when the summary element is clicked.
      const summary = item.querySelector('summary');
      summary.addEventListener('click', (event) => {
        this.accordionItemClick(item);
      });
    });
  }

  /**
   * Handles the click event for an accordion summary element.
   *
   * @param accordionItem
   *   The details element of an accordion item.
   */
  accordionItemClick(accordionItem) {

    // Adds a bespoke data attribute to the accordion item
    // so that we can determine if it was clicked. This is
    // necessary because the 'click' event if fired before
    // the 'toggle' event and we don't know if the accordion
    // item is being opened or closed yet.
    accordionItem.setAttribute('data-accordion-clicked', true);
  }

  /**
   * Handles the toggle event of an accordion details element.
   *
   * @param accordionItem
   *   The details element of an accordion item.
   * @param isOpening
   *   A boolean value indicating the new toggle state.
   */
  toggleAccordionItem(accordionItem, isOpening) {

    // Set the relevant attributes for 'accordion' based on 'open'.
    accordionItem.setAttribute('aria-expanded', isOpening);
    accordionItem.setAttribute('aria-selected', isOpening);

    // Check if the accordion was clicked.
    const clicked = accordionItem.getAttribute('data-accordion-clicked');
    if (clicked) {
      accordionItem.removeAttribute('data-accordion-clicked');

      // If the accordion is not open (but will be)...
      if (isOpening) {
        // Define historyString here to be used later.
        const historyString = '#' + accordionItem.id;

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
  }

  /**
   * Opens an accordion based on the hash in the URL.
   */
  static focusAccordionItemByHash() {

    // Get the hash parameter.
    const hash = window.location.hash.substr(1);

    // If the hash parameter is not empty...
    if (hash !== '') {
      // Get the accordion to focus.
      const hashedAccordionItem = document.getElementById(hash);

      // If the defined hash parameter finds an element...
      if (hashedAccordionItem !== null) {
        // If the summary element is present...
        const summary = hashedAccordionItem.querySelector('summary');
        if (summary) {
          // Trigger click event for summary.
          summary.click();
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

  // Add a listener that listens for when the URL is changed.
  window.addEventListener('popstate', (event) => {
    // Activate an accordion based upon the hash parameters in the URL.
    Accordion.focusAccordionItemByHash();
  });

  // Activate any accordion that is defined in the hash parameter if there is one.
  Accordion.focusAccordionItemByHash();
}

export { applyAccordion }

