
var uidsUtils =  uidsUtils || {} ;
uidsUtils.menuToggle = function() {
  var x = document.getElementById("myTopnav");
  if (x.className === "right-links") {
    x.className += " responsive";
  } else {
    x.className = "right-links";
  }
}
uidsUtils.dropDown = function(id) {
  var x = document.getElementById(id);
  if (x.className === "dropdown-content") {
    x.className += " open";
  } else {
    x.className = "dropdown-content";
  }
}




