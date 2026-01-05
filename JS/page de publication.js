const STORAGE_KEY = 'babiBNB_offres';
// On récupère les offres existantes (celles de l'accueil ou des ajouts précédents)
let offres = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
let editIndex = -1;

const form = document.getElementById('bien-form');
const sidebar = document.getElementById('sidebar-list');
const compteur = document.getElementById('compteur');
const formTitle = document.getElementById('form-title'); // Ajout pour modifier le titre

function refreshSidebar() {
    // Mise à jour du compteur en haut de page
    if (compteur) {
        compteur.innerText = offres.length;
    }

    if (!sidebar) return;

    sidebar.innerHTML = offres.map((o, i) => `
        <div class="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
            <h3 class="font-bold text-gray-800 mb-1 text-sm">${o.titre}</h3>
            <p class="text-gray-500 text-[11px] mb-2 line-clamp-1 italic">${o.details}</p>
            <p class="font-bold text-gray-900 text-xs mb-4 italic">Prix: ${parseInt(o.prix).toLocaleString()} FCFA</p>
            <div class="flex gap-2">
                <button onclick="deleteOffre(${i})" class="flex-1 bg-red-500 hover:bg-red-600 text-white py-1.5 rounded text-[11px] font-bold uppercase transition-colors">Supprimer</button>
                <button onclick="prefillForm(${i})" class="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-1.5 rounded text-[11px] font-bold uppercase transition-colors">Modifier</button>
            </div>
        </div>
    `).join('');
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nouvelleOffre = {
        type: document.getElementById('type').value,
        titre: document.getElementById('titre').value,
        details: document.getElementById('details').value,
        photo: document.getElementById('photo').value,
        prix: document.getElementById('prix').value,
        commune: document.getElementById('commune').value,
        emplacement: document.getElementById('emplacement').value
    };

    if (editIndex === -1) {
        offres.push(nouvelleOffre);
        Swal.fire({
            title: "Produit ajouté",
            text: `L'annonce "${nouvelleOffre.titre}" a été publiée avec succès`,
            icon: "success",
            draggable: true,
            confirmButtonColor: "#2563eb"
        });
    } else {
        offres[editIndex] = nouvelleOffre;
        editIndex = -1;
        
        Swal.fire({
            title: "Produit modifié",
            text: "Les modifications ont été enregistrées avec succès",
            icon: "success",
            draggable: true,
            confirmButtonColor: "#2563eb"
        });

        // On remet le formulaire à l'état initial
        document.getElementById('submit-btn').innerText = "Publier l'offre";
        if (formTitle) formTitle.innerText = "Publier une offre";
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(offres));
    form.reset();
    refreshSidebar();
});

window.deleteOffre = (i) => {
    Swal.fire({
        title: "Êtes-vous sûr ?",
        text: "Cette action est irréversible !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Oui, supprimer !",
        cancelButtonText: "Annuler"
    }).then((result) => {
        if (result.isConfirmed) {
            offres.splice(i, 1);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(offres));
            refreshSidebar();
            Swal.fire("Supprimé !", "L'annonce a été retirée.", "success");
        }
    });
};

window.prefillForm = (i) => {
    editIndex = i;
    const o = offres[i];
    document.getElementById('type').value = o.type;
    document.getElementById('titre').value = o.titre;
    document.getElementById('details').value = o.details;
    document.getElementById('photo').value = o.photo;
    document.getElementById('prix').value = o.prix;
    document.getElementById('commune').value = o.commune;
    document.getElementById('emplacement').value = o.emplacement;

    // Changement visuel pour indiquer la modification
    document.getElementById('submit-btn').innerText = "Enregistrer les modifications";
    if (formTitle) formTitle.innerText = "Modifier l'offre : " + o.titre.toUpperCase();
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Très important : lancer le rafraîchissement dès le chargement
refreshSidebar();