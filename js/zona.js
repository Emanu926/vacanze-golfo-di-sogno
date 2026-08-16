// ===== DATI ZONA GOLFO DI SOGNO / PORTO-VECCHIO =====
// Elenco volutamente essenziale: solo esercizi trovati con nome/indirizzo verificabile.
// Da integrare sul posto (aperitivi, negozi extra, pizzerie) — vedi progetto.md.

// Giorni: 0=Dom 1=Lun 2=Mar 3=Mer 4=Gio 5=Ven 6=Sab
const MERCATI = [
    { nome: 'Mercato di Porto-Vecchio',         luogo: 'Città alta, vicino al municipio', giorni: [0],  ora: '9:00–13:00',  tipo: '🥦 Alimentare',   km: 8 },
    { nome: 'Mercato del giovedì',               luogo: 'Città alta, vicino al municipio', giorni: [4],  ora: '7:00–13:00',  tipo: '🥦 Alimentare',   km: 8, soloEstate: true },
    { nome: 'Mercato notturno del giovedì',      luogo: 'Città alta, Porto-Vecchio',       giorni: [4],  ora: '19:00–24:00', tipo: '🌙 Artigianato', km: 8, soloEstate: true },
];

const GIORNI_NOMI = ['Domenica','Lunedì','Martedì','Mercoledì','Giovedì','Venerdì','Sabato'];
const GIORNI_BREVI = ['Dom','Lun','Mar','Mer','Gio','Ven','Sab'];

const APERITIVI = [
    { nome: 'Da Mare by Sea Lounge', luogo: 'Palombaggia', addr: 'Da Mare Sea Lounge Plage de Palombaggia Porto-Vecchio', tel: '', note: 'Sunset lounge con DJ set su Palombaggia, dalle 15 alle 20 in agosto · ~10 km' },
    { nome: 'Bar Plage',             luogo: 'Santa Giulia', addr: 'Bar Plage Santa Giulia Porto-Vecchio',                  tel: '', note: 'Cucina mediterranea vista baia di Santa Giulia · ~12 km' },
    { nome: 'L\'Othello',            luogo: 'centro storico', addr: 'L\'Othello Porto-Vecchio',                            tel: '', note: 'Primo cocktail e absinthe bar della città, retrò e vivace · ~8 km' },
    { nome: 'Le Point de Vue',       luogo: 'centro storico', addr: 'Le Point de Vue Porto-Vecchio',                       tel: '', note: 'Sotto il municipio, vista sul golfo, cocktail a buon prezzo · ~8 km' },
    { nome: 'Le Patio',              luogo: 'centro storico', addr: 'Le Patio Porto-Vecchio',                              tel: '', note: 'Bar all\'aperto in un vicolo del centro storico, aperitivo intimo · ~8 km' },
    { nome: 'Bar Le Vinyle',         luogo: 'centro storico', addr: 'Bar Le Vinyle Porto-Vecchio',                         tel: '', note: 'Atmosfera calda, musica dal vivo, salumi · ~8 km' },
];

const RISTORANTI = [
    { nome: 'Rôtisserie Franky Porto-Vecchio', luogo: 'vicino alla villa', km: 1.2, cani: false, tel: '', addr: 'Rôtisserie Franky Porto-Vecchio', note: 'Il più vicino alla villa (1,2 km).' },
    { nome: 'Restaurant l\'Alivi Pezza Cardo', luogo: 'vicino alla villa', km: 1.3, cani: false, tel: '', addr: 'Restaurant l\'Alivi Pezza Cardo Porto-Vecchio', note: '1,3 km dalla villa.' },
    { nome: 'Passe Temps',                     luogo: 'vicino alla villa', km: 1.6, cani: false, tel: '', addr: 'Restaurant Passe Temps Porto-Vecchio', note: '1,6 km dalla villa.' },
    { nome: 'Golfo Di Sogno',   luogo: 'Ogliastraccio', km: 1,  cani: false, tel: '', addr: 'Golfo Di Sogno Ogliastraccio Porto-Vecchio',    note: 'Fronte spiaggia, sulla strada per Cala Rossa. Buona accoglienza, recensioni positive.' },
    { nome: 'Ranch\'O Plage',   luogo: 'Cala Rossa',    km: 4,  cani: false, tel: '', addr: 'Ranch\'O Plage Cala Rossa Lecci Porto-Vecchio', note: 'Pranzo e cena in riva al mare, bar e gelati.' },
    { nome: 'Costa Marina',     luogo: 'Palombaggia',   km: 10, cani: false, tel: '', addr: 'Costa Marina Palombaggia Porto-Vecchio',        note: 'Vista sulla spiaggia di Palombaggia, cucina francese e pizza al forno a legna.' },
    { nome: 'Ristorante Terramea', luogo: 'Route de Palombaggia', km: 9, cani: false, tel: '', addr: 'Ristorante Terramea Route de Palombaggia Porto-Vecchio', note: 'Vista mare e vegetazione lussureggiante sulla route de Palombaggia.' },
    { nome: 'Le Belvédère',        luogo: 'Porto-Vecchio',        km: 8, cani: false, tel: '', addr: 'Le Belvédère Porto-Vecchio',                              note: 'Vista mozzafiato sul mare, cucina raffinata.' },
    { nome: 'Les Jardins De La Paresse', luogo: 'città vecchia', km: 8, cani: false, tel: '', addr: 'Les Jardins De La Paresse Porto-Vecchio', note: 'Pizzeria/ristorante nel cuore della città vecchia, vista sul porto.' },
    { nome: 'Tropicana',           luogo: 'Porto-Vecchio',        km: 8, cani: false, tel: '', addr: 'Tropicana Porto-Vecchio',                                 note: 'Cucina francese, atmosfera accogliente.' },
    { nome: 'Casa del Mar',        luogo: 'Porto-Vecchio',        km: 8, cani: false, tel: '', addr: 'Casa del Mar Porto-Vecchio',                               note: 'Ristorante stellato, chef Fabio Bragagnolo, cucina corsa e italiana creativa — occasione speciale.' },
];

