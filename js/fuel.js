// ===== CARBURANTE =====
// Italia:  API community su dati MIMIT — media lungo tragitto Castronno→Ventimiglia
// Francia: API open data governo francese — media lungo tragitto confine→Nizza (imbarco traghetto)
// Corsica: stessa API governo francese — media intorno a Porto-Vecchio/Golfo di Sogno

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

// Punti in Corsica: Porto-Vecchio centro/Poretta → Golfo di Sogno/Lecci
const CO_WAYPOINTS = [
    [41.5912, 9.2795],  // Porto-Vecchio centro
    [41.6100, 9.3000],  // Lecci / Golfo di Sogno
];

const FR_API_BASE = 'https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets'
    + '/prix-des-carburants-en-france-flux-instantane-v2/records';

async function fetchFuelPrices() {
    const [fr, co, itG, itB] = await Promise.allSettled([
        fetchFranceZone(FR_WAYPOINTS),
        fetchFranceZone(CO_WAYPOINTS),
        fetchItalyFuel('gasolio'),
        fetchItalyFuel('benzina')
    ]);

    const frData = fr.status === 'fulfilled' ? fr.value : null;
    const coData = co.status === 'fulfilled' ? co.value : null;
    const itData = (itG.status === 'fulfilled' && itB.status === 'fulfilled')
        ? { gazole: itG.value, sp95: itB.value }
        : null;

    renderFuelPage(itData, frData, coData);
    renderFuelWidget(coData);
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

// ===== FETCH FRANCIA / CORSICA (stessa API, waypoint diversi) =====
async function fetchFranceZone(waypoints) {
    const results = await Promise.allSettled(
        waypoints.map(([lat, lon]) => {
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

// ===== WIDGET DASHBOARD ===== (mostra Corsica: è il prezzo rilevante durante il soggiorno)
function renderFuelWidget(co) {
    const el  = document.getElementById('dash-fuel-val');
    const sub = document.getElementById('dash-fuel-sub');
    if (!el) return;
    if (!co?.gazole) { el.textContent = '—'; if (sub) sub.textContent = 'non disponibile'; return; }
    el.textContent = '€ ' + co.gazole.toFixed(3);
    if (sub) sub.textContent = 'gasolio Corsica';
}

// ===== PAGINA INFO =====
function renderFuelPage(it, fr, co) {
    const el = document.getElementById('fuel-section');
    if (!el) return;

    if (!it && !fr && !co) {
        el.innerHTML = `<div class="fuel-error">
            ⚠️ Prezzi non disponibili. Verifica la connessione.<br><br>
            <button class="fuel-refresh" onclick="fetchFuelPrices()">🔄 Riprova</button>
        </div>`;
        return;
    }

    const now = new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });

    const rows = [
        { label: 'Gasolio', it: it?.gazole, fr: fr?.gazole, co: co?.gazole },
        { label: 'Benzina', it: it?.sp95,   fr: fr?.sp95,   co: co?.sp95   },
    ];

    let html = `<div class="fuel-grid fuel-grid-4">
        <div class="fuel-header"></div>
        <div class="fuel-header">🇮🇹 Tragitto IT</div>
        <div class="fuel-header">🇫🇷 Francia</div>
        <div class="fuel-header">🇫🇷 Corsica</div>`;

    rows.forEach(row => {
        const vals = { it: row.it, fr: row.fr, co: row.co };
        const min  = Math.min(...Object.values(vals).filter(v => v != null));
        html += `<div class="fuel-row-label">${row.label}</div>`;
        ['it', 'fr', 'co'].forEach(key => {
            const v = vals[key];
            const isBest = v != null && v === min;
            html += `<div class="fuel-row-val ${isBest ? 'best' : ''}">${v ? '€ ' + v.toFixed(3) : '—'}</div>`;
        });
    });

    html += `</div>
        <div class="fuel-note">IT: media self-service (VA→MI→AL→SV→IM→Ventimiglia) · FR: media sul tragitto (Menton→Nizza) · Corsica: media Porto-Vecchio/Golfo di Sogno · ${now}</div>
        <button class="fuel-refresh" onclick="fetchFuelPrices()">🔄 Aggiorna</button>
        <a href="https://maps.google.com/?q=stazione+di+servizio+vicino+a+me" target="_blank" class="fuel-maps-btn">🗺 Trova distributore vicino</a>`;

    el.innerHTML = html;
}

// ===== UTILITY =====
function avg(arr) {
    const v = (arr || []).filter(x => x > 0.5 && x < 5);
    return v.length ? v.reduce((a, b) => a + b, 0) / v.length : null;
}
