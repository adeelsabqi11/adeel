const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const path = require('path');

__path = process.cwd();

const PORT = process.env.PORT || 8000;
let code = require('./pair');

// 🔒 Crash protection (MOST IMPORTANT)
process.on('uncaughtException', (err) => {
  console.log('❌ Uncaught Exception:', err);
});

process.on('unhandledRejection', (err) => {
  console.log('❌ Unhandled Rejection:', err);
});

// 🔧 Increase listeners (Baileys safe)
require('events').EventEmitter.defaultMaxListeners = 500;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/code', code);

app.get('/pair', (req, res) => {
  res.sendFile(path.join(__path, 'pair.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__path, 'main.html'));
});

// Health check (hosting sleep prevent)
app.get('/ping', (req, res) => {
  res.status(200).send('Bot is alive 🚀');
});

// Server start
app.listen(PORT, () => {
  console.log(`
✅ Bot Server Started Successfully
🌐 Running on http://localhost:${PORT}
⭐ Don't forget to give a star on GitHub
`);
});

module.exports = app;
