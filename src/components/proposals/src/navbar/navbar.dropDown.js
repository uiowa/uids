(function(exports) {
  "use strict";
  /**
    * @class
  */
  function NavBarResponsive () {}

  console.log(exports.uidsUtils);

    var navbar = exports.uidsUtils.navbar
  console.log(navbar.selectedDropdown);


   // var navbar.openDropdown;
    var body = document.querySelector('body');
    var nav = document.querySelector('nav');

  exports.uidsUtils.navbar.dropDown = function(evt, id) {

    console.log(navbar.selectedDropdown);

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
    if(navbar.openDropdown === id){

      document.getElementById(navbar.openDropdown).className= "dropdown-content";
      // get the parent button and highlight
      navbar.selectedDropdown.className= "dropbtn";
      navbar.selectedDropdown.getElementsByClassName('fas')[0].className = 'fas fa-chevron-down'
      navbar.openDropdown = undefined;
      navbar.selectedDropdown = undefined;

    }else{

      // now check to see if another drop down is open
      if(navbar.openDropdown){
        document.getElementById(navbar.openDropdown).className= "dropdown-content";

      }
      if(navbar.selectedDropdown){
        navbar.selectedDropdown.className= "dropbtn";
        navbar.selectedDropdown.getElementsByClassName('fas')[0].className = 'fas fa-chevron-down'
      }

      navbar.openDropdown = id;
      navbar.selectedDropdown = evt;
      var h = evt.offsetHeight ; // padding
      console.log(h);
      console.log('responsive'+navbar.mobile);
      var x = document.getElementById(id);
      if (x.className === "dropdown-content") {
        x.className += " open";
        if(!navbar.mobile){
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

})(typeof window !== "undefined" ? window : this || {});


