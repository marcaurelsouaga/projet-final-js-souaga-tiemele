document.getElementById('publier-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const offres = JSON.parse(localStorage.getItem('babiBNB_offres')) || [];
    
    const nouvelleOffre = {
        id: Date.now(), // ID unique
        type: document.getElementById('type').value,
        titre: document.getElementById('titre').value,
        details: document.getElementById('details').value,
        photo: document.getElementById('photo').value,
        prix: document.getElementById('prix').value,
        commune: document.getElementById('commune').value,
        emplacement: document.getElementById('emplacement').value
    };

    offres.push(nouvelleOffre);
    localStorage.setItem('babiBNB_offres', JSON.stringify(offres));
    
    document.getElementById('modal').classList.remove('hidden');
    this.reset();
});