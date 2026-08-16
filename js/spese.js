function initSpese() {
    renderSpese();
    document.getElementById('spesa-importo').addEventListener('keydown', e => {
        if (e.key === 'Enter') addSpesa();
    });
}

function addSpesa() {
    const motivo  = document.getElementById('spesa-motivo').value.trim();
    const importo = parseFloat(document.getElementById('spesa-importo').value);
    if (!motivo || isNaN(importo) || importo <= 0) return;
    const spese = _getSpese();
    spese.unshift({ motivo, importo, ts: Date.now() });
    _saveSpese(spese);
    document.getElementById('spesa-motivo').value  = '';
    document.getElementById('spesa-importo').value = '';
    renderSpese();
}

function deleteSpesa(i) {
    if (!confirm('Eliminare questa spesa?')) return;
    const spese = _getSpese();
    spese.splice(i, 1);
    _saveSpese(spese);
    renderSpese();
}

function condividiSpese() {
    const spese = _getSpese();
    if (!spese.length) { alert('Nessuna spesa registrata.'); return; }
    const totale = spese.reduce((s, e) => s + e.importo, 0);
    const righe = spese.map(s => {
        const d = new Date(s.ts);
        const data = d.toLocaleDateString('it-IT', { day: '2-digit', month: 'short' });
        return `• ${s.motivo} — € ${s.importo.toFixed(2)} (${data})`;
    }).join('\n');
    const testo = `💶 Spese vacanza\n\n${righe}\n\nTotale: € ${totale.toFixed(2)}\n\nGolfo di Sogno 2026`;
    if (navigator.share) {
        navigator.share({ text: testo });
    } else {
        navigator.clipboard.writeText(testo).then(() => alert('Spese copiate negli appunti!'));
    }
}

function _getSpese() {
    try { return JSON.parse(localStorage.getItem('vacation-spese') || '[]'); }
    catch { return []; }
}

function _saveSpese(spese) {
    localStorage.setItem('vacation-spese', JSON.stringify(spese));
}

function renderSpese() {
    const spese  = _getSpese();
    const totale = spese.reduce((s, e) => s + e.importo, 0);

    // widget home
    const wval = document.getElementById('dash-spese-val');
    const wsub = document.getElementById('dash-spese-sub');
    if (wval) wval.textContent = '€ ' + totale.toFixed(2);
    if (wsub) wsub.textContent = spese.length + (spese.length === 1 ? ' voce' : ' voci');

    // totale in sezione
    const tot = document.getElementById('spese-totale');
    if (tot) tot.innerHTML = spese.length
        ? `<div class="spese-tot-box">Totale: <strong>€ ${totale.toFixed(2)}</strong> · ${spese.length} voci</div>`
        : '';

    // lista
    const list = document.getElementById('spese-list');
    if (!list) return;
    if (!spese.length) { list.innerHTML = '<div class="spese-empty">Nessuna spesa registrata</div>'; return; }

    list.innerHTML = spese.map((s, i) => {
        const d    = new Date(s.ts);
        const data = d.toLocaleDateString('it-IT', { day: '2-digit', month: 'short' });
        const ora  = d.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
        return `<div class="spesa-item">
            <div class="spesa-body">
                <div class="spesa-motivo">${s.motivo.replace(/</g,'&lt;')}</div>
                <div class="spesa-meta">${data} · ${ora}</div>
            </div>
            <div class="spesa-right">
                <div class="spesa-importo">€ ${s.importo.toFixed(2)}</div>
                <button class="spesa-delete-btn" onclick="deleteSpesa(${i})">✕</button>
            </div>
        </div>`;
    }).join('');
}
