let offres = JSON.parse(localStorage.getItem('babiBNB_offres')) || [];
let activeIndex = -1;

const sidebar = document.getElementById('sidebar-list');
const editForm = document.getElementById('edit-form');
const helpMsg = document.getElementById('msg-aide');

function refreshSidebar() {
    sidebar.innerHTML = offres.map((o, i) => `
        <div class="p-4 border border-gray-100 rounded-xl bg-gray-50 hover:border-orange-300 transition group">
            <h4 class="font-bold text-sm text-gray-700 mb-2 truncate">${o.titre}</h4>
            <div class="flex gap-2">
                <button onclick="edit(${i})" class="flex-1 bg-white text-orange-600 border border-orange-200 text-[10px] font-bold py-2 rounded-lg hover:bg-orange-500 hover:text-white transition">MODIFIER</button>
                <button onclick="remove(${i})" class="bg-red-50 text-red-500 text-[10px] p-2 rounded-lg hover:bg-red-500 hover:text-white transition">🗑</button>
            </div>
        </div>
    `).join('');
}

window.edit = (i) => {
    activeIndex = i;
    const o = offres[i];
    
    // Remplissage
    document.getElementById('type').value = o.type;
    document.getElementById('titre').value = o.titre;
    document.getElementById('details').value = o.details;
    document.getElementById('photo').value = o.photo;
    document.getElementById('prix').value = o.prix;
    document.getElementById('commune').value = o.commune;
    document.getElementById('emplacement').value = o.emplacement;

    // UI Feedback
    editForm.classList.remove('opacity-40', 'pointer-events-none');
    helpMsg.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.remove = (i) => {
    if(confirm("Supprimer définitivement ce bien ?")) {
        offres.splice(i, 1);
        localStorage.setItem('babiBNB_offres', JSON.stringify(offres));
        refreshSidebar();
        location.reload(); // Pour vider le formulaire si on supprimait le bien en cours
    }
};

editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    offres[activeIndex] = {
        ...offres[activeIndex],
        type: document.getElementById('type').value,
        titre: document.getElementById('titre').value,
        details: document.getElementById('details').value,
        photo: document.getElementById('photo').value,
        prix: document.getElementById('prix').value,
        commune: document.getElementById('commune').value,
        emplacement: document.getElementById('emplacement').value
    };
    localStorage.setItem('babiBNB_offres', JSON.stringify(offres));
    alert("Modification enregistrée !");
    window.location.href = 'index.html';
});

refreshSidebar();