const STORAGE_KEY = 'babiBNB_offres';
// On récupère les offres existantes
let offres = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
let editIndex = -1;

// Utilisation de querySelector
const form = document.querySelector('#bien-form');
const sidebar = document.querySelector('#sidebar-list');
const compteur = document.querySelector('#compteur');
const formTitle = document.querySelector('#form-title');

function refreshSidebar() {
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
    
    // On récupère bien la valeur de l'input #photo ici
    const nouvelleOffre = {
        type: document.querySelector('#type').value,
        titre: document.querySelector('#titre').value,
        details: document.querySelector('#details').value,
        photo: document.querySelector('#photo').value, 
        prix: document.querySelector('#prix').value,
        commune: document.querySelector('#commune').value,
        emplacement: document.querySelector('#emplacement').value
    };

    if (editIndex === -1) {
        offres.push(nouvelleOffre);
        Swal.fire({
            title: "Produit ajouté",
            text: `L'annonce "${nouvelleOffre.titre}" a été publiée avec succès`,
            icon: "success",
            confirmButtonColor: "#2563eb"
        });
    } else {
        offres[editIndex] = nouvelleOffre;
        editIndex = -1;
        
        Swal.fire({
            title: "Produit modifié",
            text: "Les modifications ont été enregistrées avec succès",
            icon: "success",
            confirmButtonColor: "#2563eb"
        });

        document.querySelector('#submit-btn').innerText = "Publier l'offre";
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
    document.querySelector('#type').value = o.type;
    document.querySelector('#titre').value = o.titre;
    document.querySelector('#details').value = o.details;
    document.querySelector('#photo').value = o.photo;
    document.querySelector('#prix').value = o.prix;
    document.querySelector('#commune').value = o.commune;
    document.querySelector('#emplacement').value = o.emplacement;

    document.querySelector('#submit-btn').innerText = "Enregistrer les modifications";
    if (formTitle) formTitle.innerText = "Modifier l'offre : " + o.titre.toUpperCase();
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

refreshSidebar();