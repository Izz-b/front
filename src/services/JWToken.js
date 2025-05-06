import {jwtDecode} from 'jwt-decode';

// Fonction à appeler après connexion ou chargement du token
export function monitorTokenExpiration(token, handleLogout) {
    try {
        const decoded = jwtDecode(token);
        const exp = decoded.exp * 1000; // Converti en ms

        // Vérifie régulièrement si le token a expiré
        const intervalId = setInterval(() => {
            const now = Date.now();
            const remainingTime = exp - now;

            // Si le token est expiré, logout et affiche un message
            if (remainingTime <= 0) {
                clearInterval(intervalId); // Nettoyer l'intervalle pour éviter des vérifications inutiles
                alert("Votre session a expiré. Veuillez vous reconnecter.");
                handleLogout(); // Déconnecte l'utilisateur
            }
        }, 1000); // Vérifier chaque seconde

    } catch (error) {
        console.error("Erreur lors du décodage du token :", error);
    }
}
