let offres = JSON.parse(localStorage.getItem('babiBNB_offres')) || [];
let currentIdx = -1;

const sidebar = document.getElementById('sidebar-list');
const form = document.getElementById('edit-form');

function updateSidebar() {
    sidebar.innerHTML = offres.map((o, i) => `
        <div class="p-3 border rounded bg-gray-50 flex flex-col gap-2">
            <p class="font-bold text-sm truncate">${o.titre}</p>
            <div class="flex gap-2">
                <button onclick="load(${i})" class="flex-1 bg-orange-100 text-orange-700 text-[10px] font-bold py-1 rounded">ÉDITER</button>
                <button onclick="del(${i})" class="flex-1 bg-red-100 text-red-700 text-[10px] font-bold py-1 rounded">SUPPRIMER</button>
            </div>
        </div>
    `).join('');
}

window.load = (i) => {
    currentIdx = i;
    const o = offres[i];
    document.getElementById('type').value = o.type;
    document.getElementById('titre').value = o.titre;
    document.getElementById('details').value = o.details;
    document.getElementById('photo').value = o.photo;
    document.getElementById('prix').value = o.prix;
    document.getElementById('commune').value = o.commune;
    document.getElementById('emplacement').value = o.emplacement;
};

window.del = (i) => {
    if(confirm("Supprimer cette offre ?")) {
        offres.splice(i, 1);
        localStorage.setItem('babiBNB_offres', JSON.stringify(offres));
        updateSidebar();
    }
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(currentIdx === -1) return alert("Sélectionnez un bien à droite !");

    offres[currentIdx] = {
        type: document.getElementById('type').value,
        titre: document.getElementById('titre').value,
        details: document.getElementById('details').value,
        photo: document.getElementById('photo').value,
        prix: document.getElementById('prix').value,
        commune: document.getElementById('commune').value,
        emplacement: document.getElementById('emplacement').value
    };

    localStorage.setItem('babiBNB_offres', JSON.stringify(offres));
    alert("Modification réussie !");
    location.href = 'index.html';
});

updateSidebar();