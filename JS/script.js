const storage = () => JSON.parse(localStorage.getItem('babiBNB_offres')) || [];
const container = document.getElementById('listeOffres');
const counter = document.getElementById('compteur');

function render() {
    const offres = storage();
    if(counter) counter.innerText = offres.length;
    if(!container) return;

    container.innerHTML = offres.map(o => `
        <div class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-2xl transition">
            <img src="${o.photo}" class="w-full h-52 object-cover">
            <div class="p-5">
                <h3 class="font-bold text-lg uppercase text-blue-900">${o.titre}</h3>
                <p class="text-gray-500 text-xs my-2 h-8 overflow-hidden">${o.details}</p>
                <p class="font-black text-xl text-gray-800">${parseInt(o.prix).toLocaleString()} FCFA</p>
                <div class="mt-4 flex items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    📍 ${o.commune} • ${o.emplacement}
                </div>
            </div>
        </div>
    `).join('');
}
render();