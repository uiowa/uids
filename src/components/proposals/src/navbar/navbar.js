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

  var proto = NavBar.prototype;
  proto._selectedDropdown = undefined;
  proto._openDropdown  = undefined;
  proto._mobile  = undefined;

  proto.menuToggle= function menuToggle(evt) {

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

  }

  proto.dropDown = function dropDowns(evt, id) {
    // todo handle overflow of drop down on the right
    // var body = document.querySelector('body');
    // var nav = document.querySelector('nav');
    //var navbar = exports.uidsUtils.navbar;
    // console.log(navbar.selectedDropdown);

    // console.log(body.clientWidth);
    // console.log(nav.clientWidth);

    // var diff = body.clientWidth - nav.clientWidth;

    // console.log(diff);
    // get width of the entire nav
    // get width of the body
    // if body and nav are not the same
    // subtract and shift the dropdown over to the right
    // get width of the button
    // get width of the dropdown
    // if the

    // same button clicked, toggle close
    if(proto._openDropdown === id){

      document.getElementById(proto._openDropdown).className= "dropdown-content";
      // get the parent button and highlight
      proto._selectedDropdown.className= "dropbtn";
      proto._selectedDropdown.getElementsByClassName('fas')[0].className = 'fas fa-chevron-down'
      proto._openDropdown = undefined;
      proto._selectedDropdown = undefined;

    }else{

      // now check to see if another drop down is open
      if(proto._openDropdown){
        document.getElementById(proto._openDropdown).className= "dropdown-content";

      }
      if(proto._selectedDropdown){
        proto._selectedDropdown.className= "dropbtn";
        proto._selectedDropdown.getElementsByClassName('fas')[0].className = 'fas fa-chevron-down'
      }

      proto._openDropdown= id;
      proto._selectedDropdown = evt;
      var h = evt.offsetHeight ; // padding

      var x = document.getElementById(id);
      if (x.className === "dropdown-content") {
        x.className += " open";
        if(!proto._mobile ){
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

  function _reset(){

    proto._selectedDropdown = undefined;
    proto._openDropdown  = undefined;
  }

  function _checkMedium(mql){

    if (mql.matches){// desktop
      //console.log("The condition " + mql.media + " has been met")
      // reset the site links to top 0,
      document.querySelector(".site-links").setAttribute("style", "top: "+0+"px;")
      //and remove the responsive from site-links
      document.querySelector(".site-links").className = "site-links";
      if(proto._selectedDropdown){
        proto._selectedDropdown.className = 'dropbtn'
        proto._selectedDropdown.getElementsByClassName('fas')[0].className = 'fas fa-chevron-down'
      }


      if(proto._openDropdown){
        document.getElementById(proto._openDropdown).className= "dropdown-content";
      }
      proto._mobile  = false;
      _reset();

    }

  }

  function _checkMobile(mql){


  if (mql.matches){
    //console.log("The condition " + mql.media + " has not been met")

    if(proto._selectedDropdown){
      proto._selectedDropdown.className = 'dropbtn'
      proto._selectedDropdown.getElementsByClassName('fas')[0].className = 'fas fa-chevron-down'
    }

    if(proto._openDropdown){
      document.getElementById(proto._openDropdown).className= "dropdown-content";
      proto._mobile  = false;
    }

    proto._mobile  = true;
      _reset();

    }

  }

  function _checkLarge(mql){

    if (mql.matches){ // if media query matches
      //console.log("The condition " + mql.media + " has been met")
      if(proto._selectedDropdown){
        proto._selectedDropdown.className = 'dropbtn'
        proto._selectedDropdown.getElementsByClassName('fas')[0].className = 'fas fa-chevron-down'
      }


      if(proto._openDropdown){
        document.getElementById(proto._openDropdown).className= "dropdown-content";
      }
      proto._mobile  = false;
      _reset();

    }

  }

  var mqlLarge = window.matchMedia('(min-width: 84.375em)');
  _checkLarge(mqlLarge);


  var mqlMedium = window.matchMedia('(min-width: 855px ) and (max-width: 84.375em)');
  _checkMedium(mqlMedium);

  var mqlMobile = window.matchMedia('(max-width: 854px )');
  _checkMobile(mqlMobile);

  mqlLarge.addListener(_checkLarge); // attach listener function to listen in on state changes
  mqlMedium.addListener(_checkMedium);// attach listener function to listen in on state changes
  mqlMobile.addListener(_checkMobile);

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




