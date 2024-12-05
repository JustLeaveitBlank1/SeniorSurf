document.addEventListener("DOMContentLoaded", function () {
    // Dropdown toggle for hamburger menu
    const dropdownToggle = document.getElementById("dropdown-toggle");
    const dropdownMenu = document.getElementById("dropdown-menu");

    dropdownToggle.addEventListener("click", () => {
        dropdownMenu.classList.toggle("active");
    });

    // Accessibility feature toggle
    const accessibilityToggle = document.getElementById("accessibility-toggle");
    const accessibilityPanelContainer = document.getElementById("accessibility-panel-container");

    accessibilityToggle.addEventListener("click", (e) => {
        e.preventDefault();

        // Fetch and load accessibility panel
        fetch("../Accessibility/accessibility.html")
            .then((response) => {
                if (!response.ok) throw new Error("Failed to load accessibility panel.");
                return response.text();
            })
            .then((html) => {
                accessibilityPanelContainer.innerHTML = html; // Inject HTML content
                initializeAccessibility(); // Initialize functionality
                const panel = document.getElementById("accessibility-panel");
                panel.classList.add("open");
            })
            .catch((error) => console.error("Error loading accessibility panel:", error));
    });

    function initializeAccessibility() {
        const panel = document.getElementById("accessibility-panel");
        const closeButton = document.getElementById("close-accessibility");

        // Close accessibility panel
        closeButton.addEventListener("click", () => {
            panel.classList.remove("open");
        });

        // Accessibility options logic (font size, color adjustments, etc.)
        // Add your existing accessibility logic here.
    }
});
