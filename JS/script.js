const storage = () => JSON.parse(localStorage.getItem('babiBNB_offres')) || [];
const list = document.getElementById('listeOffres');
const counter = document.getElementById('compteur');

function loadHome() {
    const data = storage();
    if(counter) counter.innerText = data.length;
    if(!list) return;

    list.innerHTML = data.map(o => `
        <article class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all group">
            <div class="h-56 overflow-hidden">
                <img src="${o.photo}" class="w-full h-full object-cover group-hover:scale-110 transition duration-500">
            </div>
            <div class="p-6">
                <div class="flex justify-between items-start mb-3">
                    <h3 class="font-black text-blue-900 text-lg uppercase leading-tight">${o.titre}</h3>
                    <span class="bg-blue-50 text-blue-600 text-[10px] font-black px-2 py-1 rounded-full uppercase">${o.type}</span>
                </div>
                <p class="text-gray-400 text-sm mb-4 line-clamp-2">${o.details}</p>
                <div class="border-t border-gray-50 pt-4 flex justify-between items-center">
                    <p class="font-black text-xl text-gray-800">${parseInt(o.prix).toLocaleString()} <span class="text-xs">FCFA</span></p>
                    <p class="text-[10px] font-bold text-gray-300">📍 ${o.commune}</p>
                </div>
            </div>
        </article>
    `).join('');
}
loadHome();