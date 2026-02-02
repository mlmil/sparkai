# Gemini Chat Widget - Backend Integration

## Overview
A clean, premium chat interface ready for your backend API integration. No API key management on the frontend - all AI processing happens on your server.

## 🎯 What You Have

### Frontend Chat Interface
- ✨ Premium dark theme matching SPARK.AI aesthetic
- 💬 Clean message bubbles (user & AI)
- ⚡ Typing indicators
- 📱 Fully responsive design
- 🎨 Smooth animations
- 💾 Chat history in session

### Files
- `gemini-chat.js` - Chat widget with backend integration
- `gemini-chat.css` - Premium styling
- `index.html` - Chat enabled
- `studio.html` - Chat enabled

## 🔌 Backend Integration

### Expected Backend Endpoint

**Default:** `POST /api/chat`

**Request Format:**
```json
{
  "message": "User's message text",
  "history": [
    {
      "role": "user",
      "content": "Previous user message"
    },
    {
      "role": "assistant",
      "content": "Previous AI response"
    }
  ]
}
```

**Response Format:**
```json
{
  "response": "AI response text here"
}
```

Alternative response format (also supported):
```json
{
  "message": "AI response text here"
}
```

### Change Backend Endpoint

Edit `gemini-chat.js` line 293:
```javascript
window.geminiChat = new GeminiChat({
    backendEndpoint: 'https://your-api.com/chat'  // Your endpoint here
});
```

## 🚀 Quick Start

### 1. Frontend (Already Done!)
The chat widget is installed and ready on your site.

### 2. Create Your Backend

Here are example backend implementations:

#### Node.js/Express Example
```javascript
const express = require('express');
const app = express();

app.use(express.json());

app.post('/api/chat', async (req, res) => {
    const { message, history } = req.body;
    
    // Call Gemini API with your server-side API key
    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [
                    {
                        role: 'user',
                        parts: [{ text: 'You are a helpful assistant for SPARK.AI...' }]
                    },
                    ...history.map(msg => ({
                        role: msg.role === 'user' ? 'user' : 'model',
                        parts: [{ text: msg.content }]
                    })),
                    {
                        role: 'user',
                        parts: [{ text: message }]
                    }
                ],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 1024
                }
            })
        }
    );
    
    const data = await response.json();
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
    
    res.json({ response: aiResponse });
});

app.listen(3000, () => console.log('Backend running on port 3000'));
```

#### Python/Flask Example
```python
from flask import Flask, request, jsonify
import requests
import os

app = Flask(__name__)

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    message = data['message']
    history = data['history']
    
    # Build Gemini API request
    contents = [
        {
            'role': 'user',
            'parts': [{'text': 'You are a helpful assistant for SPARK.AI...'}]
        }
    ]
    
    # Add history
    for msg in history:
        role = 'user' if msg['role'] == 'user' else 'model'
        contents.append({
            'role': role,
            'parts': [{'text': msg['content']}]
        })
    
    # Add current message
    contents.append({
        'role': 'user',
        'parts': [{'text': message}]
    })
    
    # Call Gemini API
    response = requests.post(
        f"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={os.getenv('GEMINI_API_KEY')}",
        json={
            'contents': contents,
            'generationConfig': {
                'temperature': 0.7,
                'maxOutputTokens': 1024
            }
        }
    )
    
    result = response.json()
    ai_response = result['candidates'][0]['content']['parts'][0]['text']
    
    return jsonify({'response': ai_response})

if __name__ == '__main__':
    app.run(port=3000)
```

#### PHP Example
```php
<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
$message = $data['message'];
$history = $data['history'];

// Build contents array
$contents = [
    [
        'role' => 'user',
        'parts' => [['text' => 'You are a helpful assistant for SPARK.AI...']]
    ]
];

// Add history
foreach ($history as $msg) {
    $role = $msg['role'] === 'user' ? 'user' : 'model';
    $contents[] = [
        'role' => $role,
        'parts' => [['text' => $msg['content']]]
    ];
}

// Add current message
$contents[] = [
    'role' => 'user',
    'parts' => [['text' => $message]]
];

// Call Gemini API
$apiKey = getenv('GEMINI_API_KEY');
$url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=$apiKey";

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'contents' => $contents,
    'generationConfig' => [
        'temperature' => 0.7,
        'maxOutputTokens' => 1024
    ]
]));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);

$response = curl_exec($ch);
curl_close($ch);

$result = json_decode($response, true);
$aiResponse = $result['candidates'][0]['content']['parts'][0]['text'];

echo json_encode(['response' => $aiResponse]);
?>
```

## 🔐 Security Benefits

### Why Backend Integration?
✅ **API Key Security** - Key never exposed to client  
✅ **Rate Limiting** - Control usage on your server  
✅ **Cost Control** - Monitor and limit API calls  
✅ **Content Filtering** - Add custom validation  
✅ **Analytics** - Track conversations server-side  

## 🎨 Customization

### Change Chat Position
```css
/* In gemini-chat.css */
.gemini-chat-widget {
    bottom: 2rem;
    left: 2rem;  /* Move to left side */
}
```

### Modify Welcome Message
```javascript
// In gemini-chat.js, find the welcome message HTML
<div class="msg-text">
    Your custom welcome message here!
</div>
```

### Change Colors
```css
/* Search for #d95d1e in gemini-chat.css */
/* Replace with your brand color */
```

## 🧪 Testing

### Test with Mock Backend
Create a simple test endpoint:

```javascript
// test-backend.js
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('.')); // Serve your HTML files

app.post('/api/chat', (req, res) => {
    const { message } = req.body;
    
    // Mock response
    res.json({
        response: `You said: "${message}". This is a test response from the backend!`
    });
});

app.listen(3000, () => {
    console.log('Test server running at http://localhost:3000');
});
```

Run: `node test-backend.js`  
Visit: `http://localhost:3000/index.html`

## 📊 Chat History Format

The frontend sends chat history in this format:

```javascript
[
    {
        "role": "user",
        "content": "First user message"
    },
    {
        "role": "assistant",
        "content": "First AI response"
    },
    {
        "role": "user",
        "content": "Second user message"
    }
]
```

Use this to maintain conversation context in your backend.

## 🐛 Troubleshooting

### Chat Not Sending Messages
1. Check browser console (F12) for errors
2. Verify backend endpoint is correct
3. Check CORS headers on your backend
4. Test backend endpoint with Postman/curl

### CORS Issues
Add to your backend:
```javascript
// Express
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
```

### Backend Not Receiving Requests
1. Verify endpoint URL is correct
2. Check network tab in browser DevTools
3. Ensure backend is running
4. Check firewall/port settings

## 📞 Support

**SPARK.AI**  
Email: INFO@SPARK.AI  
Phone: 805-426-2710  
Location: Ventura, CA

---

**Your chat interface is ready! Just connect your backend and you're live! 🚀**
