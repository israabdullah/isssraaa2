require('dotenv').config();
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/send-email', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email required' });
    }

    const message = `📧 New Email:\n\n${email}\n\n ${new Date().toLocaleString()}`;

    try {
        await bot.sendMessage(process.env.TELEGRAM_CHAT_ID, message);
        console.log('✅ Sent:', email);
        res.json({ success: true });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Telegram error' });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});

module.exports = app;