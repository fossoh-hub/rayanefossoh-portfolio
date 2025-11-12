
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

            try {
                const response = await fetch('https://api.anthropic.com/v1/messages', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        model: 'claude-sonnet-4-20250514',
                        max_tokens: 1000,
                        system: `Tu es l'assistant IA personnel de RAYANE FOSSOH, un étudiant en génie logiciel. Voici ses informations :

- Nom : RAYANE FOSSOH
- Statut : Étudiant passionné en développement web et intelligence artificielle
- Compétences : HTML 5, CSS 3, JavaScript, Python, Git & GitHub
- Projets :
  1. 
  2.
  3.
- Contact : rayanefossoh07@gmail.com, LinkedIn: https://www.linkedin.com/in/rayane-fossoh, GitHub: https://github.com/fossoh-hub
- Passion : Créer des expériences web innovantes en combinant design moderne et technologies IA
- Ambitions : 

Réponds de manière amicale, concise et professionnelle. Parle toujours de RAYANE à la troisième personne. Si on te pose une question à laquelle tu ne peux pas répondre avec ces informations, sois honnête et propose de parler d'autres aspects du profil de RAYANE.`,
                        messages: conversationHistory
                    })
                });

                const data = await response.json();
                const aiResponse = data.content[0].text;

                conversationHistory.push({
                    role: 'assistant',
                    content: aiResponse
                });

                addMessage(aiResponse, 'ai');
            } catch (error) {
                addMessage("Désolé, je rencontre un problème technique. Veuillez réessayer.", 'ai');
                console.error('Erreur:', error);
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