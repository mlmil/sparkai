/**
 * Gemini Chat Widget - Backend Integration Version
 * A customer chat interface that sends messages to your backend
 */

class GeminiChat {
    constructor(config = {}) {
        // Backend endpoint - customize this to your API
        this.backendEndpoint = config.backendEndpoint || '/api/chat';
        this.chatHistory = [];
        this.isOpen = false;
        this.isTyping = false;

        this.init();
    }

    init() {
        this.createChatWidget();
        this.attachEventListeners();
    }

    createChatWidget() {
        // Create chat widget HTML
        const widgetHTML = `
            <div id="gemini-chat-widget" class="gemini-chat-widget">
                <!-- Chat Toggle Button -->
                <button id="gemini-chat-toggle" class="gemini-chat-toggle" aria-label="Open chat">
                    <svg class="chat-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="currentColor"/>
                    </svg>
                    <svg class="close-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
                    </svg>
                </button>

                <!-- Chat Window -->
                <div id="gemini-chat-window" class="gemini-chat-window">
                    <!-- Header -->
                    <div class="gemini-chat-header">
                        <div class="gemini-chat-header-info">
                            <div class="gemini-chat-avatar">
                                <img src="assets/images/spark_plug_transparent.png" alt="SPARK AI">
                            </div>
                            <div class="gemini-chat-title">
                                <h3>SPARK AI Assistant</h3>
                                <span class="gemini-chat-status">
                                    <span class="status-dot"></span>
                                    <span id="gemini-status-text">Online</span>
                                </span>
                            </div>
                        </div>
                        <div class="gemini-branding">
                            <img src="assets/images/gemini_logo.png" alt="Gemini" class="gemini-logo">
                            <span class="powered-by">Powered by Gemini</span>
                        </div>
                        <button id="gemini-chat-close" class="gemini-chat-close-btn" aria-label="Close chat">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
                            </svg>
                        </button>
                    </div>

                    <!-- Messages Container -->
                    <div id="gemini-chat-messages" class="gemini-chat-messages">
                        <div class="gemini-welcome-message">
                            <div class="msg-avatar">
                                <img src="assets/images/spark_plug_transparent.png" alt="AI">
                            </div>
                            <div class="msg-content">
                                <div class="msg-sender">SPARK AI</div>
                                <div class="msg-text">
                                    Hello! I'm your AI assistant. How can I help you today?
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Typing Indicator -->
                    <div id="gemini-typing-indicator" class="gemini-typing-indicator" style="display: none;">
                        <div class="msg-avatar">
                            <img src="assets/images/spark_plug_transparent.png" alt="AI">
                        </div>
                        <div class="typing-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>

                    <!-- Input Area -->
                    <div class="gemini-chat-input-area">
                        <input 
                            type="text" 
                            id="gemini-chat-input" 
                            class="gemini-chat-input" 
                            placeholder="Type your message..."
                            autocomplete="off"
                        >
                        <button id="gemini-send-btn" class="gemini-send-btn" aria-label="Send message">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Append to body
        document.body.insertAdjacentHTML('beforeend', widgetHTML);
    }

    attachEventListeners() {
        const toggleBtn = document.getElementById('gemini-chat-toggle');
        const closeBtn = document.getElementById('gemini-chat-close');
        const sendBtn = document.getElementById('gemini-send-btn');
        const input = document.getElementById('gemini-chat-input');

        toggleBtn.addEventListener('click', () => this.toggleChat());
        closeBtn.addEventListener('click', () => this.toggleChat());
        sendBtn.addEventListener('click', () => this.sendMessage());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        const widget = document.getElementById('gemini-chat-widget');
        const toggleBtn = document.getElementById('gemini-chat-toggle');

        if (this.isOpen) {
            widget.classList.add('open');
            toggleBtn.classList.add('active');
            document.getElementById('gemini-chat-input').focus();
        } else {
            widget.classList.remove('open');
            toggleBtn.classList.remove('active');
        }
    }

    async sendMessage() {
        const input = document.getElementById('gemini-chat-input');
        const message = input.value.trim();

        if (!message) return;

        // Add user message to UI
        this.addUserMessage(message);
        input.value = '';

        // Add to chat history
        this.chatHistory.push({
            role: 'user',
            content: message
        });

        // Show typing indicator
        this.showTypingIndicator();

        try {
            // Call your backend API
            const response = await this.callBackendAPI(message);
            this.hideTypingIndicator();

            if (response) {
                this.addAIMessage(response);
                this.chatHistory.push({
                    role: 'assistant',
                    content: response
                });
            }
        } catch (error) {
            this.hideTypingIndicator();
            this.addSystemMessage('Sorry, I encountered an error. Please try again.');
            console.error('Backend API Error:', error);
        }
    }

    async callBackendAPI(message) {
        /**
         * Send message to your backend
         * 
         * Expected backend endpoint format:
         * POST /api/chat
         * Body: {
         *   message: "user message",
         *   history: [...previous messages]
         * }
         * 
         * Expected response:
         * {
         *   response: "AI response text"
         * }
         */

        const response = await fetch(this.backendEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
                history: this.chatHistory
            })
        });

        if (!response.ok) {
            throw new Error(`Backend error: ${response.status}`);
        }

        const data = await response.json();
        return data.response || data.message || 'No response';
    }

    addUserMessage(text) {
        const messagesContainer = document.getElementById('gemini-chat-messages');
        const messageHTML = `
            <div class="gemini-message user-message">
                <div class="msg-content">
                    <div class="msg-text">${this.escapeHtml(text)}</div>
                </div>
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
        this.scrollToBottom();
    }

    addAIMessage(text) {
        const messagesContainer = document.getElementById('gemini-chat-messages');
        const messageHTML = `
            <div class="gemini-message ai-message">
                <div class="msg-avatar">
                    <img src="assets/images/spark_plug_transparent.png" alt="AI">
                </div>
                <div class="msg-content">
                    <div class="msg-sender">SPARK AI</div>
                    <div class="msg-text">${this.formatMessage(text)}</div>
                </div>
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
        this.scrollToBottom();
    }

    addSystemMessage(text) {
        const messagesContainer = document.getElementById('gemini-chat-messages');
        const messageHTML = `
            <div class="gemini-system-message">
                <div class="msg-text">${this.escapeHtml(text)}</div>
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
        this.scrollToBottom();
    }

    showTypingIndicator() {
        document.getElementById('gemini-typing-indicator').style.display = 'flex';
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        document.getElementById('gemini-typing-indicator').style.display = 'none';
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('gemini-chat-messages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    formatMessage(text) {
        // Convert markdown-style formatting to HTML
        return this.escapeHtml(text)
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize chat when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize with your backend endpoint
    window.geminiChat = new GeminiChat({
        backendEndpoint: '/api/chat'  // Change this to your actual backend endpoint
    });
});
