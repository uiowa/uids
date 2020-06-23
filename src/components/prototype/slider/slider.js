const elements = document.getElementsByClassName("slider__slide");
console.log(elements);
for (let i = 0; i < elements.length; i++) {
  elements[i].onmouseover = elements[i].onfocus = function () {
    // remove attribute from sibling
    let el = elements[0];
    console.log(el)
    while (el) {
      //remove attribute
      el.setAttribute("aria-expanded", "false");
      // @todo Remove this if not necessary.
      if (el.tagName === "A") {
      }
      // pass the attribute to sibling
      el = el.nextSibling;
    }
    this.setAttribute("aria-expanded", "true");
  };
  elements[i].onmouseout = elements[i].onfocus = function () {
    let el = elements[0];
    console.log(el)
    while (el) {
      //remove attribute
      el.setAttribute("aria-expanded", "false");
      // @todo Remove this if not necessary.
      if (el.tagName === "A") {
      }
      // pass the attribute to sibling
      el = el.nextSibling;
    }
    elements[0].setAttribute("aria-expanded", "true");
  };
}
