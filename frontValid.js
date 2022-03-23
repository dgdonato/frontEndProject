const loginButton = document.getElementById('loginButton')
const username = document.getElementById('username')
const password = document.getElementById('password')
const form = document.getElementById('form')
const errorElement = document.getElementById('error')
loginButton.addEventListener('click', (e) => {
    
    if (username.value === '' || username.value == null) {
        username.setCustomValidity('Username is required')
    }

    if (password.value === '' || password.value == null) {
        password.setCustomValidity('Password is required')
    }

})