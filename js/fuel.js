// ===== CARBURANTE =====
// Italia:  API community su dati MIMIT — media lungo tragitto Castronno→Ventimiglia
// Francia: API open data governo francese — media lungo tragitto confine→Nizza (imbarco traghetto)

// Punti lungo il tragitto IT: Castronno → Milano → Alessandria → Savona → Imperia → Ventimiglia
const IT_WAYPOINTS = [
    [45.77, 8.87],   // Castronno (VA)
    [45.46, 9.19],   // Milano
    [44.91, 8.61],   // Alessandria
    [44.31, 8.48],   // Savona
    [43.88, 8.03],   // Imperia
    [43.79, 7.61],   // Ventimiglia
];
const IT_API_BASE = 'https://prezzi-carburante.onrender.com/api/distributori';

// Punti lungo il tragitto FR: Menton → Nizza (ultimo tratto prima dell'imbarco)
const FR_WAYPOINTS = [
    [43.78, 7.50],   // Menton
    [43.70, 7.27],   // Nizza
];
const FR_API_BASE = 'https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets'
    + '/prix-des-carburants-en-france-flux-instantane-v2/records';

async function fetchFuelPrices() {
    const [fr, itG, itB] = await Promise.allSettled([
        fetchFrance(),
        fetchItalyFuel('gasolio'),
        fetchItalyFuel('benzina')
    ]);

    const frData = fr.status  === 'fulfilled' ? fr.value  : null;
    const itData = (itG.status === 'fulfilled' && itB.status === 'fulfilled')
        ? { gazole: itG.value, sp95: itB.value }
        : null;

    renderFuelPage(frData, itData);
    renderFuelWidget(frData);
}

// ===== FETCH ITALIA =====
async function fetchItalyFuel(tipo) {
    const results = await Promise.allSettled(
        IT_WAYPOINTS.map(([lat, lon]) =>
            fetch(`${IT_API_BASE}?latitude=${lat}&longitude=${lon}&distance=15&fuel=${tipo}&results=10`)
                .then(r => r.json())
        )
    );
    const prezzi = results
        .filter(r => r.status === 'fulfilled')
        .flatMap(r => r.value.filter(s => s.self && s.prezzo > 1).map(s => s.prezzo));
    return avg(prezzi);
}

// ===== FETCH FRANCIA =====
async function fetchFrance() {
    const results = await Promise.allSettled(
        FR_WAYPOINTS.map(([lat, lon]) => {
            const where = encodeURIComponent(`distance(geom,geom'POINT(${lon} ${lat})',15000m)`);
            return fetch(`${FR_API_BASE}?where=${where}&limit=15`)
                .then(r => r.json());
        })
    );
    const records = results
        .filter(r => r.status === 'fulfilled')
        .flatMap(r => r.value.results || []);
    const gazole = avg(records.map(r => r.gazole_prix).filter(v => v > 0));
    const sp95   = avg(records.map(r => r.sp95_prix).filter(v => v > 0));
    return { gazole, sp95 };
}

// ===== WIDGET DASHBOARD =====
function renderFuelWidget(fr) {
    const el  = document.getElementById('dash-fuel-val');
    const sub = document.getElementById('dash-fuel-sub');
    if (!el) return;
    if (!fr?.gazole) { el.textContent = '—'; if (sub) sub.textContent = 'non disponibile'; return; }
    el.textContent = '€ ' + fr.gazole.toFixed(3);
    if (sub) sub.textContent = 'gasolio Francia';
}

// ===== PAGINA INFO =====
function renderFuelPage(fr, it) {
    const el = document.getElementById('fuel-section');
    if (!el) return;

    if (!fr && !it) {
        el.innerHTML = `<div class="fuel-error">
            ⚠️ Prezzi non disponibili. Verifica la connessione.<br><br>
            <button class="fuel-refresh" onclick="fetchFuelPrices()">🔄 Riprova</button>
        </div>`;
        return;
    }

    const now = new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });

    const rows = [
        { label: 'Gasolio', it: it?.gazole, fr: fr?.gazole },
        { label: 'Benzina', it: it?.sp95,   fr: fr?.sp95   },
    ];

    let html = `<div class="fuel-grid">
        <div class="fuel-header"></div>
        <div class="fuel-header">🇮🇹 Tragitto IT</div>
        <div class="fuel-header">🇫🇷 Francia</div>`;

    rows.forEach(row => {
        const itVal = row.it ? '€ ' + row.it.toFixed(3) : '—';
        const frVal = row.fr ? '€ ' + row.fr.toFixed(3) : '—';
        const diff  = (row.it && row.fr) ? row.fr - row.it : null;
        let badge = '';
        if (diff !== null) {
            if (diff > 0.01)       badge = '<span class="fuel-badge it">pieno in IT 👍</span>';
            else if (diff < -0.01) badge = '<span class="fuel-badge fr">pieno in FR</span>';
            else                   badge = '<span class="fuel-badge eq">equivalenti</span>';
        }
        html += `
            <div class="fuel-row-label">${row.label}${badge}</div>
            <div class="fuel-row-val ${diff !== null && diff > 0 ? 'best' : ''}">${itVal}</div>
            <div class="fuel-row-val ${diff !== null && diff < 0 ? 'best' : ''}">${frVal}</div>`;
    });

    html += `</div>
        <div class="fuel-note">IT: media self-service (VA→MI→AL→SV→IM→Ventimiglia) · FR: media sul tragitto (Menton→Nizza) · ${now}</div>
        <button class="fuel-refresh" onclick="fetchFuelPrices()">🔄 Aggiorna</button>
        <a href="https://maps.google.com/?q=stazione+di+servizio+vicino+a+me" target="_blank" class="fuel-maps-btn">🗺 Trova distributore vicino</a>`;

    el.innerHTML = html;
}

// ===== UTILITY =====
function avg(arr) {
    const v = (arr || []).filter(x => x > 0.5 && x < 5);
    return v.length ? v.reduce((a, b) => a + b, 0) / v.length : null;
}