const SUPERMERCATI = [
    { nome: 'Carrefour Market', luogo: 'La Trinité',      note: 'il più vicino · ~6 km', addr: 'Carrefour Market Rond-Point la Trinité Porto-Vecchio' },
    { nome: 'Casino CODIM 2',   luogo: 'Porto-Vecchio',    note: '~8 km',                 addr: 'Casino CODIM 2 Rue du 9 Septembre 1943 Porto-Vecchio' },
    { nome: 'Hyper U',          luogo: 'Les Quatre Chemins', note: '~9 km, grande',       addr: 'Hyper U Centre Commercial Grand Sud Les Quatre Chemins Porto-Vecchio' },
    { nome: 'Auchan',           luogo: 'ZI Poretta',       note: '~9 km, ex Géant Casino',addr: 'Auchan Rue Henri Frenay ZI Poretta Porto-Vecchio' },
];

const NEGOZI = [
    { cat: '🐟 Pescheria',  nome: 'Poissonnerie Calypso',    luogo: 'Porto-Vecchio',      addr: 'Calypso Avenue Georges-Pompidou Porto-Vecchio',            tel: '', note: '~8 km' },
    { cat: '🥩 Macelleria', nome: 'Boucherie des Éleveurs',  luogo: 'Les Quatre Chemins', addr: 'Boucherie des Éleveurs Avenue de Bastia Porto-Vecchio',   tel: '', note: '~9 km' },
    { cat: '🥦 Frutta e verdura', nome: 'Fratani Michel',    luogo: 'Lecci',              addr: 'Fratani Michel Villa Les Chenes Verts Lecci',              tel: '', note: 'Il più vicino alla villa, stessa zona di Lecci/Golfo di Sogno.' },
    { cat: '🥖 Panetteria', nome: 'Boulangerie Pietri',       luogo: 'Suariccia, Porto-Vecchio', addr: 'Boulangerie Pietri Rue du 9 Septembre 1943 Porto-Vecchio', tel: '', note: '~8 km' },
    { cat: '🥖 Panetteria', nome: 'Boulangerie Patisserie Moderne', luogo: 'Poretta, Porto-Vecchio', addr: 'Boulangerie Patisserie Moderne Rue Jérôme Carcopino Porto-Vecchio', tel: '', note: '~9 km' },
];

const MALTEMPO = [
    { cosa: 'Chiesetta di San Giovanni Battista', dove: 'Porto-Vecchio, città alta', note: 'Piccola chiesa storica nel centro, arredi e reperti locali.' },
    { cosa: 'Complesso Galaxy',                   dove: 'a nord di Porto-Vecchio',   note: 'Cinema, bowling, laser game.' },
    { cosa: 'Alta Game',                          dove: 'Porto-Vecchio',             note: 'Squash, escape game, realtà virtuale, calcetto.' },
    { cosa: 'Bastion de l\'Étendard',              dove: 'Bonifacio',                 note: 'Museo nella cittadella, sale sotterranee · ~25 km' },
    { cosa: 'Città vecchia e acquario',           dove: 'Bonifacio',                 note: 'Acquario e giro in barca coperta nelle Bocche di Bonifacio · ~25 km' },
];

