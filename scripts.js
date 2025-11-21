
        let conversationHistory = [];

        function toggleChat() {
            const chatWindow = document.getElementById('chatWindow');
            chatWindow.classList.toggle('active');
        }

        function handleKeyPress(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        }

        async function sendMessage() {
            const input = document.getElementById('chatInput');
            const message = input.value.trim();
            
            if (!message) return;

            addMessage(message, 'user');
            input.value = '';

            conversationHistory.push({
                role: 'user',
                content: message
            });

            document.getElementById('loading').classList.add('active');

            setTimeout(() => {
                const response = findBestResponse(message);
                document.getElementById('loading').classList.remove('active');
                addMessage(response, 'ai');
            }, 800);
        }

        function sendSuggestion(text) {
            document.getElementById('chatInput').value = text;
            sendMessage();
        }

        function handleKeyPress(event) {
            if (event.key === 'Enter') {
                sendMessage();
            }

            document.getElementById('loading').classList.remove('active');
        }

        function addMessage(text, type) {
            const messagesContainer = document.getElementById('chatMessages');
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${type === 'user' ? 'user-message' : 'ai-message'}`;
            messageDiv.textContent = text;
            messagesContainer.appendChild(messageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }