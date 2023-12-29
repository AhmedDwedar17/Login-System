var signUpUser = document.getElementById("signUpUser");
var signUpEmail = document.getElementById("signUpEmail");
var signUpPass = document.getElementById("signUpPass");
var signInEmail = document.getElementById("signInEmail");
var signInPass = document.getElementById("signInPass");
var emailRegex = /^[\w-\.]+@([\w-]{2,}\.)+[\w-]{2,4}$/;
var passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
var nameRegex = /^[a-zA-Z]{3,}\s[a-zA-Z]{3,}$/;
var userArr = [];


if (localStorage.getItem("users") !== null) {
    userArr = JSON.parse(localStorage.getItem("users"));
}


var signUpBtn = document.getElementById("signUpBtn");
if(signUpBtn){
    signUpBtn.addEventListener("click", () => {
        if (!emailRegex.test(signUpEmail.value.trim())) {
            alert("Invalid email address");
            return;
        }
    
        if (!passRegex.test(signUpPass.value.trim())) {
            alert("Invalid password. It must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one digit.");
            return;
        }
    
        if (!nameRegex.test(signUpUser.value.trim())) {
            alert("Invalid name format. It must contain at least 3 letters for each part of the full name.");
            return;
        }
        if (isEmailExist() == false){
            alert("wrong");
            return;
        }
        var userObject = {
            userName: signUpUser.value.trim(),
            userEmail: signUpEmail.value.trim(),
            userPass: signUpPass.value.trim(),
        };
        alert("Signed up successfully")
        saveUserToLocalstorage(userObject);
        clearInputs();
    });
}

var signInBtn = document.getElementById("signInBtn");
if (signInBtn) {
    signInBtn.addEventListener("click", () => {
        if (!emailRegex.test(signInEmail.value.trim())) {
            alert("Invalid email address");
            return;
        }
        if (!passRegex.test(signInPass.value.trim())) {
            alert("Invalid password. It must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one digit.");
            return;
        }
        var authenticatedUser = authenticateUser(signInEmail.value.trim(), signInPass.value.trim());
        if (authenticatedUser) {
            localStorage.setItem("authenticatedUser", JSON.stringify(authenticatedUser));
            window.location.href = "home.html";
        } else {
            alert("Invalid email or password");
        }
    });
}

var userHome = document.getElementById("userHome")
var authenticatedUser = JSON.parse(localStorage.getItem("authenticatedUser")) || {};
userHome.innerHTML = "Hello, " + authenticatedUser.userName;

function authenticateUser(email, password) {
    for (var i = 0; i < userArr.length; i++) {
        if (userArr[i].userEmail.toLowerCase() === email.toLowerCase() && userArr[i].userPass === password) {
            return userArr[i];
        }
    }
    return null;
}

function saveUserToLocalstorage(userObject) {
    var existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    existingUsers.push(userObject);
    localStorage.setItem("users", JSON.stringify(existingUsers));
    userArr = existingUsers;
}

function clearInputs() {
    signUpUser.value = "";
    signUpEmail.value = "";
    signUpPass.value = "";
}

function isEmailExist(){
    for(var i=0; i < userArr.length; i++){
        if (userArr[i].userEmail.toLowerCase() == signUpEmail.value.toLowerCase()){
            return false;
        }
    }
}

var logOut = document.getElementById("logOut");
logOut.addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = "index.html"
})