const REGOLE_CANE = [
    '🐾 Guinzaglio obbligatorio in tutti i luoghi pubblici',
    '🏖 Molte spiagge turistiche vietano i cani in alta stagione — Palombaggia e Santa Giulia fanno eccezione: cani al guinzaglio ammessi tutto l\'anno per deroga comunale, ma verificare i cartelli in loco',
    '🍽 I ristoranti non sono obbligati ad accettare cani — meglio chiedere prima (terrasse sì di solito)',
    '🛒 Supermercati: cani non ammessi all\'interno',
    '✅ Cani ammessi nei parchi e nella maggior parte dei sentieri',
    '📋 Bibi deve avere microchip e vaccinazione antirabbica in regola per entrare in Francia (Corsica compresa)',
];

// ===== HELPER LINKS =====
function mapsLink(query) {
    const url = 'https://maps.google.com/?q=' + encodeURIComponent(query);
    return `<a href="${url}" target="_blank" class="link-maps">🗺 Maps</a>`;
}
function telLink(num) {
    if (!num) return '';
    const clean = '+33' + num.replace(/[\s.]/g, '').replace(/^0/, '');
    return `<a href="tel:${clean}" class="link-tel">📞 ${num}</a>`;
}

// ===== INIT =====
function initZona() {
    renderZona();
    renderMaltempo();
    initZonaTabs();
    updateMarketWidget();
    updateRistorantiWidget();
    updateAperitiviWidget();
    updateMaltempoWidget();
}

// ===== WIDGET RISTORANTI =====
function updateRistorantiWidget() {
    const val = document.getElementById('dash-rist-val');
    const sub = document.getElementById('dash-rist-sub');
    if (!val) return;
    const dogFriendly = RISTORANTI.filter(r => r.cani).length;
    val.textContent = RISTORANTI.length;
    if (sub) sub.textContent = dogFriendly + ' dog-friendly';
}

// ===== WIDGET APERITIVI =====
function updateAperitiviWidget() {
    const val = document.getElementById('dash-aper-val');
    if (!val) return;
    val.textContent = APERITIVI.length;
}

// ===== WIDGET MALTEMPO =====
function updateMaltempoWidget() {
    const val = document.getElementById('dash-maltempo-val');
    if (!val) return;
    val.textContent = MALTEMPO.length;
}

// ===== RENDER SEZIONE MALTEMPO =====
function renderMaltempo() {
    const el = document.getElementById('maltempo-list');
    if (!el) return;
    el.innerHTML = `<div class="zona-list">` +
        MALTEMPO.map(m => `<div class="zona-item">
            <div class="zi-nome">${m.cosa}</div>
            <div class="zi-luogo">📍 ${m.dove}</div>
            <div class="zi-note">${m.note}</div>
        </div>`).join('') +
    `</div>`;
}

// ===== NAVIGA A ZONA E ATTIVA IL TAB =====
function goToZona(tab) {
    goTo('zona');
    setZonaTab(tab);
}

function setZonaTab(tab) {
    document.querySelectorAll('.zona-tab').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
    document.querySelectorAll('.zona-panel').forEach(p => p.classList.toggle('active', p.id === 'zona-' + tab));
}

function initZonaTabs() {
    document.querySelectorAll('.zona-tab').forEach(btn => {
        btn.addEventListener('click', () => setZonaTab(btn.dataset.tab));
    });
}

// ===== WIDGET DASHBOARD — mercato di oggi =====
function updateMarketWidget() {
    const oggi   = new Date().getDay();
    const mese   = new Date().getMonth() + 1;
    const estate = mese >= 6 && mese <= 9;

    const oggi_mercati = MERCATI.filter(m =>
        m.giorni.includes(oggi) && (!m.soloEstate || estate)
    );

    const el    = document.getElementById('market-today');
    const place = document.getElementById('market-place');
    if (!el) return;

    if (oggi_mercati.length === 0) {
        el.textContent    = 'Nessuno';
        if (place) place.textContent = 'oggi non ci sono mercati';
    } else if (oggi_mercati.length === 1) {
        el.textContent    = oggi_mercati[0].nome.split('—')[0].trim();
        if (place) place.textContent = oggi_mercati[0].ora + ' · ' + oggi_mercati[0].km + ' km';
    } else {
        el.textContent    = oggi_mercati.length + ' mercati';
        if (place) place.textContent = 'vedi sezione Zona';
    }
}

