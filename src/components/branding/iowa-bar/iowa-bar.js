const em = require('../../../assets/js/events');

const menuDrawer = document.querySelector('.header-not-sticky .o-canvas__drawer');
const menuDrawerMobile = document.querySelector('.o-canvas__drawer');

function StickyBar(config) {
  if (config.offset) {
    this.offset = config.offset;
  } else {
    this.offset = 0;
  }
  console.log('offset', this.offset);
  this.scrollUp = 'scroll-up';
  this.scrollDown = 'scroll-down';
  this.lastScroll = 0;
  console.log('lastScroll', this.lastScroll);

  // navigation scroll
  em.addListener('scroll', event => {
    this.scrollHandler(event);
  })
  window.addEventListener('scroll', () => {
    em.dispatch('scroll');
  });
}

StickyBar.prototype.scrollHandler = function() {
  console.log('this', this);
  const body = document.body;
  const currentScroll = window.pageYOffset;
  console.log('offset', this.offset);
  console.log('currentScroll', currentScroll);
  console.log('lastScroll', this.lastScroll);
  // remove classes if scrolled all the way up
  if (currentScroll <= this.offset) {
    body.classList.remove(this.scrollUp);
    body.classList.remove(this.scrollDown);
    // @todo Move this to off-canvas.
    if (menuMq.matches) {
      if (menuDrawer) {
        menuDrawer.style.top = Math.max(this.offset - this.scrollY) + 'px';
      }
    } else {
      menuDrawerMobile.style.top = Math.max(this.offset - this.scrollY) + 'px';
    }
    return;
  }
  // if contains lock don't add anything....
  if (currentScroll > this.lastScroll && !body.classList.contains('o-canvas--lock')) {
    // down
    if (currentScroll > this.offset) {
      console.log('scrolling down');
      body.classList.remove(this.scrollUp);
      body.classList.add(this.scrollDown);
    }
  } else if (currentScroll < this.lastScroll && body.classList.contains(this.scrollDown)) {
    console.log('scrolling up');
    // up
    body.classList.remove(this.scrollDown);
    body.classList.add(this.scrollUp);
  }
  this.lastScroll = currentScroll;
}

window.addEventListener('orientationchange', function (event) {
  const afterOrientationChange = function () {
    menuDrawerMobile.style.top = Math.max(header.offsetHeight - this.scrollY) + 'px';
    window.removeEventListener('resize', afterOrientationChange);
  };
  window.addEventListener('resize', afterOrientationChange);
  return;
});

document.addEventListener("DOMContentLoaded", function() {
  const header = document.querySelector('[data-uids-header]');
  const menuMq = window.matchMedia('(min-width: 855px)');

  // @todo Add checking to make sure header exists.
  if (header) {
    window.StickyBar = new StickyBar({
      offset: header.clientHeight,
    });
  }
}, false);
