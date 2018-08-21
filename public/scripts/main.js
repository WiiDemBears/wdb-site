/*
// Signup Form
// Get the modal
var modal = document.getElementById("id01");

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}*/

var password = document.getElementById("password"), confirm = document.getElementById("confirm_password");

function validatePass(){
  if(password.value != confirm.value){
    confirm.setCustomValidity("Passwords do not match.");
  }else{
    confirm.setCustomValidity("");
  }

  password.onChange = validatePass;
  confirm.onkeyup = validatePass;
}