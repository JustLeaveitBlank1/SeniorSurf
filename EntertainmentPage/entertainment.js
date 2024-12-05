// Dropdown Menu Toggle in the Navbar
function toggleDropdown() {
    const dropdown = document.querySelector(".dropdown-menu");
    dropdown.classList.toggle("active");
}

// Accessibility Panel Toggle
const accessibilityPanel = document.getElementById('accessibility-panel');
const closeAccessibilityButton = document.getElementById('close-accessibility');

// Function to Open/Close the Accessibility Panel
function toggleAccessibilityPanel() {
    accessibilityPanel.classList.toggle('open');
}

// Close the Accessibility Panel when the close button is clicked
closeAccessibilityButton.addEventListener('click', () => {
    accessibilityPanel.classList.remove('open');
});

// Text Size Adjustment
const textSizeSelect = document.getElementById('text-size');
textSizeSelect.addEventListener('change', () => {
    document.documentElement.style.fontSize = textSizeSelect.value;
});

// High Contrast Mode
const contrastToggle = document.getElementById('contrast-toggle');
contrastToggle.addEventListener('change', () => {
    if (contrastToggle.checked) {
        document.body.classList.add('high-contrast');
    } else {
        document.body.classList.remove('high-contrast');
    }
});

// Magnifier Tool
const magnifierToggle = document.getElementById('magnifier-toggle');
magnifierToggle.addEventListener('change', () => {
    if (magnifierToggle.checked) {
        document.body.style.transform = 'scale(1.2)';
        document.body.style.transformOrigin = '0 0';
    } else {
        document.body.style.transform = 'scale(1)';
    }
});

// Reduce Motion
const motionToggle = document.getElementById('motion-toggle');
motionToggle.addEventListener('change', () => {
    if (motionToggle.checked) {
        document.body.classList.add('reduced-motion');
    } else {
        document.body.classList.remove('reduced-motion');
    }
});

// Close the Dropdown Menu When Clicking Outside
document.addEventListener('click', (event) => {
    const dropdown = document.querySelector(".dropdown-menu");
    const hamburgerIcon = document.querySelector(".hamburger-icon");

    if (
        dropdown.classList.contains("active") &&
        !dropdown.contains(event.target) &&
        event.target !== hamburgerIcon
    ) {
        dropdown.classList.remove("active");
    }
});

// Ensure Accessibility Panel Keyboard Navigation
accessibilityPanel.addEventListener('keydown', function (e) {
    if (e.key === 'Tab') {
        const focusableElements = accessibilityPanel.querySelectorAll('button, [href], input, select');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) { // Shift + Tab
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else { // Tab
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }
    if (e.key === 'Escape') {
        accessibilityPanel.classList.remove('open');
    }
});
