// GLOBAL VARIABLES
var database;
var canvas;
var img;
var timeToFade;
var timeToMove;

// INITIATE ON PAGE LOAD
function main() {
  initiate(null);
}

function initiate(callback) {
  var themeId = localStorage.getItem("theme");
  
  if(themeId && window.getComputedStyle(document.body).getPropertyValue('content') != "max-width-999px") {
    changeTheme(themeId);
    var themes = document.getElementById('themeOptions');
    for(var i, j = 0; i = themes.options[j]; j++) {
      if(i.value == themeId) {
        themeOptions.selectedIndex = j;
      }
    }
  }
	
	var locStore = document.getElementById('locStore-btn');
	locStore.addEventListener('click', locStore_click);
  
  openDB(callback);
  
  if(sessionStorage.getItem('user-username')) {
    loggedIn(sessionStorage.getItem('user-displayname'));
  }
  
  if(!localStorage.getItem('site-lastVisit') && window.getComputedStyle(document.body).getPropertyValue('content') != "max-width-999px") {
    displayAnimation();
    localStorage.setItem('site-lastVisit', new Date().getTime());
  }
  
  document.getElementById('banner').addEventListener('click', displayAnimation, false);
}

// GLOBAL FUNCTIONS
function animateFadeOut(lastTick, eid) {
  var curTick = new Date().getTime();
  var elapsedTicks = curTick - lastTick;

  var element = document.getElementById(eid);

  if (element.FadeTimeLeft <= elapsedTicks) {
    element.style.opacity = element.FadeState == 1 ? '1' : '0';
    element.style.filter = 'alpha(opacity = ' + (element.FadeState == 1 ? '100' : '0') + ')';
    element.FadeState = element.FadeState == 1 ? 2 : -2;
    element.style.display = '';
    element.style.opacity = '';
    element.FadeState = null;
    if(eid == 'canvas') {
      fadeOut('canvas-bg');
    }
    return;
  }

  element.FadeTimeLeft -= elapsedTicks;
  var newOpVal = element.FadeTimeLeft / timeToFade;
  if (element.FadeState == 1) {
    newOpVal = 1 - newOpVal;
  }

  element.style.opacity = newOpVal;
  element.style.filter = 'alpha(opacity = ' + (newOpVal * 100) + ')';

  setTimeout("animateFadeOut(" + curTick + ",'" + eid + "')", 33);
}

function animateLogo(callback, x, y){
	
	if(x < 162) {
	  canvas.clearRect(0, 0, 728, 90);
    canvas.drawImage(img, x, y);
    x++;
    if(x > 130 && timeToMove < 30) {
      timeToMove++;
    }
    setTimeout(function(){animateLogo(callback, x, y)}, timeToMove);
	} else {  
    callback();
	  return;
  }
}

function changeTheme(theme, save) {
  if (save === undefined) save = true;

  var body = document.body;
  var banner = document.getElementById('banner');
  var footer = document.getElementById('footer');
  
  //precaution to make sure the banner is correctly sized
  banner.style.width = "728px";
  banner.style.height = "90px";
  
  if(theme != 'default' || theme == null) {
    
    body.style.background = "url(../lib/img/backgroundAd_"+theme+".jpg) center top no-repeat fixed";
    
    banner.style.background = "rgba(250, 250, 250, 0) url(../lib/img/bannerAd_"+theme+".jpg) no-repeat center top";
    banner.style.border = "none";
    
    footer.style.color = "rgb(250, 250, 250)";
    
  } else {
    
    body.style.background = "";
    
    banner.style.background = "";
    banner.style.border = "";
    
    footer.style.color = "";
  }
  
  if(save) {
    localStorage.setItem("theme", theme);
  }
}

function createDB(e) {
  var db = e.target.result;
  
  if (db.objectStoreNames.contains('profile')){
		db.deleteObjectStore('profile');
	}
  
  var object = db.createObjectStore('profile', {keyPath: "username"});
  
  object.createIndex('password', 'text', {unique: false});
  object.createIndex('displayname', 'text', {unique: false});
  object.createIndex('email', 'text', {unique: false});
  object.createIndex('tel', 'text', {unique: false});
  object.createIndex('gender', 'int', {unique: false});
  object.createIndex('birthdate', 'date', {unique: false});
  object.createIndex('quote', 'text', {unique: false});
  object.createIndex('interest_action', 'int', {unique: false});
  object.createIndex('interest_adventure', 'int', {unique: false});
  object.createIndex('interest_role_playing', 'int', {unique: false});
  object.createIndex('interest_simulation', 'int', {unique: false});
  object.createIndex('interest_sports', 'int', {unique: false});
  object.createIndex('interest_strategy', 'int', {unique: false});
  object.createIndex('country', 'int', {unique: false});
  
  var request = object.put({username:'admin', password:'admin', displayname:'admin'});
  //request.addEventListener("success", function(e){alert("Admin user added!");});
}

function displayAnimation() {
  timeToFade = 2000;
  timeToMove = 5;
  
  var canvasFG = document.getElementById("canvas");
  var canvasBG = document.getElementById('canvas-bg');
  
  canvasFG.style.display = 'block';
  canvasBG.style.display = 'block';
  
  canvas = canvasFG.getContext("2d");
  canvas.clearRect(0, 0, 728, 90);
  
  img = document.createElement('img');
	img.setAttribute('src', '../lib/themes/macroplay/img/logo.png'); 
	img.addEventListener('load', function(){animateLogo(function(){fadeOut('canvas');}, -72, 9);});
}

