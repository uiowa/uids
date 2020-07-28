var isInViewport = function (elem) {
  var bounding = elem.getBoundingClientRect();
  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};


var cta = document.querySelector('[data-uids-cta]');
window.addEventListener('scroll', function (event) {
  if (isInViewport(cta)) {
    cta.classList.add("cta-row__fixed");
  }
}, false);
