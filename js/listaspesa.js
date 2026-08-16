function initListaSpesa() {
    renderListaSpesa();
    const input = document.getElementById('ls-input');
    if (input) input.addEventListener('keydown', e => {
        if (e.key === 'Enter') addListaSpesa();
    });
}

function addListaSpesa() {
    const input = document.getElementById('ls-input');
    const testo = input.value.trim();
    if (!testo) return;
    const lista = _getLista();
    lista.push({ testo, fatto: false });
    _saveLista(lista);
    input.value = '';
    renderListaSpesa();
}

function toggleListaSpesa(i) {
    const lista = _getLista();
    lista[i].fatto = !lista[i].fatto;
    _saveLista(lista);
    renderListaSpesa();
}

function deleteListaSpesa(i) {
    if (!confirm('Rimuovere questo prodotto?')) return;
    const lista = _getLista();
    lista.splice(i, 1);
    _saveLista(lista);
    renderListaSpesa();
}

function clearListaSpesa() {
    if (!confirm('Svuotare tutta la lista della spesa?')) return;
    _saveLista([]);
    renderListaSpesa();
}

function condividiLista() {
    const lista = _getLista();
    if (!lista.length) { alert('La lista è vuota.'); return; }
    const righe = lista.map(i => (i.fatto ? '✅' : '⬜') + ' ' + i.testo).join('\n');
    const testo = '🛒 Lista della spesa\n\n' + righe + '\n\nGolfo di Sogno 2026';
    if (navigator.share) {
        navigator.share({ text: testo });
    } else {
        navigator.clipboard.writeText(testo).then(() => alert('Lista copiata negli appunti!'));
    }
}

function _getLista() {
    try { return JSON.parse(localStorage.getItem('vacation-listaspesa') || '[]'); }
    catch { return []; }
}

function _saveLista(lista) {
    localStorage.setItem('vacation-listaspesa', JSON.stringify(lista));
}

function renderListaSpesa() {
    const lista  = _getLista();
    const rimasti = lista.filter(i => !i.fatto).length;

    const wval = document.getElementById('dash-listaspesa-val');
    const wsub = document.getElementById('dash-listaspesa-sub');
    if (wval) wval.textContent = rimasti || (lista.length ? '✓' : '—');
    if (wsub) wsub.textContent = lista.length
        ? (rimasti ? rimasti + ' da prendere' : 'tutto preso!')
        : 'cose da comprare';

    const list = document.getElementById('ls-list');
    if (!list) return;

    if (!lista.length) {
        list.innerHTML = '<div class="spese-empty">Lista vuota</div>';
        return;
    }

    list.innerHTML = lista.map((item, i) => {
        const safe = item.testo.replace(/</g,'&lt;');
        return `<div class="ls-item ${item.fatto ? 'ls-fatto' : ''}" onclick="toggleListaSpesa(${i})">
            <span class="ls-check">${item.fatto ? '✅' : '⬜'}</span>
            <span class="ls-testo">${safe}</span>
            <button class="note-delete-btn" onclick="event.stopPropagation();deleteListaSpesa(${i})">✕</button>
        </div>`;
    }).join('');
}
