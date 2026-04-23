const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS setup (Custom header ko allow karne ke liye)
app.use(cors({
    origin: '*', 
    methods: ['GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-saood-token'] // Yahan token allow kiya hai
}));

app.get('/key', (req, res) => {
    // 🔒 HIGH SECURITY LOCK: Password Check
    const secretToken = req.headers['x-saood-token'];
    
    // Agar password match nahi hua, toh block kar do!
    if (secretToken !== 'wearvibe-premium-lock') {
        console.log("Extension blocked! Password nahi mila.");
        return res.status(403).send("Forbidden: Chori pakdi gayi! 🛑");
    }

    // Agar password sahi hai, toh chabhi de do
    const keyPath = path.join(__dirname, 'enc.key');
    if (fs.existsSync(keyPath)) {
        res.setHeader('Content-Type', 'application/octet-stream');
        res.sendFile(keyPath);
    } else {
        res.status(404).send("Key file not found.");
    }
});

app.get('/', (req, res) => {
    res.send("Key chor detected 🚨...video dekh lo free mein, hacker banne ki zarurat nahi 😎");
});

app.listen(PORT, () => {
    console.log(`Server started successfully on port ${PORT}`);
});