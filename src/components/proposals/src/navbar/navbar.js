/*!
 * Navbar v1
 this manages the state of the navbar
 */

(function(exports) {
  "use strict";
  /**
    * @class
  */
  function NavBar () {}

  // Shortcuts to improve speed and size
  var proto = NavBar.prototype;
  proto._selectedDropdown = undefined;
  proto._openDropdown  = undefined;
  proto._mobile  = undefined;

    if (typeof define === 'function' && define.amd) {
        define(function () {
            return  NavBar;
        });
    }
    else if (typeof module === 'object' && module.exports){
        // we have es6 exports
        module.exports =   NavBar;
    }
    else {
      //automatically apply to window object
      exports.uidsUtils = exports.uidsutils || {};
      exports.uidsUtils.navbar =  new NavBar();
    }


})(typeof window !== "undefined" ? window : this || {});




