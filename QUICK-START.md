# 🚀 Gemini Chat Widget - Quick Start

## ✅ Installation Complete!

Your SPARK.AI website now has a premium AI-powered chat interface! Here's what was added:

### 📁 New Files Created:
- ✨ `gemini-chat.js` - Chat widget with Gemini API integration
- 🎨 `gemini-chat.css` - Premium dark theme styling
- 📖 `GEMINI-CHAT-README.md` - Comprehensive documentation

### 🔧 Files Updated:
- 📄 `index.html` - Added chat widget
- 📄 `studio.html` - Added chat widget

---

## 🎯 How to Use

### Step 1: Get Your API Key
1. Visit: https://makersuite.google.com/app/apikey
2. Sign in with Google
3. Click "Create API Key"
4. Copy the key

### Step 2: Configure Chat
1. Open your website
2. Click the **orange chat button** (bottom-right corner)
3. Paste your API key in the setup screen
4. Click "Save API Key"

### Step 3: Start Chatting!
That's it! Your customers can now chat with your AI assistant.

---

## 🎨 What You Get

### Premium Features:
- 🤖 **AI-Powered Responses** - Uses Google's Gemini Pro
- 💬 **Context-Aware** - Knows about SPARK.AI services
- 📱 **Fully Responsive** - Works on all devices
- 💾 **Persistent Storage** - API key saved in browser
- ⚡ **Real-time Chat** - Instant responses
- 🎭 **Smooth Animations** - Professional UX

### Design Highlights:
- Dark theme matching your site
- Orange accent color (#d95d1e)
- Floating chat button
- Typing indicators
- Message animations
- Custom scrollbar

---

## 🔐 Security Note

**Current Setup:** API key stored in browser localStorage (client-side)

**For Production:** Consider implementing a server-side proxy to keep your API key secure:

```javascript
// Your server endpoint
POST /api/chat
Body: { message: "user message" }

// Server calls Gemini API with secure key
// Returns response to client
```

---

## 🎛️ Customization

### Change Chat Position
Edit `gemini-chat.css` line 11-12:
```css
bottom: 2rem;  /* Distance from bottom */
right: 2rem;   /* Change to 'left' for left side */
```

### Modify System Prompt
Edit `gemini-chat.js` line 13-22 to customize AI behavior

### Adjust Colors
Search for `#d95d1e` in `gemini-chat.css` to change accent color

---

## 📊 API Limits (Free Tier)

- 60 requests/minute
- 1,500 requests/day

For higher volume, upgrade at: https://ai.google.dev/pricing

---

## 🐛 Troubleshooting

**Chat button not showing?**
- Clear browser cache
- Check browser console (F12) for errors
- Verify files are loaded

**API errors?**
- Verify API key is correct
- Check if billing is enabled
- Wait if rate limited

**Need more help?**
- See `GEMINI-CHAT-README.md` for detailed docs
- Contact: INFO@SPARK.AI

---

## 🎥 Demo

The chat widget is live on your site! 

**Test it now:**
1. Open `index.html` or `studio.html`
2. Look for the orange button (bottom-right)
3. Click to open chat
4. Enter your API key
5. Start chatting!

---

## 📞 Support

**SPARK.AI**  
Email: INFO@SPARK.AI  
Phone: 805-426-2710  
Location: Ventura, CA

---

**Enjoy your new AI chat assistant! 🎉**