function displayMsgBox(title, body) {
  var msgBox = document.getElementById('msgBox');
	var msgTitle = msgBox.getElementsByClassName ('msgBox-title')[0];
	var msgBody = msgBox.getElementsByClassName ('msgBox-body')[0];
	var msgAction = msgBox.getElementsByClassName ('msgBox-action')[0];
	
	msgTitle.innerHTML = '<h1>' + title + '</h1>';
	msgBody.innerHTML = body;
	msgAction.innerHTML = '<button onclick="document.getElementById(\'msgBox\').style.display=\'none\';">Close</button>';
	
	msgBox.style.display = 'block';
}

function displayOptionBox(title, body, action) {
  var msgBox = document.getElementById('msgBox');
	var msgTitle = msgBox.getElementsByClassName ('msgBox-title')[0];
	var msgBody = msgBox.getElementsByClassName ('msgBox-body')[0];
	var msgAction = msgBox.getElementsByClassName ('msgBox-action')[0];
	
	msgTitle.innerHTML = '<h1>' + title + '</h1>';
	msgBody.innerHTML = body;
	msgAction.innerHTML = '<button onclick="'+action+'">Yes</button>&nbsp;&nbsp;&nbsp;<button onclick="document.getElementById(\'msgBox\').style.display=\'none\';">No</button>';
	
	msgBox.style.display = 'block';
}

function displayStoreErr(e) {
	displayMsgBox(
	  'Store Location', 
	  'Sorry, we were unable to get your location.'
	);
}

function displayStoreLoc(p) {
	displayMsgBox(
	  'Store Location', 
	  'You are ' + distanceToStore(p) + ' km away from the MacroPlay retail store in Ottawa.'
	);
}

function distanceToStore(p) {
	var latC = p.coords.latitude;
	var longC = p.coords.longitude;
	
	var x = Math.pow((longC + 75), 2);
	var y = Math.pow((latC - 45), 2);
	
	var z = Math.sqrt(x + y);
	
	return Math.round(z * 79);
}

function errorDB(e){
  displayMsgBox(
    'ERROR', 
    'Their seems to be a problem with the database. See below for details.<br /><br />Error: ' + e.code + ' - ' + e.message
  );
}

function fadeOut(eid) {
    
    var element = document.getElementById(eid);
    if (element == null) return;

    if (element.FadeState == null) {
        if (element.style.opacity == null || element.style.opacity == '' || element.style.opacity == '1') {
            element.FadeState = 2;
        } else {
            element.FadeState = -2;
        }
    }

    if (element.FadeState == 1 || element.FadeState == -1) {
        element.FadeState = element.FadeState == 1 ? -1 : 1;
        element.FadeTimeLeft = timeToFade - element.FadeTimeLeft;
    } else {
        element.FadeState = element.FadeState == 2 ? -1 : 1;
        element.FadeTimeLeft = timeToFade;
        setTimeout("animateFadeOut(" + new Date().getTime() + ",'" + eid + "')", 33);
    }
}

function loggedIn(displayname) {
  document.getElementById('form-login-label').innerHTML = 'Hello ' + displayname;
  document.getElementById('form-login').style.display = 'none';
  document.getElementById('form-logout').style.display = 'block';
}

function openDB(callback) {
  var db = indexedDB.open("macroplay");
  
  db.addEventListener('error', errorDB);
  if(callback != null) {
    db.addEventListener('success', function(e){startDB(e); callback();});
  } else {
    db.addEventListener('success', startDB);
  }
  db.addEventListener('upgradeneeded', createDB);
}

function resize() {
  if(window.getComputedStyle(document.body).getPropertyValue('content') == "max-width-999px") {
    changeTheme('default', false);
  } else {
    var theme = localStorage.getItem("theme")
    if(theme === undefined) {
      changeTheme('default', false);
    } else {
      changeTheme(theme, false);
    }
  }
}

function startDB(e) {
  database = e.target.result;
  //indexedDB.deleteDatabase('macroplay'); /* for testing */
}

function validate(e, username, password) {
  var result = e.target.result;
  
  if(result && result.username == username  && result.password == password) {
    sessionStorage.setItem("user-username", result.username);
    sessionStorage.setItem("user-displayname", result.displayname);
    window.location.reload();
  } else {
    displayMsgBox(
      'Login Failed', 
      'Either the username or password that you entered was incorrect. <br /><br />If you do not have an account with MacroPlay, please vist the <a href="../profile/" />profile</a> page to create your own free account.'
    );
  }
}

// GLOBAL EVENTS
function locStore_click() {
  displayMsgBox(
    'Store Location', 
    '<img src="../lib/themes/macroplay/img/loading.gif" alt="LOADING" height="30px" width="30px" />'
  );
  
	var geoconfig = {enableHighAccuracy:true, timeout:10000, maximumAge:60000};
	navigator.geolocation.getCurrentPosition(displayStoreLoc, displayStoreErr, geoconfig);
}

function login_click() {
  var username = document.getElementById('form-login-username').value;
  var password = document.getElementById('form-login-password').value;
  
  var transaction = database.transaction(["profile"], "readonly");
  var store = transaction.objectStore("profile");
  
  var request = store.get(username);
  
  request.addEventListener("success", function(e){ validate(e, username, password)});
  request.addEventListener('error', errorDB);
}

function logout_click() {
  sessionStorage.removeItem('user-username');
  sessionStorage.removeItem('user-displayname');
  window.location.reload();
}

//INITIATE PAGE LOAD
window.addEventListener('load', main, false);
window.addEventListener('resize', resize, false);