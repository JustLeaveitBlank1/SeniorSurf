// On Page Load: Check for Remembered Credentials
document.addEventListener("DOMContentLoaded", () => {
    const rememberedUsername = localStorage.getItem("rememberedUsername");
    const rememberedPassword = localStorage.getItem("rememberedPassword");
    const rememberMe = localStorage.getItem("rememberMe") === "true";

    if (rememberMe) {
        document.getElementById("loginUsername").value = rememberedUsername || "";
        document.getElementById("loginPassword").value = rememberedPassword || "";
        document.getElementById("rememberMe").checked = true;
    }
});

// Validate Login
function validateLogin() {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    const rememberMe = document.getElementById("rememberMe").checked;

    // Simulate fetching stored data
    const storedData = localStorage.getItem("user");
    if (!storedData) {
        alert("No user found. Please sign up first.");
        return;
    }

    const userData = JSON.parse(storedData);

    // Check credentials
    if (username === userData.username && password === userData.password) {
        alert("Login successful!");

        // Store credentials if "Remember me" is checked
        if (rememberMe) {
            localStorage.setItem("rememberedUsername", username);
            localStorage.setItem("rememberedPassword", password);
            localStorage.setItem("rememberMe", true);
        } else {
            // Clear remembered credentials if "Remember me" is unchecked
            localStorage.removeItem("rememberedUsername");
            localStorage.removeItem("rememberedPassword");
            localStorage.removeItem("rememberMe");
        }

        // Redirect to home page (example)
        window.location.href = "../HomePage/homepage.html";
    } else {
        alert("Invalid username or password.");
    }
}

// Toggle Password Visibility
function togglePasswordVisibility(fieldId, iconElement) {
    const passwordField = document.getElementById(fieldId);
    const isPassword = passwordField.type === "password";
    passwordField.type = isPassword ? "text" : "password";

    // Change icon
    iconElement.className = isPassword
        ? "fas fa-eye-slash toggle-password"
        : "fas fa-eye toggle-password";
}
