// This code loads the YouTube Iframe API asynchronously.
const tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// This function creates an <iframe> (and YouTube player) after the API code downloads.
let players = [];
function onYouTubeIframeAPIReady() {
  // For each youtube-player element on the page...
  const youtubePlayers = document.querySelectorAll('.youtube-player');
  youtubePlayers.forEach(playerContainer => {
    const player = new YT.Player(playerContainer, {
      height: '100%',
      width: '100%',
      videoId: playerContainer.dataset.id,
      playerVars: {
        autoplay: 0,
        controls: 0,
        modestbranding: 1,
        rel: 0,
        showinfo: 0
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
    players.push(player);
  });
}

// This function is called when the video player is ready to play.
function onPlayerReady(event) {
  // Get the necessary DOM elements.
  const container = event.target.getIframe().parentNode.parentNode;
  const button = container.querySelector('.vidbttn');
  const highlight = container.parentNode.querySelector('.highlight__wrapper');
  const media = container.querySelector('.embed-responsive');

  // Add an event listener to the play/pause button to play/pause the video.
  button.addEventListener('click', function () {
    const currentState = event.target.getPlayerState();
    if (currentState === YT.PlayerState.PLAYING) {
      event.target.pauseVideo();
      setVideoState(event.target, false);
    } else {
      stopAllPlayers();
      event.target.playVideo();
      setVideoState(event.target, true);
    }
  });

  // Set the initial state for the video.
  setVideoState(event.target, false);
}

// This function is called when the state of the video player changes.
function onPlayerStateChange(event) {
  // If the video is playing, set the state of all other videos to not playing.
  if (event.data === YT.PlayerState.PLAYING) {
    stopAllPlayers(event.target);
    // Set the state of the current video to playing.
    setVideoState(event.target, true);
  }

  // If the video is paused, set the state of the video to not playing.
  if (event.data === YT.PlayerState.PAUSED) {
    setVideoState(event.target, false);
  }
}

// This function sets the state for a video element.
// It takes a YouTube player object and a boolean for active/not active.
function setVideoState(player, active) {
  // Get the necessary places where classes are set.
  const container = player.getIframe().parentNode.parentNode;
  const button = container.querySelector('.vidbttn');
  const highlight = container.parentNode.querySelector('.highlight__wrapper');
  const media = container.querySelector('.embed-responsive');

  // If the video is active set active classes.
  if (active) {
    container.classList.add('active');
    highlight.classList.add('active');
    button.classList.add('active');
    media.classList.add('active');
  }

  // Else, make sure the video is paused and remove the active classes.
  else {
    player.pauseVideo();

    container.classList.remove('active');
    highlight.classList.remove('active');
    button.classList.remove('active');
    media.classList.remove('active');
  }
}

function stopAllPlayers(currentPlayer) {
  // Get all the players
  var players = document.querySelectorAll(".player");

  // Iterate through the players
  for (var i = 0; i < players.length; i++) {
    // Stop the player if it's not the current one
    if (players[i].id !== currentPlayer.id) {
      players[i].contentWindow.postMessage(
        '{"event":"command","func":"stopVideo","args":""}',
        "*"
      );
    }
  }
}

// Get all video players on the page
var videoPlayers = document.querySelectorAll(".player");

// Iterate through each player and add a click event listener
for (var i = 0; i < videoPlayers.length; i++) {
  var player = videoPlayers[i];
  var playerId = player.id;
  var playerButton = document.getElementById(playerId + "-button");

  // Add a click event listener to the player button
  playerButton.addEventListener("click", function () {
    // Stop all players except for this one
    stopAllPlayers(player);

    // Toggle the play/pause button
    if (playerButton.classList.contains("paused")) {
      player.contentWindow.postMessage(
        '{"event":"command","func":"playVideo","args":""}',
        "*"
      );
      playerButton.classList.remove("paused");
      playerButton.classList.add("playing");
    } else {
      player.contentWindow.postMessage(
        '{"event":"command","func":"pauseVideo","args":""}',
        "*"
      );
      playerButton.classList.remove("playing");
      playerButton.classList.add("paused");
    }

    // Add active class to the player div if video is playing
    if (playerButton.classList.contains("playing")) {
      player.parentElement.classList.add("active");
    } else {
      player.parentElement.classList.remove("active");
    }
  });
}
