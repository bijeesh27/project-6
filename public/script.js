const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

document.addEventListener("DOMContentLoaded", function () {
  // Attach validation for Sign In
  document
    .getElementById("signInForm")
    .addEventListener("submit", validateSignIn);

  // Attach validation for Sign Up
  document
    .getElementById("signUpForm")
    .addEventListener("submit", validateSignUp);
});

function validateSignIn(e) {
  e.preventDefault();

  var email = document.getElementById("emails").value.trim();
  var password = document.getElementById("passwords").value.trim();

  if (email === "" || password === "") {
    swal("All fields are required", "", "error");
    return false;
  }

  e.target.submit(); // Submit form if valid
  return true;
}

function validateSignUp(e) {
  e.preventDefault();

  var email = document.getElementById("email").value.trim();
  var password = document.getElementById("password").value.trim();
  var confirmPassword = document.getElementById("confirmPassword").value.trim();

  if (confirmPassword === "" || email === "" || password === "") {
    swal("All fields are required", "", "error");
    return false;
  } else if (password != confirmPassword) {
    swal("Passwords do not match", "", "error");
    return false;
  }

  e.target.submit(); // Submit form if valid
  return true;
}
