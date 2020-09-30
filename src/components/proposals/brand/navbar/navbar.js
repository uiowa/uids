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
  var selectedDropdown;


  function mediaqueryresponse(mql){
    if (mql.matches){ // if media query matches

     console.log("The condition " + mql.media + " has been met")
     document.querySelector(".site-links").setAttribute("style", "top: "+0+"px;")

     if(selectedDropdown){
      selectedDropdown.getElementsByClassName('fas')[0].className = 'fas fa-chevron-down'
     }

     if(openDropdown){
      document.getElementById(openDropdown).className= "dropdown-content";

      openDropdown = undefined;
      selectedDropdown = undefined;
     }
     responsive = false;
    }
    else{

      if(selectedDropdown){
        selectedDropdown.getElementsByClassName('fas')[0].className = 'fas fa-chevron-down'
       }

      if(openDropdown){
        document.getElementById(openDropdown).className= "dropdown-content";
        responsive = false;
       }
     console.log("Condition not met yet hide the links")

     document.querySelector(".site-links").className = "site-links";

     responsive = true;
     openDropdown = undefined;
     selectedDropdown = undefined;

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

    var body = document.querySelector('body');
    var nav = document.querySelector('nav');
    console.log(body.clientWidth);
    console.log(nav.clientWidth);

    var diff = body.clientWidth - nav.clientWidth;

    console.log(diff);
    // get width of the entire nav

    // get width of the body

    // if body and nav are not the same

    // subtract and shift the dropdown over to the right

    // get width of the button

    // get width of the dropdown

    // if the


    // same button clicked, toggle close
    if(openDropdown === id){
      document.getElementById(openDropdown).className= "dropdown-content";
      // get the parent button and highlight
      selectedDropdown.className= "dropbtn";
      selectedDropdown.getElementsByClassName('fas')[0].className = 'fas fa-chevron-down'
      openDropdown = undefined;
      selectedDropdown = undefined;
    }else{

      // now check to see if another drop down is open
      if(openDropdown){
        document.getElementById(openDropdown).className= "dropdown-content";

      }
      if(selectedDropdown){
        selectedDropdown.className= "dropbtn";
        selectedDropdown.getElementsByClassName('fas')[0].className = 'fas fa-chevron-down'
      }

      openDropdown = id;
      selectedDropdown= evt;
      var h = evt.offsetHeight ; // padding
      console.log(h);
      console.log('responsive'+responsive);
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
        evt.className= "dropbtn dropdown__selected";
        //flip the chevron

        // evt.getElementsByClassName('fa-chevron-down').className = 'fas fa-chevron-up';
        evt.getElementsByClassName('fas')[0].className = 'fas fa-chevron-up'
      } else {
        x.className = "dropdown-content";
      // x.hidden = true;
        evt.setAttribute("aria-expanded", false);
        evt.getElementsByClassName('fas')[0].className = 'fas fa-chevron-down'
        // get the parent button and highlight
        evt.className= "dropbtn";
      }
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



