/**
 * Simple Test Backend for Gemini Chat Widget
 * This is a mock server for testing the chat interface
 * Replace with your actual backend implementation
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;

// MIME types for serving static files
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    // Handle CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Handle chat API endpoint
    if (req.url === '/api/chat' && req.method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            try {
                const data = JSON.parse(body);
                const userMessage = data.message;
                const history = data.history || [];

                // Check for API Key
                const apiKey = process.env.GEMINI_API_KEY;

                if (apiKey) {
                    try {
                        // Call Gemini API
                        // Construct the full history for context if needed, but for now we'll send just the latest message
                        // to keep it simple, or we can format the history. 
                        // Let's start with a simple single-turn request to ensure connectivity.

                        const apiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                contents: [{
                                    parts: [{ text: userMessage }]
                                }]
                            })
                        });

                        const result = await apiResponse.json();

                        // Check for errors in response
                        if (result.error) {
                            console.error('Gemini API Error:', result.error);
                            throw new Error(result.error.message || 'Gemini API Error');
                        }

                        const botResponse = result.candidates?.[0]?.content?.parts?.[0]?.text || "I didn't get a response from Gemini.";

                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ response: botResponse }));

                        console.log(`[CHAT] User: ${userMessage}`);
                        console.log(`[CHAT] Gemini: ${botResponse.substring(0, 50)}...`);

                    } catch (apiError) {
                        console.error('API Call Failed:', apiError);
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ response: "Error connecting to Gemini API. Please check server logs." }));
                    }
                } else {
                    // Fallback to MOCK responses if no key provided
                    console.log('[CHAT] No API Key provided. Using mock response.');
                    const responses = [
                        `[MOCK] Thanks for your message: "${userMessage}". Set GEMINI_API_KEY to get real responses!`,
                        `[MOCK] I received: "${userMessage}". This is a placeholder.`,
                        `[MOCK] Connect me to Gemini by setting the API key in the server environment.`
                    ];

                    setTimeout(() => {
                        const response = {
                            response: responses[Math.floor(Math.random() * responses.length)]
                        };
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(response));
                    }, 500);
                }

            } catch (error) {
                console.error('Request parsing error:', error);
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid request' }));
            }
        });

        return;
    }

    // Serve static files
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    let filePath = '.' + parsedUrl.pathname;

    if (filePath === './') {
        filePath = './index.html';
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - File Not Found</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end('Server Error: ' + error.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log('╔════════════════════════════════════════════════════╗');
    console.log('║   SPARK.AI Chat Widget - Test Server Running      ║');
    console.log('╚════════════════════════════════════════════════════╝');
    console.log('');
    console.log(`🚀 Server running at: http://localhost:${PORT}`);
    console.log(`💬 Chat API endpoint: http://localhost:${PORT}/api/chat`);
    console.log('');
    console.log('📝 Test the chat:');
    console.log(`   1. Open http://localhost:${PORT}/index.html`);
    console.log('   2. Click the orange chat button');
    console.log('   3. Type a message and press Enter');
    console.log('');
    console.log('⚠️  This is a MOCK backend for testing only!');
    console.log('   Replace with your real backend implementation.');
    console.log('');
    console.log('Press Ctrl+C to stop the server');
    console.log('════════════════════════════════════════════════════');
});
