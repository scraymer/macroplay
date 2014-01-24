// GLOBAL VARIABLES
var maxim, mmedia, play, bar, progress, mute, volume, loop;

// LOCAL VIDEO LINKS
/*
var video1 = "../lib/video/The_Last_of_Us_Gamescom_2012_Trailer.mp4";
var video2 = "../lib/video/The_Last_of_Us_E3_2012_Gameplay_Demo.mp4";
var video3 = "../lib/video/V-en_us-trailer1-mp4-1280.mp4";
*/

// PUBLIC VIDEO LINKS
var video1 = "https://dl.dropbox.com/u/36151686/sites/video/The_Last_of_Us_Gamescom_2012_Trailer.mp4";
var video2 = "https://dl.dropbox.com/u/36151686/sites/video/The_Last_of_Us_E3_2012_Gameplay_Demo.mp4";
var video3 = "https://dl.dropbox.com/u/36151686/sites/video/V-en_us-trailer1-mp4-1280.mp4";

// ORIGINAL BROKEN VIDEO LINKS
/*
var video1 = "http://media1.gamefront.com/guploads/201208/14/12/The_Last_of_Us_Gamescom_2012_Trailer.mp4?b17f4b620c6cf1393ffa644d11eea151ee12995c6f2461e126e601ef5a3f0f0569ff16138594a2f1b165ec34369665246886bad947e7bbd9031439239dd95470da06dc957c993efe64a0b1fd17cf19d4d61694107f976184399c5844d6e6d9f84450145175bda18356112da06b5b3623ffe2738a52d481";
var video2 = "http://media1.gamefront.com/guploads/201206/04/19/The_Last_of_Us_E3_2012_Gameplay_Demo.mp4?b17f4b620c6cf1393ffa644d11eea151ee12995c6f2461e126e601ef5a3f0f0569ff16138594a2f1b165ec34369665246886bad947e7bbd9031439239dd95a70a17ecbfe2d7a84fcacae2cb7efe0eb7d8856ee21a678d3bf27ba215300bd44c443078c04edc4bddba02583eb212f0a6ee235d6aa26829a";
var video3 = "http://media1.gamefront.com/guploads/201111/02/09/V-en_us-trailer1-mp4-1280.mp4?b17f4b620c6cf1393ffa644d11eea151ee12995c6f2461e126e601ef5a3f0f0569ff16138594a2f1b165ec34369665246886bad947e7bbd9031439239ed85d703eb8c42d97c1565270ad4713f1e291d6d7ff15384c429fc5cf6277b6261dbaa37c15ba1d6d31d94ce40879aa67f54da0351d8d2d5ec3c7";
*/

// INITIATE ON PAGE LOAD
function initiateVideo() {
  maxim = 300;
  
  mmedia = document.getElementById('player');
  play = document.getElementById('player-play');
  bar = document.getElementById('player-bar');
  progress = document.getElementById('player-progress');
  mute = document.getElementById('player-mute');
	volume = document.getElementById('player-volume');
  
  play.addEventListener('click', push, false);
	mute.addEventListener('click', sound, false);
	bar.addEventListener('click', move, false);
	volume.addEventListener('click', level, false);
	
	mmedia.pause(true);
  play.value='Play';
	window.clearInterval(loop);
	mmedia.src = video1;
  mmedia.setAttribute('data-src', '1');
	mmedia.load();
	
	if (navigator.userAgent.indexOf("Firefox") != -1 && document.title == "MacroPlay | Video") {
    volume.style.display = "none";
    bar.style.width = "410px";
    maxim = 410;
	}
	
	if(window.getComputedStyle(document.body).getPropertyValue('content') == "max-width-999px") {
    volume.style.display = "none";
    bar.style.width = "238px";
    maxim = 238;
  }
}


// VIDEO PLAYER FUNCTIONS
function push() {
	if(!mmedia.paused && !mmedia.ended) {
		mmedia.pause();
		play.value='Play';
		window.clearInterval(loop);
	} else {
		mmedia.play();
		play.value='Pause';
		loop=setInterval(status, 1000);
	}
}

function status() {
	if(!mmedia.ended) {
		var size = parseInt(mmedia.currentTime*maxim/mmedia.duration);
		progress.style.width=size+'px';
	} else {
		progress.style.width='0px';
		play.value = 'Play';
		window.clearInterval(loop);
	}
}

function move(e) {
	if(!mmedia.paused && !mmedia.ended) {
		var mouseX=e.pageX-bar.offsetLeft;
		var newTime = mouseX*mmedia.duration/maxim;
		mmedia.currentTime = newTime;
		progress.style.width = mouseX+'px';
	}
}

function sound() {
	if(mute.value == 'Mute') {
		mmedia.muted=true;
		mute.value = 'Unmute';
	} else {
		mmedia.muted = false;
		mute.value = 'Mute';
	}
}

function level() {
	mmedia.volume = volume.value;
}

function prev() {
  var cur = 0;
  
  if(mmedia.getAttribute('data-src')) {
    cur = mmedia.getAttribute('data-src');
  }
  
  mmedia.pause(true);
  play.value='Play';
  window.clearInterval(loop);
  
  switch(cur) {
    case '1':
      mmedia.src = video3;
      mmedia.setAttribute('data-src', '3');
      break;
    case '2':
      mmedia.src = video1;
      mmedia.setAttribute('data-src', '1');
      break;
    case '3':
      mmedia.src = video2;
      mmedia.setAttribute('data-src', '2');
      break;
    default:
      mmedia.src = video1;
      mmedia.setAttribute('data-src', '1');
  }
  
  mmedia.load();
  
  mmedia.play();
  play.value='Pause';
  loop=setInterval(status, 1000);
}

function next() {
  
  var cur = 0;
  
  if(mmedia.getAttribute('data-src')) {
    cur = mmedia.getAttribute('data-src');
  }
  
  mmedia.pause(true);
  play.value='Play';
  window.clearInterval(loop);
  
  switch(cur) {
    case '1':
      mmedia.src = video2;
      mmedia.setAttribute('data-src', '2');
      break;
    case '2':
      mmedia.src = video3;
      mmedia.setAttribute('data-src', '3');
      break;
    case '3':
      mmedia.src = video1;
      mmedia.setAttribute('data-src', '1');
      break;
    default:
      mmedia.src = video1;
      mmedia.setAttribute('data-src', '1');
  }
  
  mmedia.load();
  
  mmedia.play();
  play.value='Pause';
  loop=setInterval(status, 1000);
}

function fullscreen() {
	var video, player, play;
	
	video = document.getElementById('player');
	player = document.getElementById('player-container');
	
	var browserDetect = navigator.userAgent;
	
	if (browserDetect.search("Firefox") > -1) { 
    if(!document.mozFullscreenElement) {
      player.mozRequestFullscreen();
      play.value = "Pause";
      video.play();
    } else {
      document.mozExitFullscreen();
      play.value = "Pause";
      video.pause();
    }
  } else if (browserDetect.search("Chrome") > -1) {
    if(!document.webkitFullscreenElement) {
      player.webkitRequestFullscreen();
      play.value = "Pause";
      video.play();
    } else {
      document.webkitExitFullscreen();
      play.value = "Pause";
      video.pause();
    }
 	}	
}

//INITIATE PAGE LOAD
window.removeEventListener('load', main, false);
window.addEventListener('load', function(){initiate(function(){initiateVideo();});}, false);