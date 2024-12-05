// Save User Data (Signup)
function saveUserData() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const email = document.getElementById('email').value;
    const dob = document.getElementById('dob').value;

    // Validate if passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return;
    }

    // Save data to localStorage
    const userData = {
        username,
        password,
        email,
        dob,
    };
    localStorage.setItem('user', JSON.stringify(userData));
    alert('Signup successful! You can now log in.');
    window.location.href = 'login.html'; // Redirect to login page
}

// Validate Login
function validateLogin() {
    const loginUsername = document.getElementById('loginUsername').value;
    const loginPassword = document.getElementById('loginPassword').value;

    // Retrieve user data from localStorage
    const storedData = localStorage.getItem('user');
    if (!storedData) {
        alert('No user found. Please sign up first.');
        return;
    }

    const userData = JSON.parse(storedData);

    // Check if username and password match
    if (loginUsername === userData.username && loginPassword === userData.password) {
        alert('Login successful!');
        window.location.href = '../HomePage/homepage.html'; // Example page
    } else {
        alert('Invalid username or password.');
    }
}

// Toggle Password Visibility
function togglePasswordVisibility(fieldId, iconElement) {
    const passwordField = document.getElementById(fieldId);
    const isPassword = passwordField.type === 'password';
    passwordField.type = isPassword ? 'text' : 'password';

    // Change icon
    iconElement.className = isPassword
        ? 'fas fa-eye-slash toggle-password' // Closed eye
        : 'fas fa-eye toggle-password'; // Open eye
}

function checkPasswordStrength() {
    const password = document.getElementById('password').value;
    const strengthMeter = document.querySelector('.strength-meter');
    let strength = 0;

    // Check password criteria
    if (password.length >= 6) strength++; // Length >= 6
    if (password.match(/[A-Za-z]/)) strength++; // Contains letters
    if (password.match(/[0-9]/)) strength++; // Contains numbers
    if (password.match(/[!@#$%^&*]/)) strength++; // Contains special characters

    // Update the strength meter width and background color
    switch (strength) {
        case 1:
            strengthMeter.style.width = '25%';
            strengthMeter.style.backgroundColor = 'red';
            break;
        case 2:
            strengthMeter.style.width = '50%';
            strengthMeter.style.backgroundColor = 'orange';
            break;
        case 3:
            strengthMeter.style.width = '75%';
            strengthMeter.style.backgroundColor = 'yellow';
            break;
        case 4:
            strengthMeter.style.width = '100%';
            strengthMeter.style.backgroundColor = 'green';
            break;
        default:
            strengthMeter.style.width = '0%';
            strengthMeter.style.backgroundColor = '#e0e0e0'; // Neutral color
    }
}


// Validate and Save Data
function validateAndSave() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const email = document.getElementById('email').value;

    const feedback = {
        username: document.getElementById('usernameFeedback'),
        confirmPassword: document.getElementById('confirmPasswordFeedback'),
        email: document.getElementById('emailFeedback'),
    };

    // Clear feedback
    for (const key in feedback) feedback[key].textContent = '';

    // Validation
    if (password !== confirmPassword) {
        feedback.confirmPassword.textContent = 'Passwords do not match.';
        return;
    }

    if (!email.includes('@')) {
        feedback.email.textContent = 'Enter a valid email address.';
        return;
    }

    // Save data to localStorage
    const userData = { username, password, email };
    localStorage.setItem('user', JSON.stringify(userData));
    alert('Signup successful!');
    window.location.href = 'login.html';
}
