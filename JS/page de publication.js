document.getElementById('publier-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const offres = JSON.parse(localStorage.getItem('babiBNB_offres')) || [];
    
    const data = {
        type: document.getElementById('type').value,
        titre: document.getElementById('titre').value,
        details: document.getElementById('details').value,
        photo: document.getElementById('photo').value,
        prix: document.getElementById('prix').value,
        commune: document.getElementById('commune').value,
        emplacement: document.getElementById('emplacement').value
    };

    offres.push(data);
    localStorage.setItem('babiBNB_offres', JSON.stringify(offres));
    document.getElementById('modal').classList.remove('hidden');
});