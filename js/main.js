let nameInput = document.querySelector("#nameInput");
let emailInput = document.querySelector("#emailInput");
let passwordInput = document.querySelector("#passwordInput");
let signUpButton = document.querySelector("#signUpButton");
let loginButton = document.querySelector("#loginButton");
let noAccount = document.querySelector("#noAccount");
let signUpLink = document.querySelector("#signUpLink");
let Account = document.querySelector("#Account");
let loginLink = document.querySelector("#loginLink");
let home = document.querySelector("#home");
let warning = document.querySelector("#warning");
let emailWarning = document.querySelector("#emailWarning");
let success = document.querySelector("#success");
let error = document.querySelector("#error");
let logout = document.querySelector("#logout");
let emailExist = document.querySelector("#emailExist");
function showLoginForm() {
  nameInput.classList.add("d-none");
  signUpButton.classList.add("d-none");
  loginButton.classList.remove("d-none");
  noAccount.classList.remove("d-none");
  Account.classList.add("d-none");
}
function showSignUpForm() {
  nameInput.classList.remove("d-none");
  signUpButton.classList.remove("d-none");
  loginButton.classList.add("d-none");
  noAccount.classList.add("d-none");
  Account.classList.remove("d-none");
}

function validateEmail(email) {
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function saveUserToLocalStorage(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

function getUserFromLocalStorage() {
  let user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

signUpButton.addEventListener("click", function () {
  let name = nameInput.value;
  let email = emailInput.value;
  let password = passwordInput.value;

  if (!name || !email || !password) {
    warning.classList.remove("d-none");
    success.classList.add("d-none");
    emailWarning.classList.add("d-none");
    error.classList.add("d-none");
    emailExist.classList.add("d-none");
    return;
  }

  if (!validateEmail(email)) {
    emailWarning.classList.remove("d-none");
    success.classList.add("d-none");
    warning.classList.add("d-none");
    error.classList.add("d-none");
    emailExist.classList.add("d-none");
    return;
  }

  let existingUser = getUserFromLocalStorage();
  if (existingUser && existingUser.email === email) {
    emailWarning.classList.add("d-none");
    success.classList.add("d-none");
    warning.classList.add("d-none");
    error.classList.add("d-none");
    emailExist.classList.remove("d-none");
    return;
  }

  let user = { name, email, password };
  saveUserToLocalStorage(user);
  success.classList.remove("d-none");
  warning.classList.add("d-none");
  emailWarning.classList.add("d-none");
  error.classList.add("d-none");
  emailExist.classList.add("d-none");
  nameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";

  // showLoginForm();
});

loginButton.addEventListener("click", function () {
  let email = emailInput.value;
  let password = passwordInput.value;

  if (!email || !password) {
    warning.classList.remove("d-none");
    success.classList.add("d-none");
    emailWarning.classList.add("d-none");
    error.classList.add("d-none");
    emailExist.classList.add("d-none");
    return;
  }

  let user = getUserFromLocalStorage();

  if (user && email === user.email && password === user.password) {
    document.querySelector("#uName").innerHTML = `Welcome ${user.name}`;
    home.classList.remove("d-none");
    document.querySelector(".login").classList.add("d-none");
  } else {
    error.classList.remove("d-none");
    success.classList.add("d-none");
    warning.classList.add("d-none");
    emailWarning.classList.add("d-none");
    emailExist.classList.add("d-none");
  }
});

signUpLink.addEventListener("click", function (e) {
  e.preventDefault();
  showSignUpForm();
});

loginLink.addEventListener("click", function (e) {
  success.classList.add("d-none");
  warning.classList.add("d-none");
  emailWarning.classList.add("d-none");
  error.classList.add("d-none");
  emailExist.classList.add("d-none");
  e.preventDefault();
  showLoginForm();
});

logout.addEventListener("click", function () {
  success.classList.add("d-none");
  warning.classList.add("d-none");
  emailWarning.classList.add("d-none");
  error.classList.add("d-none");
  emailExist.classList.add("d-none");
  localStorage.removeItem("user");
  window.location.reload();
});
