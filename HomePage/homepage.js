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

    // Initialize Chatbot functionality
    initializeChatbot();
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

// Function to initialize chatbot functionality
function initializeChatbot() {
    const sendButton = document.getElementById("send-btn");
    const userInput = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");

    if (sendButton && userInput && chatBox) {
        sendButton.addEventListener("click", sendMessage);

        // Function to handle user input and API call
        async function sendMessage() {
            const userMessage = userInput.value.trim();
            if (!userMessage) return; // If input is empty, don't send

            userInput.value = ""; // Clear the input field
            chatBox.innerHTML += `<div class="chat-message user-message"><strong>You:</strong> ${userMessage}</div>`;
            chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the bottom

            try {
                const response = await fetch("https://api.openai.com/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "" // Replace with your actual API key
                    },
                    body: JSON.stringify({
                        model: "gpt-3.5-turbo", // You can change the model if necessary
                        messages: [{ role: "user", content: userMessage }]
                    })
                });

                if (!response.ok) {
                    throw new Error(`API call failed: ${response.statusText}`);
                }

                const data = await response.json();
                const aiMessage = data.choices[0].message.content;

                chatBox.innerHTML += `<div class="chat-message ai-message"><strong>AI:</strong> ${aiMessage}</div>`;
                chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the bottom
            } catch (error) {
                console.error("Error:", error); // Log the error for debugging
                chatBox.innerHTML += `<div class="chat-message error-message"><strong>Error:</strong> Something went wrong. Please try again.</div>`;
                chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the bottom
            }
        }
    }
}
