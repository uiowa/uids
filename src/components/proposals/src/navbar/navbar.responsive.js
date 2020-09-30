(function(exports) {
  "use strict";
  /**
    * @class
    * named function because anonymous functions are not helpful in the debugger
  */
  function NavBarResponsive () {}

  var navbar = exports.uidsUtils.navbar

  function reset(){

    navbar.selectedDropdown = undefined;
    navbar.openDropdown = undefined;
  }

  function check(mql){

    if (mql.matches){// desktop
      console.log("The condition " + mql.media + " has been met")
      // reset the site links to top 0,
      document.querySelector(".site-links").setAttribute("style", "top: "+0+"px;")
      //and remove the responsive from site-links
      document.querySelector(".site-links").className = "site-links";
      if(navbar.selectedDropdown){
        navbar.selectedDropdown.className = 'dropbtn'
        navbar.selectedDropdown.getElementsByClassName('fas')[0].className = 'fas fa-chevron-down'
      }


      if(navbar.openDropdown){
        document.getElementById(navbar.openDropdown).className= "dropdown-content";
      }
      navbar.mobile = false;
      reset();



    }

  }


  function checkMobile(mql){


  if (mql.matches){
    console.log("The condition " + mql.media + " has not been met")

    if(navbar.selectedDropdown){
      navbar.selectedDropdown.className = 'dropbtn'
      navbar.selectedDropdown.getElementsByClassName('fas')[0].className = 'fas fa-chevron-down'
    }

    if(navbar.openDropdown){
      document.getElementById(navbar.openDropdown).className= "dropdown-content";
      navbar.mobile = false;
    }

      navbar.mobile = true;
      reset();

    }

  }

  function checklarge(mql){

    if (mql.matches){ // if media query matches
      console.log("The condition " + mql.media + " has been met")
      if(navbar.selectedDropdown){
        navbar.selectedDropdown.className = 'dropbtn'
        navbar.selectedDropdown.getElementsByClassName('fas')[0].className = 'fas fa-chevron-down'
      }


      if(navbar.openDropdown){
        document.getElementById(navbar.openDropdown).className= "dropdown-content";
      }
      navbar.mobile = false;
      reset();

    }

  }

  var mqlLarge = window.matchMedia('(min-width: 84.375em)');
  checklarge(mqlLarge);


  var mqlMedium = window.matchMedia('(min-width: 855px ) and (max-width: 967px)');
  check(mqlMedium);

  var mqlMobile = window.matchMedia('(max-width: 854px )');
  checkMobile(mqlMobile);

  mqlLarge.addListener(checklarge); // attach listener function to listen in on state changes
  mqlMedium.addListener(check);// attach listener function to listen in on state changes
  mqlMobile.addListener(check);

})(typeof window !== "undefined" ? window : this || {});


