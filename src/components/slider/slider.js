const elements = document.getElementsByClassName('slider__slide');

for (let i = 0; i < elements.length; i++) {
  elements[i].onmouseover = elements[i].onfocus = function () {
    setAriaFalse(elements);
    this.setAttribute("aria-expanded", "true");
  };
  elements[i].onmouseout = elements[i].onfocusout = function () {
    setAriaFalse(elements);
    elements[0].setAttribute("aria-expanded", "true");
  };
}

const setAriaFalse = function(elements) {
  for (let i = 0; i < elements.length; i++) {
    let el = elements.item(i);
    el.setAttribute('aria-expanded', 'false');
  }
}
