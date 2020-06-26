function Slider(element) {
  this.slides = element.getElementsByClassName('slider__slide');

  for (let i = 0; i < this.slides.length; i++) {
    this.slides[i].onmouseover = this.slides[i].onfocus = () => {
      this.setActiveSlide(this.slides[i]);
    };
  }
}

Slider.prototype.setAriaFalse = function() {
  for (let i = 0; i < this.slides.length; i++) {
    let el = this.slides.item(i)
    if (el) {
      el.setAttribute('aria-expanded', 'false');
    }
  }
}

Slider.prototype.setActiveSlide = function(element) {
  this.setAriaFalse();
  element.setAttribute('aria-expanded', 'true');
}

Slider.prototype.getActiveSlideIndex = () => {
  for (let i = 0; i < this.slides.length; i++) {
    if (this.slides[i].getAttribute('aria-expanded') === 'true') {
      return i;
    }
  }

  return false;
}

const sliders = document.getElementsByClassName('slider');

for (let i = 0; i < sliders.length; i++) {
  let slider = new Slider(sliders[i]);
}

// @todo How to scope this properly to function per-slider.
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


