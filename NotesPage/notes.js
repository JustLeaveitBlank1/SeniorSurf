document.addEventListener("DOMContentLoaded", function () {
    // Note Area Elements
    const noteArea = document.getElementById("note-area");
    const saveButton = document.getElementById("save-note");
    const clearButton = document.getElementById("clear-note");
    const printButton = document.getElementById("print-note");

    // Chatbot Elements
    const chatBox = document.getElementById("chat-box");
    const sendButton = document.getElementById("send-btn");
    const userInput = document.getElementById("user-input");

    const chatbotBtn = document.getElementById("chatbot-btn");
    const chatbotPopup = document.getElementById("chatbot-popup");
    const closeChatbot = document.getElementById("close-chatbot");

    // Navbar Elements
    const dropdownToggle = document.getElementById("dropdown-toggle");
    const dropdownMenu = document.getElementById("dropdown-menu");
    const accessibilityToggle = document.getElementById("accessibility-toggle");

    // Accessibility Panel Container
    let accessibilityPanelInjected = false; // Track if the panel has been injected

    // Note Management
    if (noteArea && saveButton && clearButton && printButton) {
        // Load saved notes from localStorage
        const savedNote = localStorage.getItem("notepad-note");
        if (savedNote) {
            noteArea.value = savedNote;
        }

        // Save notes
        saveButton.addEventListener("click", () => {
            localStorage.setItem("notepad-note", noteArea.value);
            alert("Note saved successfully!");
        });

        // Clear notes
        clearButton.addEventListener("click", () => {
            if (confirm("Are you sure you want to clear the note?")) {
                noteArea.value = "";
                localStorage.removeItem("notepad-note");
            }
        });

        // Print notes
        printButton.addEventListener("click", () => {
            const printWindow = window.open("", "_blank");
            printWindow.document.write(`<pre style="font-size:16px;">${noteArea.value}</pre>`);
            printWindow.document.close();
            printWindow.print();
        });
    } else {
        console.error("Notepad elements are missing in the HTML.");
    }

    // Chatbot Functionality
    if (chatbotBtn && chatbotPopup && closeChatbot) {
        // Open chatbot popup
        chatbotBtn.addEventListener("click", () => {
            chatbotPopup.classList.remove("hidden");
        });

        // Close chatbot popup
        closeChatbot.addEventListener("click", () => {
            chatbotPopup.classList.add("hidden");
        });
    } else {
        console.error("Chatbot elements are missing in the HTML.");
    }

    if (chatBox && sendButton && userInput) {
        sendButton.addEventListener("click", async () => {
            const userMessage = userInput.value.trim();
            if (!userMessage) return;

            userInput.value = ""; // Clear input
            chatBox.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
            chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the bottom

            try {
                const response = await fetch("https://api.openai.com/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " // Replace with your API key
                    },
                    body: JSON.stringify({
                        model: "gpt-3.5-turbo",
                        messages: [{ role: "user", content: userMessage }]
                    })
                });

                if (!response.ok) {
                    throw new Error(`API call failed: ${response.statusText}`);
                }

                const data = await response.json();
                const aiMessage = data.choices[0].message.content;

                chatBox.innerHTML += `<p><strong>AI:</strong> ${aiMessage}</p>`;
                chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the bottom
            } catch (error) {
                console.error("Error:", error);
                chatBox.innerHTML += `<p><strong>Error:</strong> Unable to fetch response. Please try again.</p>`;
            }
        });
    } else {
        console.error("Chatbot message elements are missing in the HTML.");
    }

    // Navbar Dropdown
    dropdownToggle.addEventListener("click", () => {
        dropdownMenu.classList.toggle("active");
    });

    // Accessibility Panel Functionality
    accessibilityToggle.addEventListener("click", (e) => {
        e.preventDefault();

        if (!accessibilityPanelInjected) {
            // Load Accessibility Panel Dynamically
            fetch("../Accessibility/accessibility.html")
                .then((response) => {
                    if (!response.ok) throw new Error("Failed to load accessibility panel.");
                    return response.text();
                })
                .then((html) => {
                    document.body.insertAdjacentHTML("beforeend", html); // Inject panel HTML
                    accessibilityPanelInjected = true; // Mark panel as injected
                    initializeAccessibility(); // Initialize functionality
                    toggleAccessibilityPanel(); // Open panel
                })
                .catch((error) => console.error("Error loading accessibility panel:", error));
        } else {
            toggleAccessibilityPanel(); // Toggle panel if already injected
        }
    });

    // Toggle Accessibility Panel
    function toggleAccessibilityPanel() {
        const panel = document.getElementById("accessibility-panel");
        if (panel) {
            panel.classList.toggle("open");
        }
    }

    // Initialize Accessibility Features
    function initializeAccessibility() {
        const panel = document.getElementById("accessibility-panel");
        const closeButton = document.getElementById("close-accessibility");

        // Close Accessibility Panel
        if (closeButton) {
            closeButton.addEventListener("click", () => {
                panel.classList.remove("open");
            });
        }

        // Background Color Adjustment
        const bgColorSelect = document.getElementById("background-color");
        if (bgColorSelect) {
            bgColorSelect.addEventListener("change", () => {
                document.body.style.backgroundColor = bgColorSelect.value;
            });
        }

        // Font Family Adjustment
        const fontFamilySelect = document.getElementById("font-family");
        if (fontFamilySelect) {
            fontFamilySelect.addEventListener("change", () => {
                document.body.style.fontFamily = fontFamilySelect.value;
            });
        }

        // Font Size Adjustment
        const fontSizeSelect = document.getElementById("font-size");
        if (fontSizeSelect) {
            fontSizeSelect.addEventListener("change", () => {
                document.body.style.fontSize = fontSizeSelect.value;
            });
        }

        // Line Height Adjustment
        const lineHeightSelect = document.getElementById("line-height");
        if (lineHeightSelect) {
            lineHeightSelect.addEventListener("change", () => {
                document.body.style.lineHeight = lineHeightSelect.value;
            });
        }

        // Text-to-Speech Functionality
        const ttsButton = document.getElementById("tts-button");
        const stopTtsButton = document.getElementById("stop-tts-button");
        if (ttsButton && stopTtsButton) {
            let isSpeaking = false;

            ttsButton.addEventListener("click", () => {
                if (!isSpeaking) {
                    const content = document.body.innerText;
                    const utterance = new SpeechSynthesisUtterance(content);
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
});
