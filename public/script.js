const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});


document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('form').addEventListener('submit', formValidate);
});

function formValidate(e) {
    e.preventDefault();

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;

    if (email == "" || password == "" || confirmPassword == "") {
        swal("All fields are required");
        return false;
    } else if (password != confirmPassword) {
        swal("Passwords do not match");
        return false;
    }

    e.target.submit();
    return true;
}
