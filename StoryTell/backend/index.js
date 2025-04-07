require('dotenv').config();
const express = require('express');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 5050;

app.use(express.json());

// Prosty test połączenia z bazą
app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        console.log("🟢 Połączenie z bazą działa:", result.rows[0]);
        res.json({ message: "Połączenie z bazą działa!", dbTime: result.rows[0] });
    } catch (err) {
        console.error("❌ Błąd połączenia z bazą:", err.message);
        res.status(500).json({ error: "Nie udało się połączyć z bazą" });
    }
});

// Prosty endpoint testowy
app.get('/ping', (req, res) => {
    console.log("🔥 Odebrano /ping!");
    res.send('pong!');
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Serwer nasłuchuje na http://localhost:${PORT}`);
});