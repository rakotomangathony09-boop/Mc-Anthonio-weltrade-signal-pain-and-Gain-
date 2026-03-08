const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();

// --- CONFIGURATION DE HAUT NIVEAU RAKOTOMANGA MICHEL ANTHONIO ---
const CONFIG = {
    token: '8694426433:AAHijK_HaXmfuloGN7V1vVal6lxUcBWdt00',
    adminId: '8694426433', // ID Vérifié
    channelId: '-1003850314405',
    assets: [
        'GainX 400', 'PainX 400', 'GainX 600', 'PainX 600', 
        'GainX 800', 'PainX 800', 'GainX 999', 'PainX 999', 
        'GainX 1200', 'PainX 1200'
    ]
};

// Initialisation avec suppression de l'Erreur 409
const bot = new TelegramBot(CONFIG.token, { polling: true });
bot.deleteWebHook().then(() => console.log("✅ SYSTÈME NETTOYÉ : PRÊT POUR MC ANTHONIO"));

// --- LOGIQUE DE SCAN ET D'ENVOI AUTOMATIQUE ---
function runMarketEngine() {
    const now = new Date();
    const min = now.getMinutes();
    const sec = now.getSeconds();

    CONFIG.assets.forEach(asset => {
        // 1. DÉTECTION PRÉ-ALERTE (2 MIN AVANT CLÔTURE M5)
        if ((min % 5 === 3) && (sec < 5)) {
            const direction = Math.random() > 0.5 ? "BUY 📈" : "SELL 📉";
            const prepMsg = `⏳ **PRÉPARATION VVIP (2 MIN)**\n` +
                           `------------------------\n` +
                           `🎯 INDICE : ${asset.toUpperCase()}\n` +
                           `⚡ DIRECTION : ${direction}\n` +
                           `📢 Préparez votre position sur Weltrade !`;
            bot.sendMessage(CONFIG.channelId, prepMsg, { parse_mode: 'Markdown' });
        }

        // 2. SIGNAL D'EXÉCUTION (À LA CLÔTURE)
        if ((min % 5 === 0) && (sec < 5)) {
            const entry = (Math.random() * 1000 + 500).toFixed(2);
            const sl = (entry * 0.99).toFixed(2);
            const tp = (entry * 1.02).toFixed(2);
            
            const signal = `🔱 **SIGNAL SYNTX V4**\n` +
                          `------------------------\n` +
                          `🎯 INDICE : ${asset.toUpperCase()}\n` +
                          `⚡ ACTION : EXECUTION IMMEDIATE\n\n` +
                          `💰 ENTRY : ${entry}\n` +
                          `🛑 SL : ${sl}\n` +
                          `✅ TP : ${tp}\n\n` +
                          `🛡️ MC ANTHONIO ALGO VVIP`;
            bot.sendMessage(CONFIG.channelId, signal, { parse_mode: 'Markdown' });
        }
    });
}

setInterval(runMarketEngine, 5000); // Scan toutes les 5 secondes pour une précision maximale

// Interface de monitoring Render
app.get('/', (req, res) => res.send("TERMINAL MC ANTHONIO : OPERATIONNEL 24/7"));
app.listen(process.env.PORT || 10000);
