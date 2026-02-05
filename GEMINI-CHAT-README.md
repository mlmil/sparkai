# Gemini Chat Widget - Setup Guide

## Overview
A premium, AI-powered customer chat interface integrated into your SPARK.AI website. The chat widget uses Google's Gemini API to provide intelligent, context-aware responses to customer inquiries.

## Features
✨ **Premium Design** - Dark theme matching SPARK.AI aesthetic  
🤖 **AI-Powered** - Uses Google's Gemini Pro model  
💾 **Persistent API Key** - Stores API key in browser localStorage  
📱 **Responsive** - Works beautifully on desktop and mobile  
⚡ **Real-time Chat** - Instant responses with typing indicators  
🎨 **Smooth Animations** - Professional transitions and effects  

## Quick Start

### 1. Get Your Gemini API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

### 2. Configure the Chat Widget
When you first click the chat button on your website, you'll see an API key setup screen:
1. Paste your Gemini API key
2. Click "Save API Key"
3. The key is stored in your browser and persists across sessions

**That's it!** The chat is now ready to use.

## Files Added

```
/gemini-chat.js       - Chat widget JavaScript with Gemini API integration
/gemini-chat.css      - Premium styling for the chat interface
```

## Files Modified

```
/index.html           - Added chat widget CSS and JS references
/studio.html          - Added chat widget CSS and JS references
```

## How It Works

### User Flow
1. **Click Chat Button** - Floating orange button in bottom-right corner
2. **First Time Setup** - Enter API key (one-time only)
3. **Start Chatting** - Type messages and get AI-powered responses
4. **Context-Aware** - AI knows about SPARK.AI services and can help customers

### Technical Details
- **API Endpoint**: `generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`
- **Model**: Gemini 2.5 Flash
- **Storage**: localStorage for API key persistence
- **Chat History**: Maintained in session for context-aware responses

## Customization

### Change System Context
Edit the `systemContext` in `gemini-chat.js` (line 13-22):

```javascript
this.systemContext = `Your custom system prompt here...`;
```

### Modify Appearance
Edit `gemini-chat.css` to customize:
- Colors (search for `#d95d1e` to change accent color)
- Sizes (widget dimensions, font sizes)
- Animations (transition timings, effects)

### Change Position
In `gemini-chat.css`, modify `.gemini-chat-widget`:

```css
.gemini-chat-widget {
    bottom: 2rem;  /* Distance from bottom */
    right: 2rem;   /* Distance from right */
    /* Change to left: 2rem; for left side */
}
```

## API Configuration

### Temperature & Creativity
In `gemini-chat.js`, adjust `generationConfig` (line 162-167):

```javascript
generationConfig: {
    temperature: 0.7,      // 0.0 = focused, 1.0 = creative
    topK: 40,              // Sampling diversity
    topP: 0.95,            // Nucleus sampling
    maxOutputTokens: 1024, // Response length limit
}
```

### Rate Limiting
Gemini API has the following limits (free tier):
- 60 requests per minute
- 1,500 requests per day

For production use, consider implementing:
- Request throttling
- Error handling for rate limits
- Upgrade to paid tier if needed

## Security Best Practices

### API Key Storage
Currently, the API key is stored in browser localStorage. For production:

**Option 1: Server-Side Proxy (Recommended)**
```javascript
// Instead of calling Gemini directly, call your server
const response = await fetch('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ message })
});
```

**Option 2: Environment Variables (for server-side rendering)**
```javascript
this.apiKey = process.env.GEMINI_API_KEY;
```

### Content Filtering
The Gemini API includes built-in safety filters. To customize:

```javascript
safetySettings: [
    {
        category: "HARM_CATEGORY_HARASSMENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE"
    }
]
```

## Troubleshooting

### Chat Button Not Appearing
1. Check browser console for errors
2. Verify `gemini-chat.js` and `gemini-chat.css` are loading
3. Ensure files are in the correct directory

### API Errors
**"API key not valid"**
- Verify your API key is correct
- Check if API key has proper permissions
- Ensure billing is enabled (if required)

**"Resource exhausted"**
- You've hit rate limits
- Wait a few minutes and try again
- Consider upgrading your API quota

**"Model not found"**
- Check your API endpoint URL
- Verify you're using `gemini-pro` model

### Chat Not Responding
1. Open browser console (F12)
2. Look for error messages
3. Check network tab for failed requests
4. Verify API key is saved in localStorage

## Advanced Features

### Add Chat History Persistence
Save chat history to localStorage:

```javascript
// After adding message
localStorage.setItem('chat_history', JSON.stringify(this.chatHistory));

// On init
const savedHistory = localStorage.getItem('chat_history');
if (savedHistory) {
    this.chatHistory = JSON.parse(savedHistory);
}
```

### Add File Upload
Extend the chat to support image uploads:

```javascript
// Gemini Pro Vision supports images
const response = await this.callGeminiAPI(message, imageData);
```

### Add Voice Input
Integrate Web Speech API:

```javascript
const recognition = new webkitSpeechRecognition();
recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    this.sendMessage(transcript);
};
```

## Support & Resources

- **Gemini API Docs**: https://ai.google.dev/docs
- **API Pricing**: https://ai.google.dev/pricing
- **Community**: https://developers.googleblog.com/

## License
This chat widget is part of the SPARK.AI website project.

---

**Need Help?**  
Contact: INFO@SPARK.AI | 805-426-2710 | Ventura, CA
