// @todo Add ability to have multiple sliders on a page.
const elements = document.getElementsByClassName('slider__slide');

for (let i = 0; i < elements.length; i++) {
  elements[i].onmouseover = elements[i].onfocus = function () {
    setActiveSlide(this);
  };
}

const setAriaFalse = () => {
  for (let i = 0; i < elements.length; i++) {
    let el = elements.item(i);
    el.setAttribute('aria-expanded', 'false');
  }
}

const setActiveSlide = element => {
  setAriaFalse(elements);
  element.setAttribute('aria-expanded', 'true');
}

document.addEventListener('keyup', (event) => {
  keyHandler(event);
}, false);

const keyHandler = function(event) {
  if (event.keyCode === 37) {
    // left - previous
    let index = getActiveSlideIndex();
    if (index !== false && index > 0) {
      // @todo Allow looping?
      setActiveSlide(elements[index-1]);
    }
  } else if (event.keyCode === 39) {
    // right - next
    let index = getActiveSlideIndex();
    if (index !== false && index < elements.length-1) {
      setActiveSlide(elements[index+1]);
    }
  }
}

const getActiveSlideIndex = () => {
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].getAttribute('aria-expanded') === 'true') {
      return i;
    }
  }

  return false;
}
