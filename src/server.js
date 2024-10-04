const express = require('express');
const app = express();
const PORT = 3000;

// Clé API à vérifier
const API_KEY = 'votre_clé_api'; // Remplacez par votre clé API

// Middleware pour vérifier la clé API
const apiKeyMiddleware = (req, res, next) => {
    const apiKey = req.headers['x-api-key']; // Vérifie si la clé API est dans les headers

    if (!apiKey) {
        return res.status(401).json({ message: 'Clé API manquante.' });
    }

    if (apiKey !== API_KEY) {
        return res.status(403).json({ message: 'Clé API incorrecte.' });
    }

    next(); // Passe à la prochaine middleware ou à la route
};

// Route sécurisée
app.get('/api/private-data', apiKeyMiddleware, (req, res) => {
    res.json({ message: 'Voici vos données privées.' });
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
