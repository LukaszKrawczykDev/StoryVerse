const app = require('./src/app');

const PORT = process.env.PORT || 5050;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Serwer działa na http://localhost:${PORT}`);
});