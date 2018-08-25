
/* Password confirmation function */

var password = document.getElementById("password"), confirm = document.getElementById("confirm_password");

function validatePass(){
  if(password.value != confirm.value){
    confirm.setCustomValidity("Passwords do not match.");
  }else{
    confirm.setCustomValidity("");
  }
}

password.onchange = validatePass;
confirm.onkeyup = validatePass;