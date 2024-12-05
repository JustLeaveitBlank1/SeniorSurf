document.addEventListener("DOMContentLoaded", function () {
    // Load Navbar
    fetch("../navbar/navbar.html")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to load navbar.");
            }
            return response.text();
        })
        .then((html) => {
            const navbarPlaceholder = document.getElementById("navbar-placeholder");
            navbarPlaceholder.innerHTML = html;
            initializeNavbar(); // Initialize Navbar functionality
        })
        .catch((error) => console.error("Error loading navbar:", error));

    // Initialize Search Functionality
    initializeSearch();

    // Initialize Contact Us Button
    initializeContactUs();
});

// Function to initialize navbar-related functionality
function initializeNavbar() {
    const dropdownToggle = document.querySelector(".hamburger-icon");
    const dropdownMenu = document.querySelector(".dropdown-menu");

    if (dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener("click", () => {
            dropdownMenu.classList.toggle("active");
        });
    }

    const accessibilityPanel = document.getElementById("accessibility-panel");
    const closeAccessibilityButton = document.getElementById("close-accessibility");
    const toggleAccessibilityButton = document.querySelector(
        ".dropdown-menu a[href='#accessibility-toggle']"
    );

    if (accessibilityPanel && closeAccessibilityButton && toggleAccessibilityButton) {
        toggleAccessibilityButton.addEventListener("click", (e) => {
            e.preventDefault();
            accessibilityPanel.classList.toggle("open");
        });

        closeAccessibilityButton.addEventListener("click", () => {
            accessibilityPanel.classList.remove("open");
        });

        initializeAccessibilityControls(); // Initialize accessibility controls
    }
}

// Function to initialize accessibility controls
function initializeAccessibilityControls() {
    const backgroundColorSelect = document.getElementById("background-color");
    const fontFamilySelect = document.getElementById("font-family");
    const fontSizeSelect = document.getElementById("font-size");
    const lineHeightSelect = document.getElementById("line-height");
    const ttsButton = document.getElementById("tts-button");
    const stopTtsButton = document.getElementById("stop-tts-button");

    // Background color change
    if (backgroundColorSelect) {
        backgroundColorSelect.addEventListener("change", () => {
            document.body.style.backgroundColor = backgroundColorSelect.value;
        });
    }

    // Font family change
    if (fontFamilySelect) {
        fontFamilySelect.addEventListener("change", () => {
            document.body.style.fontFamily = fontFamilySelect.value;
        });
    }

    // Font size change
    if (fontSizeSelect) {
        fontSizeSelect.addEventListener("change", () => {
            document.documentElement.style.fontSize = fontSizeSelect.value;
        });
    }

    // Line height change
    if (lineHeightSelect) {
        lineHeightSelect.addEventListener("change", () => {
            document.body.style.lineHeight = lineHeightSelect.value;
        });
    }

    // Text-to-Speech functionality
    let isSpeaking = false;
    let utterance;

    if (ttsButton && stopTtsButton) {
        ttsButton.addEventListener("click", () => {
            if (!isSpeaking) {
                const content = document.body.innerText;
                utterance = new SpeechSynthesisUtterance(content);
                speechSynthesis.speak(utterance);
                isSpeaking = true;

                ttsButton.style.display = "none";
                stopTtsButton.style.display = "inline-block";

                utterance.onend = () => {
                    isSpeaking = false;
                    ttsButton.style.display = "inline-block";
                    stopTtsButton.style.display = "none";
                };
            }
        });

        stopTtsButton.addEventListener("click", () => {
            if (isSpeaking) {
                speechSynthesis.cancel();
                isSpeaking = false;
                ttsButton.style.display = "inline-block";
                stopTtsButton.style.display = "none";
            }
        });
    }
}

// Function to initialize search functionality
function initializeSearch() {
    const searchBar = document.getElementById("search-bar");
    const searchButton = document.getElementById("search-btn");

    if (searchBar && searchButton) {
        searchButton.addEventListener("click", () => {
            const query = searchBar.value.trim();
            if (query) {
                alert(`Searching for: ${query}`);
                // Implement search logic or redirect to search results page
            } else {
                alert("Please enter a search query.");
            }
        });
    }
}

// Function to initialize Contact Us feature
function initializeContactUs() {
    const contactUsBtn = document.getElementById("contact-us-btn");
    const contactModal = document.getElementById("contact-modal");
    const closeModal = document.getElementById("close-modal");

    if (contactUsBtn && contactModal && closeModal) {
        // Open the modal
        contactUsBtn.addEventListener("click", () => {
            contactModal.style.display = "flex";
        });

        // Close the modal
        closeModal.addEventListener("click", () => {
            contactModal.style.display = "none";
        });

        // Close modal when clicking outside the modal content
        window.addEventListener("click", (e) => {
            if (e.target === contactModal) {
                contactModal.style.display = "none";
            }
        });

        // Handle form submission
        const contactForm = document.getElementById("contact-form");
        if (contactForm) {
            contactForm.addEventListener("submit", (e) => {
                e.preventDefault();
                alert("Your message has been sent!");
                contactModal.style.display = "none";
            });
        }
    }
}
