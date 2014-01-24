// GLOBAL VARIABLES
var username = null, 
    password = null, 
    displayname = null, 
    email = null, 
    tel = null, 
    gender = 0, 
    birthdate = null, 
    quote = null, 
    interest_action = false, 
    interest_adventure = false, 
    interest_role_playing = false, 
    interest_simulation = false, 
    interest_sports = false, 
    interest_strategy = false, 
    country = 0;

// INITIATE ON PAGE LOAD
function initiateProfile() {
  // See if there is someone already logged in.
  var user = sessionStorage.getItem("user-username");
  
  // If there isn't someone logged in , or it isn't the admin,
  if(user) {
    populateProfile(user);
  }
}

// POPULATE PROFILE FIELDS
function populateProfile(username) {
  var transaction = database.transaction(["profile"], "readonly");
  var store = transaction.objectStore("profile");
  
  var request = store.get(username);
  var password = 'password';
  
  request.addEventListener("success", populateProfileFields);
  request.addEventListener('error', errorDB);
}

function populateProfileFields(e) {
  var result = e.target.result;
  
  if(result) {
    username = result.username;
    password = result.password;
    displayname = result.displayname;
    email = result.email;
    tel = result.tel;
    gender = result.gender;
    birthdate = result.birthdate;
    quote = result.quote;
    interest_action = result.interest_action;
    interest_adventure = result.interest_adventure;
    interest_role_playing = result.interest_role_playing;
    interest_simulation = result.interest_simulation;
    interest_sports = result.interest_sports;
    interest_strategy = result.interest_strategy;
    country = result.country;
    
    if(email == undefined) {
      email = null;
    }
    if(tel == undefined) {
      tel = null;
    }
    if(gender == undefined) {
      gender = 0;
    }
    if(birthdate == undefined) {
      birthdate = null;
    }
    if(quote == undefined) {
      quote = null;
    }
    if(interest_action == undefined) {
      interest_action = null;
    }
    if(interest_adventure == undefined) {
      interest_adventure = null;
    }
    if(interest_role_playing == undefined) {
      interest_role_playing = null;
    }
    if(interest_simulation == undefined) {
      interest_simulation = null;
    }
    if(interest_sports == undefined) {
      interest_sports = null;
    }
    if(interest_strategy == undefined) {
      interest_strategy = null;
    }
    if(country == undefined) {
      country = 0;
    }
    
    setFieldValues();
  } else {
    displayMsgBox(
      'Unexpected Error', 
      'No results to populates fields.'
    );
  }
}

function setFieldValues() {
  var form = document.getElementById('profile');
  
  form.displayname.value = displayname;
  form.username.value = username;
  form.password.value = password;
  form.email.value = email;
  form.telephone.value = tel;
  form.gender[gender].checked = true;
  form.birthdate.value = birthdate;
  form.quote.value = quote;
  form.interest_action.checked = interest_action;
  form.interest_adventure.checked = interest_adventure;
  form.interest_role_playing.checked = interest_role_playing;
  form.interest_simulation.checked = interest_simulation;
  form.interest_sports.checked = interest_sports;
  form.interest_strategy.checked = interest_strategy;
  form.country.selectedIndex = country;
}

// SAVE PROFILE
function getFieldValues() {
  var form = document.getElementById('profile');
  
  username = form.username.value;
  password = form.password.value;
  displayname = form.displayname.value;
  email = form.email.value;
  tel = form.telephone.value;
  for(i = 0; i < form.gender.length; i++) {
    if(form.gender[i].checked) {
      gender = form.gender[i].value;
    }
  }
  birthdate = form.birthdate.value;
  quote = form.quote.value;
  if(form.interest_action.checked) {
    interest_action = 1;
  } else {
    interest_action = 0;
  }
  if(form.interest_adventure.checked) {
    interest_adventure = 1;
  } else {
    interest_adventure = 0;
  }
  if(form.interest_role_playing.checked) {
    interest_role_playing = 1;
  } else {
    interest_role_playing = 0;
  }
  if(form.interest_simulation.checked) {
    interest_simulation = 1;
  } else {
    interest_simulation = 0;
  }
  if(form.interest_sports.checked) {
    interest_sports = 1;
  } else {
    interest_sports = 0;
  }
  if(form.interest_strategy.checked) {
    interest_strategy = 1;
  } else {
    interest_strategy = 0;
  }
  country = form.country.selectedIndex;
}
  

function saveProfileDB() {
  getFieldValues();
  
  var transaction = database.transaction(["profile"], "readwrite");
  var store = transaction.objectStore("profile");
  
  var request = store.put({
    username: username, 
    password: password, 
    displayname: displayname, 
    email: email, 
    tel: tel, 
    gender: gender, 
    birthdate: birthdate, 
    quote: quote, 
    interest_action: interest_action, 
    interest_adventure: interest_adventure, 
    interest_role_playing: interest_role_playing, 
    interest_simulation: interest_simulation, 
    interest_sports: interest_sports, 
    interest_strategy: interest_strategy, 
    country: country
  });
  
  sessionStorage.setItem("user-username", username);
  sessionStorage.setItem("user-displayname", displayname);
  
  window.location.reload();
}

function saveProfile_click(e) {
  displayOptionBox('Save Profile', 'Are you sure you want to save?', 'saveProfileDB()');
}

function resetProfile_click(e) {
  e.preventDefault();
  displayOptionBox('Reset Profile', 'Are you sure you want to reset?', 'window.location = \'../profile\'');
}

//INITIATE PAGE LOAD
window.removeEventListener('load', main, false);
window.addEventListener('load', function(){initiate(function(){initiateProfile();});}, false);