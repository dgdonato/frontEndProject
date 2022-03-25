const email = document.getElementById('email')
const submitButton = document.getElementById('submitButton')
const form = document.getElementById('form')
const errorElement = document.getElementById('error')
submitButton.addEventListener('click', (e) => {
    
    if (email.value === '' || email.value == null) {
        email.setCustomValidity('Email is required')
    }

})