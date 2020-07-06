function Accordion(element) {
  this.panels = element.getElementsByClassName("accordion__heading");
  this.multiSelectible = element.getAttribute('aria-multiselectable') === 'true' || false;

  for (let i = 0; i < this.panels.length; i++) {

    let btn = this.panels[i].querySelector('button');
    let target = this.panels[i].nextElementSibling;

    let expanded = btn.getAttribute('aria-expanded') === 'true' || false;
    target.hidden = !expanded;

    btn.onclick = () => {
      this.togglePanel(btn, target);
    }
  }
}

Accordion.prototype.togglePanel = function(btn, target) {
  let expanded = btn.getAttribute('aria-expanded') === 'true' || false;

  // Checks if multiple panels can be open at once. If not, closes other panels.
  if (!this.multiSelectible && !expanded) {
    this.collapseAllPanels();
  }

  btn.setAttribute('aria-expanded', !expanded);
  btn.setAttribute('aria-selected', !expanded);
  target.hidden = expanded;
}

Accordion.prototype.collapseAllPanels = function() {
  for (let i = 0; i < this.panels.length; i++) {
    let inner_target = this.panels[i].nextElementSibling;
    let inner_btn = this.panels[i].querySelector('button');
    inner_btn.setAttribute('aria-expanded', 'false');
    inner_btn.setAttribute('aria-selected', 'false');
    inner_target.hidden = true;
  }
}

// Instantiate accordions on the page.
const accordions = document.getElementsByClassName("accordion");

for (let i = 0; i < accordions.length; i++) {
  let accordion = new Accordion(accordions[i]);
}

