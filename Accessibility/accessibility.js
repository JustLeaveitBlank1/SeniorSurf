(function () {
    document.addEventListener('DOMContentLoaded', () => {
        fetch('../Accessibility/accessibility.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load accessibility panel.');
                }
                return response.text();
            })
            .then(html => {
                document.body.insertAdjacentHTML('beforeend', html);
                initializeAccessibility();
            })
            .catch(error => console.error('Error loading accessibility panel:', error));
    });

    function initializeAccessibility() {
        const accessibilityPanel = document.getElementById('accessibility-panel');
        const toggleButton = document.getElementById('toggle-accessibility');
        const closeButton = document.getElementById('close-accessibility');

        toggleButton.addEventListener('click', () => {
            accessibilityPanel.classList.toggle('open');
        });

        closeButton.addEventListener('click', () => {
            accessibilityPanel.classList.remove('open');
        });

        // Background color adjustment
        const bgColorSelect = document.getElementById('background-color');
        bgColorSelect.addEventListener('change', () => {
            const value = bgColorSelect.value;
            if (value === 'woodgrain') {
                document.body.style.backgroundImage = "url('path/to/woodgrain.jpg')";
                document.body.style.backgroundColor = ''; // Reset any solid color
            } else {
                document.body.style.backgroundImage = ''; // Reset any background image
                document.body.style.backgroundColor = value;
            }
        });

        // Font family adjustment
        const fontFamilySelect = document.getElementById('font-family');
        fontFamilySelect.addEventListener('change', () => {
            document.body.style.fontFamily = fontFamilySelect.value;
        });

        // Font size adjustment
        const fontSizeSelect = document.getElementById('font-size');
        fontSizeSelect.addEventListener('change', () => {
            document.documentElement.style.fontSize = fontSizeSelect.value;
        });

        // Line height adjustment
        const lineHeightSelect = document.getElementById('line-height');
        lineHeightSelect.addEventListener('change', () => {
            document.body.style.lineHeight = lineHeightSelect.value;
        });

        // Granular Text-to-Speech functionality
        let isSpeaking = false;
        let utterance = null;

        // General Read Aloud
        const ttsButton = document.getElementById('tts-button');
        const stopTtsButton = document.getElementById('stop-tts-button');

        ttsButton.addEventListener('click', () => {
            if (!isSpeaking) {
                const content = document.body.innerText; // Fetch all visible text on the page
                utterance = new SpeechSynthesisUtterance(content);
                speechSynthesis.speak(utterance);
                isSpeaking = true;
                ttsButton.style.display = 'none';
                stopTtsButton.style.display = 'block';

                utterance.onend = () => {
                    isSpeaking = false;
                    ttsButton.style.display = 'block';
                    stopTtsButton.style.display = 'none';
                };
            }
        });

        stopTtsButton.addEventListener('click', () => {
            if (isSpeaking) {
                speechSynthesis.cancel();
                isSpeaking = false;
                ttsButton.style.display = 'block';
                stopTtsButton.style.display = 'none';
            }
        });

        // Click-to-read specific elements
        document.body.addEventListener('click', (event) => {
            if (event.target.classList.contains('readable')) {
                if (isSpeaking) {
                    speechSynthesis.cancel();
                }

                const targetContent = event.target.innerText; // Get content of clicked element
                utterance = new SpeechSynthesisUtterance(targetContent);
                speechSynthesis.speak(utterance);
                isSpeaking = true;

                utterance.onend = () => {
                    isSpeaking = false;
                };
            }
        });
    }
})();
