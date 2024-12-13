(function () {
  function Accordion(element) {
    console.log('element', element);
    let thisAccordion = this;

    // Get the accordionItems, and if the accordion group is multiselectable.
    this.accordionItems = element.querySelectorAll('details');
    console.log('this.accordionItems', this.accordionItems);
    this.multiSelectible = element.getAttribute('aria-multiselectable') === 'true' || false;

    for (let i = 0; i < this.accordionItems.length; i++) {
      console.log('accordionItem', this.accordionItems[i]);
      // Get the accordion item's components.
      let summary = this.getSummary(this.accordionItems[i]);

      this.accordionItems[i].addEventListener("toggle", (event) => {
        console.log('toggle');
        this.toggleAccordion(this.accordionItems[i], this.accordionItems[i].open);
      });


      // Add a listener that listens for when the URL is changed.
      window.addEventListener('popstate', function (event) {

        // Activate an accordion based upon the hash parameters in the URL.
        thisAccordion.activateAccordionByHash();
      });

      // Activate any accordion that is defined in the hash parameter if there is one.
      this.activateAccordionByHash();
    }
  }

  // Gets the item components for 'accordion'.
  // Returns an object that contains 'btn' and 'panel' elements.
  Accordion.prototype.getSummary = function (accordionItem) {
    return accordionItem.querySelector('summary');
  }
  Accordion.prototype.accordionItemComponents = function (accordionItem) {
    console.log('accordionItem', accordionItem);
    console.log('accordionItem.querySelector("details")', accordionItem.querySelector('details'));
    console.log('accordionItem.querySelector("summary")', accordionItem.querySelector('summary'));
    return [
      accordionItem.querySelector('details'),
      accordionItem.querySelector('summary'),
    ];
  }

  // Define whether 'accordion' is open with 'isOpen'.
  Accordion.prototype.accordionOpen = function (accordionItem, isOpen) {
    // Get the accordion item's components.
    const [details] = this.accordionItemComponents(accordionItem);

    // Set the relevant attributes for 'accordion' based on 'isOpen'.
    details.setAttribute('aria-expanded', isOpen);
    details.setAttribute('aria-selected', isOpen);
  }

  // Activate an 'accordion'.
  Accordion.prototype.activateAccordion = function (accordion) {

    // Open the accordion.
    this.accordionOpen(accordion, true);
  }

  // Activate any accordion that is defined in the hash parameter if there is one.
  Accordion.prototype.activateAccordionByHash = function () {

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
          this.activateAccordion(accordionToFocus);
        }
      }
    }
  }

  // Check if an accordion is open by inspecting the aria attribute of the 'btn' controlling it.
  // Returns a boolean.
  Accordion.prototype.isAccordionOpen = function (accordionItem) {
    [details] = this.accordionItemComponents(accordionItem);
    return details.getAttribute('expanded') === 'true' || false;
  }

  // Toggle a specific 'accordion' open or closed.
  Accordion.prototype.toggleAccordion = function (accordionItem, open) {

    if (open === undefined) {
      open = this.isAccordionOpen(accordionItem);
    }
    // Get the accordion item's components.
    const [details] = this.accordionItemComponents(accordionItem);

    // Set the relevant attributes for 'accordion' based on 'isOpen'.
    details.setAttribute('aria-expanded', open);
    details.setAttribute('aria-selected', open);

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

  // Instantiate accordionItems on the page.
  const accordions = document.getElementsByClassName("accordion");
  console.log('accordions', accordions);

  for (let i = 0; i < accordions.length; i++) {

    let accordion = new Accordion(accordions[i]);
    console.log('accordion', accordion);
  }
}());

