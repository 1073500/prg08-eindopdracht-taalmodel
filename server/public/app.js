import {micromark} from 'https://esm.sh/micromark@3?bundle'

const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');
const submitButton = chatForm.querySelector('button');

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userInput = chatInput.value.trim();
    if (!userInput) return;

    addMessage(userInput, 'user');
    chatInput.value = '';
    submitButton.disabled = true;

    try {

        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({prompt: userInput}),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        addMessage(data.message, 'server', data.tokens);
        console.log("Tokens gebruikt:", data.tokens);

    } catch (error) {
        console.error('Error fetching from server:', error);
        addMessage('Sorry, something went wrong. Please try again.', 'server');
    } finally {
        submitButton.disabled = false;
        chatInput.focus();
    }

});

function addMessage(text, sender, tokens) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', `${sender}-message`);
    messageElement.textContent = text;

    if (sender === 'server') {
        const html = micromark(text)
        console.log(html)
        messageElement.innerHTML = html
    } else {
        messageElement.textContent = text
    }

    if (tokens) {
        const tokenElement = document.createElement('span');
        tokenElement.classList.add('token-info');
        tokenElement.textContent = `> ${tokens} tokens`;
        messageElement.appendChild(tokenElement);
    }
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