// ===== RENDER SEZIONE ZONA =====
function renderZona() {
    const oggi  = new Date().getDay();
    const mese  = new Date().getMonth() + 1;
    const estate = mese >= 6 && mese <= 9;

    // --- PANEL MERCATI ---
    const elM = document.getElementById('zona-mercati');
    if (elM) {
        let html = '';
        const oggi_m = MERCATI.filter(m => m.giorni.includes(oggi) && (!m.soloEstate || estate));
        if (oggi_m.length > 0) {
            html += `<div class="zona-oggi-banner">Oggi: `;
            html += oggi_m.map(m => `<strong>${m.nome}</strong> ${m.ora}`).join(' · ');
            html += `</div>`;
        }
        html += `<div class="mercati-list">`;
        MERCATI.forEach(m => {
            const isOggi = m.giorni.includes(oggi) && (!m.soloEstate || estate);
            const giorniTesto = m.giorni.map(g => GIORNI_BREVI[g]).join(', ');
            html += `<div class="mercato-row ${isOggi ? 'oggi' : ''}">
                <div class="mercato-main">
                    <div class="mercato-nome">${m.nome}</div>
                    <div class="mercato-luogo">📍 ${m.luogo} · ${m.km === 0 ? 'qui' : m.km + ' km'} ${mapsLink(m.nome + ' ' + m.luogo)}</div>
                </div>
                <div class="mercato-meta">
                    <div class="mercato-giorni">${giorniTesto}</div>
                    <div class="mercato-ora">${m.ora}</div>
                    <div class="mercato-tipo">${m.tipo}${m.soloEstate ? ' · estate' : ''}</div>
                </div>
            </div>`;
        });
        html += `</div>`;
        html += `<div class="section-title" style="margin-top:20px">🛍 Supermercati</div><div class="zona-list">`;
        SUPERMERCATI.forEach(s => {
            html += `<div class="zona-item">
                <div class="zi-nome">${s.nome} ${mapsLink(s.addr)}</div>
                <div class="zi-note">${s.luogo} · ${s.note}</div>
            </div>`;
        });
        html += `</div>`;
        elM.innerHTML = html;
    }

    // --- PANEL APERITIVI ---
    const elA = document.getElementById('zona-aperitivi');
    if (elA) {
        let html = `<div class="zona-list">`;
        APERITIVI.forEach(a => {
            html += `<div class="zona-item">
                <div class="zi-nome">${a.nome}</div>
                <div class="zi-luogo">📍 ${a.luogo} ${mapsLink(a.addr)}</div>
                <div class="zi-note">${a.note}</div>
                ${a.tel ? `<div class="zi-links">${telLink(a.tel)}</div>` : ''}
            </div>`;
        });
        html += `</div>`;
        elA.innerHTML = html;
    }

    // --- PANEL NEGOZI ---
    const elN = document.getElementById('zona-negozi');
    if (elN) {
        const categorie = [...new Set(NEGOZI.map(n => n.cat))];
        let html = '';
        categorie.forEach(cat => {
            html += `<div class="section-title" style="margin-top:${html ? 20 : 0}px">${cat}</div><div class="zona-list">`;
            NEGOZI.filter(n => n.cat === cat).forEach(n => {
                html += `<div class="zona-item">
                    <div class="zi-nome">${n.nome}</div>
                    <div class="zi-luogo">📍 ${n.luogo} ${mapsLink(n.addr)}</div>
                    <div class="zi-note">${n.note}</div>
                    <div class="zi-links">${telLink(n.tel)}</div>
                </div>`;
            });
            html += `</div>`;
        });
        elN.innerHTML = html;
    }

    // --- PANEL RISTORANTI ---
    const elR = document.getElementById('zona-ristoranti');
    if (elR) {
        const renderList = (items) => items.map(r => {
            const kmTesto = r.km === 0 ? 'qui' : r.km + ' km';
            const caniBadge = r.cani ? ' · <span class="badge-cani">🐾 cani ok</span>' : '';
            return `<div class="zona-item">
                <div class="zi-nome">${r.nome}</div>
                <div class="zi-luogo">📍 ${r.luogo} · ${kmTesto}${caniBadge} ${mapsLink(r.addr)}</div>
                <div class="zi-note">${r.note}</div>
                ${r.tel ? `<div class="zi-links">${telLink(r.tel)}</div>` : ''}
            </div>`;
        }).join('');

        const ristoranti = RISTORANTI.filter(r => !r.pizza);
        const pizzerie   = RISTORANTI.filter(r => r.pizza);

        let html = `<div class="zona-list">${renderList(ristoranti)}</div>`;
        html += `<div class="section-title" style="margin-top:20px">🍕 Pizzerie</div>`;
        html += `<div class="zona-list">${renderList(pizzerie)}</div>`;
        elR.innerHTML = html;
    }
}

// ===== RENDER SEZIONE INFO — parte statica =====
function renderInfo() {
    const el = document.getElementById('info-static');
    if (!el) return;

    // Regole cane
    let html = `<div class="section-title" style="margin-top:20px">🐾 Regole per Bibi</div>
    <div class="zona-list">`;
    REGOLE_CANE.forEach(r => {
        html += `<div class="zi-regola">${r}</div>`;
    });
    html += `</div>`;

    el.innerHTML = html;
}
