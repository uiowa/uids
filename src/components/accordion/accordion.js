// function Accordion(element) {
//   this.panels = element.getElementsByClassName("uids-accordion__heading");
//   this.multiSelectible = element.getAttribute('aria-multiselectable') === 'true' || false;
// }
// @todo Finish converting this to OO implementation.
const accordions = document.getElementsByClassName("uids-accordion");

Array.prototype.forEach.call(accordions, accordion => {
  let accordion_elements = accordion.getElementsByClassName("uids-accordion__heading");
  let multiselectable = accordion.getAttribute('aria-multiselectable') === 'true' || false;

  Array.prototype.forEach.call(accordion_elements, el => {
      let btn = el.querySelector('button');
      let target = el.nextElementSibling;

      let expanded = btn.getAttribute('aria-expanded') === 'true' || false;
      target.hidden = !expanded;

      btn.onclick = () => {
        let expanded = btn.getAttribute('aria-expanded') === 'true' || false;

          // Checks if multiple panels can be open at once. If not, closes other panels.
          if (!multiselectable && !expanded) {
              Array.prototype.forEach.call(accordion_elements, el => {
                  let inner_target = el.nextElementSibling;
                  let inner_btn = el.querySelector('button');
                  inner_btn.setAttribute('aria-expanded', expanded);
                  inner_btn.setAttribute('aria-selected', expanded);
                  inner_target.hidden = !expanded;
              });
          }

        btn.setAttribute('aria-expanded', !expanded);
        btn.setAttribute('aria-selected', !expanded);
        target.hidden = expanded;
      }
  });
});
