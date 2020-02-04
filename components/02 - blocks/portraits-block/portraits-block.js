

// Listen for all clicks on the document
document.addEventListener('click', function () {

  // Bail if it's not a .nav-link
  if (!event.target.classList.contains('player')) return;

  // Add the active class
  event.target.classList.add('active');


  // Get all nav links
 var htmlPlayer = document.getElementsByTagName('video');

  // Loop through each link

for (var i = 0; i < htmlPlayer.length; i++) {
  htmlPlayer[i].onclick = function () {
    if (this.paused || this.ended) {
      if (this.ended) {
        this.currentTime = 0;
      }
      this.play();
    } else {
      this.pause();
    }
  }
}

}, false);



