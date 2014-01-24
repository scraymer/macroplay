// GLOBAL VARIABLES
var tbody_clear = true;
var QueryString = function () {
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for(var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if(typeof query_string[pair[0]] == "undefined") {
      query_string[pair[0]] = pair[1];
    } else if (typeof query_string[pair[0]] == "string") {
      var arr = [query_string[pair[0]], pair[1]];
      query_string[pair[0]] = arr;
    } else {
      query_string[pair[0]].push(pair[1]);
    }
  } 
  return query_string;
}();

// INITIATE ON PAGE LOAD
function initiateAdmin() {
  // See if there is someone already logged in.
	var user = sessionStorage.getItem("user-username");
	
	// If there isn't someone logged in , or it isn't the admin,
	if (!user || (user != "admin"))
	{
		// redirect back to the home page.
		displayMsgBox(
      'Restricted', 
      'Your account does not have the authorization to view the administration page.'
    );
    var msgBox = document.getElementById('msgBox');
    var button = msgBox.getElementsByTagName('button')[0];
		if(QueryString.callback) {
		  msgBox.onclick = function(){window.location = "../" + QueryString.callback + "/";};
		  button.onclick = function(){window.location = "../" + QueryString.callback + "/";};
		} else {
		  msgBox.onclick = function(){window.location = "../index.html";};
		  button.onclick = function(){window.location = "../index.html";};
		}
	} else {
	  populateUsers();
	}
}

function populateUsers() {
  var transaction = database.transaction(["profile"], "readonly");
  var store = transaction.objectStore("profile");
  
  var cursor = store.openCursor();
  
  cursor.addEventListener("success", listUsers);
}

function listUsers(e) {
  var cursor = e.target.result;
  
  if(cursor) {
    if(cursor.value.username != 'admin') {
      addUserRow(cursor.value);
    }
    cursor.continue();
  }
}

function addUserRow(value) {
  var tbody = document.getElementById('admin-table');
  
  if(tbody_clear) {
    tbody.innerHTML = 
      '<tr>' + 
        '<th id="username" class="left">username:</th>' + 
        '<th id="email" class="left">email:</th>' + 
        '<th id="action" class="center">action:</th>' + 
      '</tr>';
    tbody_clear = false;
  }
  
  tbody.innerHTML += 
    '<tr onclick="deleteUser(\'' + value.username + '\');">' + 
      '<td class="left">' + 
        value.username + 
      '</td>' + 
      '<td class="left">' + 
        value.email + 
      '</td>' + 
      '<td class="center">' +  
        'DELETE' + 
      '</td>' + 
    '</tr>';
}

function deleteUser(username) {
  if(confirm('Are you sure you want to save?')) {
    var transaction = database.transaction(["profile"], "readwrite");
    var store = transaction.objectStore("profile");
    var request = store.delete(username);
    
    request.addEventListener('success', deleteUser_complete);
  }
}

function deleteUser_complete(e) {
  tbody_clear = true;
  document.getElementById('admin-table').innerHTML = 
    '<tr>' + 
      '<th id="username" class="left">username:</th>' + 
      '<th id="email" class="left">email:</th>' + 
      '<th id="action" class="center">action:</th>' + 
    '</tr>' + 
    '<tr>' + 
      '<td class="center" colspan="3">No records found.</td>' + 
    '</tr>';
  populateUsers();
}

//INITIATE PAGE LOAD
window.removeEventListener('load', main, false);
window.addEventListener('load', function(){initiate(function(){initiateAdmin();});}, false);