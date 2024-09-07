// Variables pour stocker le débit instantané et le cumul
let totalDataConsumed = 0; // En kilobits (Kbits)
let currentSpeed = 0; // Débit instantané en kilobits par seconde (Kbps)

// Fonction pour récupérer le débit instantané (simulation ou vraie mesure)
function getLiveSpeed() {
    // Simule un débit instantané entre 0 et 100 Kbps (à remplacer par une vraie méthode)
    return Math.random() * 100;
}

// Fonction pour mettre à jour le cumul des données consommées
function updateTotalDataConsumed() {
    // Ajoute au cumul les données consommées dans l'intervalle (en Kbits)
    totalDataConsumed += currentSpeed * (500 / 1000); // 500 ms = 0.5 s
}

// Fonction principale pour rafraîchir les données en temps réel
function updateLiveSpeedAndTotal() {
    currentSpeed = getLiveSpeed(); // Obtenir le débit instantané
    updateTotalDataConsumed(); // Mettre à jour le cumul des données consommées

    // Affichage dans la console pour tester
    console.log(`Débit instantané : ${currentSpeed.toFixed(2)} Kbps`);
    console.log(`Données cumulées depuis le début de la session : ${totalDataConsumed.toFixed(2)} Kbits`);
    
    // Afficher le débit instantané sur le badge de l'extension
    chrome.browserAction.setBadgeText({ text: currentSpeed.toFixed(0) }); // Débit instantané sans décimales
    chrome.browserAction.setBadgeBackgroundColor({ color: '#FF0000' }); // Badge avec fond rouge

    // Envoyer les informations au popup via chrome.runtime.sendMessage pour les afficher
    chrome.runtime.sendMessage({
        speed: currentSpeed.toFixed(2), // Débit instantané
        totalData: totalDataConsumed.toFixed(2) // Cumul des données
    });
}

// Rafraîchir le débit instantané toutes les 0.5 secondes (500 ms)
setInterval(updateLiveSpeedAndTotal, 500);
