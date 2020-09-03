/*!
 * Navbar v1
 */

(function(exports) {
  "use strict";
  /**
    * @class
  */
  function NavBar () {}

  // Shortcuts to improve speed and size
  var proto = NavBar.prototype;

  proto.menuToggle = function menuToggle(evt) {
    var x = document.getElementById("myTopnav");
    if (x.className === "right-links") {
      x.className += " responsive";
      x.hidden = false;
      evt.setAttribute("aria-expanded", true);
    } else {
      x.className = "right-links";
      x.hidden = true;
      evt.setAttribute("aria-expanded", false);
    }
  }

  proto.dropDown = function dropDown(evt, id) {
    var x = document.getElementById(id);
    if (x.className === "dropdown-content") {
      x.className += " open";
      x.hidden = false;
      evt.setAttribute("aria-expanded", true);
    } else {
      x.className = "dropdown-content";
      x.hidden = true;
      evt.setAttribute("aria-expanded", false);
    }
  }

  // Expose the class either via AMD, CommonJS or the global object
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return new NavBar();
        });
    }
    else if (typeof module === 'object' && module.exports){
        // we have es6 exports
        module.exports = new NavBar();
    }
    else {
      //automatically apply to window object
      exports.uidsUtils = exports.uidsutils || {};
      exports.uidsUtils.navbar = new NavBar();
    }


})(typeof window !== "undefined" ? window : this || {});



