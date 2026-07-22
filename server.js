require('dotenv').config();
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Telegram Bot Setup
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false });

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// New simple form submission route
app.post('/submit', async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).send('Name is required');
    }

    const message = `
    New Visitor Alert!
👤 Name: ${name}
⏰ Time: ${new Date().toLocaleString()}
    `.trim();

    try {
        await bot.sendMessage(process.env.TELEGRAM_CHAT_ID, message);
        console.log('✅ Alert sent for:', name);

        // Send success HTML back
        res.send(`
            <!DOCTYPE html>
            <html lang="ar" dir="rtl">
            <head>
                <meta charset="UTF-8">
                <title>تم بنجاح</title>
                <style>
                    body { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; display: flex; justify-content: center; align-items: center; }
                    .popup { background: white; padding: 40px; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); text-align: center; max-width: 400px; width: 90%; }
                    .popup h2 { color: #333; margin-bottom: 20px; }
                    .popup p { color: #666; margin-bottom: 30px; line-height: 1.6; }
                    .btn-home { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; padding: 15px 30px; border-radius: 10px; font-size: 16px; cursor: pointer; text-decoration: none; display: inline-block; }
                </style>
            </head>
            <body>
                <div class="popup">
                    <h2>🎉 مرحباً بك!</h2>
                    <p>شكراً لتسجيل الدخول<br>تم التحقق بنجاح.</p>
                    <a href="/" class="btn-home">العودة للرئيسية</a>
                </div>
            </body>
            </html>
        `);
    } catch (error) {
        console.error('Telegram error:', error.message);
        res.status(500).send('Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});

module.exports = app;