(function(exports) {
  "use strict";
  /**
    * @class
  */
  function NavMenuToggle () {}

  console.log(exports.uidsUtils);

  exports.uidsUtils.navbar.menuToggle = function menuToggle(evt) {

    var h = document.getElementById("navigation").offsetHeight;
    var x = document.getElementById("myTopnav");

    if (x.className === "site-links") {
      x.className += " responsive";
      x.setAttribute("style", "top: "+h+"px;")
    //  x.hidden = false;
      evt.setAttribute("aria-expanded", true);
    } else {
      x.className = "site-links";
      evt.setAttribute("aria-expanded", false);
    }
    //*/
  }

})(typeof window !== "undefined" ? window : this || {});


