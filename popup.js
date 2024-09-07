// Fonction pour mettre à jour l'affichage dans la popup
function updatePopup(speed, totalData) {
    document.getElementById('speed-display').innerText = `Débit instantané : ${speed} Kbps`;
    document.getElementById('total-display').innerText = `Cumul des données : ${totalData} Kbits`;
}

// Écouter les messages envoyés depuis background.js
chrome.runtime.onMessage.addListener(function(message) {
    // Mettre à jour l'affichage avec les nouvelles données
    updatePopup(message.speed, message.totalData);
});
