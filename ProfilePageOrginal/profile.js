// Toggle Dropdown Menu in Hamburger
function toggleDropdown() {
    const dropdown = document.querySelector(".dropdown-menu");
    dropdown.classList.toggle("active");
}

// Accessibility Panel Toggle
const accessibilityPanel = document.getElementById('accessibility-panel');

// Function to Toggle Accessibility Panel
function toggleAccessibilityPanel() {
    if (!accessibilityPanel.innerHTML.trim()) {
        // Load Accessibility Panel Content Only Once
        fetch('../AccessibilityPage/accessibility.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error loading accessibility.html: ${response.statusText}`);
                }
                return response.text();
            })
            .then(data => {
                accessibilityPanel.innerHTML = data;
                accessibilityPanel.classList.toggle('open');

                // Reinitialize Accessibility Panel JS (if needed)
                if (typeof initAccessibilityPanel === 'function') {
                    initAccessibilityPanel();
                } else {
                    console.error("initAccessibilityPanel function not found in accessibility.js.");
                }
            })
            .catch(error => {
                console.error(error);
            });
    } else {
        // Toggle the Panel Open/Close
        accessibilityPanel.classList.toggle('open');
    }
}

// Function to Reinitialize Accessibility Features After Loading HTML
function initAccessibilityPanel() {
    const closeAccessibilityButton = document.getElementById('close-accessibility');

    if (closeAccessibilityButton) {
        // Close Panel Logic
        closeAccessibilityButton.addEventListener('click', () => {
            accessibilityPanel.classList.remove('open');
        });
    } else {
        console.error("closeAccessibilityButton not found. Ensure accessibility.html is loaded correctly.");
    }

    // Initialize other accessibility features if necessary
    if (typeof initAccessibilityFeatures === 'function') {
        initAccessibilityFeatures();
    }
}

// Helper Function: Initialize Accessibility Features
function initAccessibilityFeatures() {
    // Rebind event listeners or additional logic for accessibility controls
    const textSizeSelect = document.getElementById('text-size');
    if (textSizeSelect) {
        textSizeSelect.addEventListener('change', () => {
            document.documentElement.style.fontSize = textSizeSelect.value;
        });
    }

    const contrastToggle = document.getElementById('contrast-toggle');
    if (contrastToggle) {
        contrastToggle.addEventListener('change', () => {
            if (contrastToggle.checked) {
                document.body.classList.add('high-contrast');
            } else {
                document.body.classList.remove('high-contrast');
            }
        });
    }

    const magnifierToggle = document.getElementById('magnifier-toggle');
    if (magnifierToggle) {
        magnifierToggle.addEventListener('change', () => {
            if (magnifierToggle.checked) {
                document.body.style.transform = 'scale(1.2)';
                document.body.style.transformOrigin = '0 0';
            } else {
                document.body.style.transform = 'scale(1)';
            }
        });
    }

    const motionToggle = document.getElementById('motion-toggle');
    if (motionToggle) {
        motionToggle.addEventListener('change', () => {
            if (motionToggle.checked) {
                document.body.classList.add('reduced-motion');
            } else {
                document.body.classList.remove('reduced-motion');
            }
        });
    }
}

// Event Listeners for Navbar
document.querySelector(".hamburger-icon").addEventListener('click', toggleDropdown);
document.querySelector(".dropdown-menu a[href='#']").addEventListener('click', (e) => {
    e.preventDefault();
    toggleAccessibilityPanel();
});
