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
  var responsive;
  var openDropdown;

  function mediaqueryresponse(mql){
    if (mql.matches){ // if media query matches
     console.log("The condition " + mql.media + " has been met")
     document.querySelector(".site-links").setAttribute("style", "top: "+0+"px;")

     if(openDropdown){
      document.getElementById(openDropdown).className= "dropdown-content";
      responsive = false;
     }
    }
    else{

      if(openDropdown){
        document.getElementById(openDropdown).className= "dropdown-content";
        responsive = false;
       }
     console.log("Condition not met yet hide the links")
     document.querySelector(".site-links").className = "site-links";
     responsive = true;
    }
   }

   var mql = window.matchMedia('(min-width: 855px)');
   mediaqueryresponse(mql) // call listener function explicitly at run time
   mql.addListener(mediaqueryresponse) // attach listener function to listen in on state changes


  proto.menuToggle = function menuToggle(evt) {

    var h = document.getElementById("navigation").offsetHeight;
    console.log(h);
    var x = document.getElementById("myTopnav");

    if (x.className === "site-links") {
      x.className += " responsive";
      x.setAttribute("style", "top: "+h+"px;")
    //  x.hidden = false;
      evt.setAttribute("aria-expanded", true);
    } else {
      x.className = "site-links";
      //x.hidden = true;
      evt.setAttribute("aria-expanded", false);
    }
  }

  proto.dropDown = function dropDown(evt, id) {


    if(openDropdown){
      document.getElementById(openDropdown).className= "dropdown-content";
     }

    openDropdown = id;
    var h = evt.offsetHeight - 3; // padding
    console.log(h);
    console.log(responsive);
    var x = document.getElementById(id);
    if (x.className === "dropdown-content") {
      x.className += " open";
      if(!responsive){
        x.setAttribute("style", "top: "+h+"px;");
      }else{
      x.setAttribute("style", "top: "+0+"px;");
      }
     // x.hidden = false;
      evt.setAttribute("aria-expanded", true);
    } else {
      x.className = "dropdown-content";
     // x.hidden = true;
      evt.setAttribute("aria-expanded", false);
    }
  }
//https://oli.me.uk/exporting-through-amd-commonjs-and-the-global-object/
  // Expose the class either via AMD, CommonJS or the global object
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



