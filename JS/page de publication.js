const STORAGE_KEY = 'babiBNB_offres';
let offres = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
let editIndex = -1;

const form = document.getElementById('bien-form');
const sidebar = document.getElementById('sidebar-list');
const compteur = document.getElementById('compteur');

function refreshSidebar() {
    if (compteur) compteur.innerText = offres.length;
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
        
        // UTILISATION DE SWEETALERT2 POUR L'AJOUT
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
        
        // UTILISATION DE SWEETALERT2 POUR LA MODIFICATION
        Swal.fire({
            title: "Produit modifié",
            text: "Les modifications ont été enregistrées",
            icon: "success",
            draggable: true,
            confirmButtonColor: "#2563eb"
        });

        document.getElementById('submit-btn').innerText = "Publier l'offre";
        document.getElementById('form-title').innerText = "Publier une offre";
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(offres));
    form.reset();
    refreshSidebar();
});

window.deleteOffre = (i) => {
    // Bonus : Utilisation de Swal pour la confirmation de suppression
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
    document.getElementById('submit-btn').innerText = "Enregistrer les modifications";
    document.getElementById('form-title').innerText = "Modifier l'offre";
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

refreshSidebar();