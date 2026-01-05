// 1. Initialisation des données
const STORAGE_KEY = 'babiBNB_offres';
let offres = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

/**
 * FORCE L'AFFICHAGE DES 3 CARTES DE L'IMAGE
 * Si le stockage est vide ou contient moins de 3 offres, on réinitialise
 */
if (offres.length < 3) {
    offres = [
        {
            titre: "reiciendis consectetur nulla",
            details: "Nemo nesciunt rerum magni impedit doloremque ab dolore Facere eos magnam quo...",
            photo: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
            prix: "300000"
        },
        {
            titre: "Studio Mbadon",
            details: "Bien situé...",
            photo: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800",
            prix: "150000"
        },
        {
            titre: "3 pièces Angré 8e tranche",
            details: "Bien situé et avec beaucoup d'avantages...",
            photo: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
            prix: "800000"
        }
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(offres));
}

// 2. Sélection des éléments du DOM
const listeOffres = document.getElementById('listeOffres');
const compteur = document.getElementById('compteur');

/**
 * Affiche les cartes avec l'alignement et l'effet zoom
 */
function afficherAccueil() {
    if (compteur) {
        compteur.innerText = offres.length;
    }

    if (!listeOffres) return;

    listeOffres.innerHTML = '';

    offres.forEach(offre => {
        // Le code HTML injecté contient l'effet zoom (hover:scale-105)
        const carteHTML = `
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full transform transition-transform duration-300 hover:scale-105 cursor-pointer">
                <div class="p-5 flex-grow">
                    <h3 class="font-bold text-xl text-gray-800 mb-2 uppercase">${offre.titre}</h3>
                    <p class="text-gray-600 text-sm mb-4 line-clamp-3">${offre.details}</p>
                    <img src="${offre.photo}" alt="${offre.titre}" class="w-full h-48 object-cover rounded-md mb-4 border border-gray-100">
                    <p class="font-bold text-gray-800">Prix: ${parseInt(offre.prix).toLocaleString()} FCFA</p>
                </div>
            </div>
        `;
        listeOffres.innerHTML += carteHTML;
    });
}

document.addEventListener('DOMContentLoaded', afficherAccueil);