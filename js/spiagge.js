const SPIAGGE = [
    {
        nome: 'Spiaggia di Golfo di Sogno',
        km: 0.3, libera: false, cani: false, bar: true,
        note: 'La spiaggia proprio sotto casa, sabbia bianca nella baia di Stagnolu. Accesso attraverso il camping Golfo di Sogno (oltre 1 ora è a pagamento). Cani: da verificare in loco.',
        addr: 'Golfo di Sogno Porto-Vecchio',
    },
    {
        nome: 'Spiaggia di Cala Rossa',
        km: 3, libera: true, cani: false, bar: true,
        note: 'Baia elegante con pineta, stabilimenti balneari e il Ranch\'O Plage in riva al mare.',
        addr: 'Plage de Cala Rossa Lecci Porto-Vecchio',
    },
    {
        nome: 'Spiaggia di Palombaggia',
        km: 10, libera: true, cani: true, bar: true,
        note: 'Una delle spiagge più famose di Corsica, pineta e acqua turchese, molto affollata in agosto. Cani al guinzaglio ammessi tutto l\'anno per deroga comunale — verificare i cartelli in loco.',
        addr: 'Plage de Palombaggia Porto-Vecchio',
    },
    {
        nome: 'Spiaggia di Santa Giulia',
        km: 12, libera: true, cani: true, bar: true,
        note: 'Baia chiusa e acqua bassissima, ideale famiglie. Cani al guinzaglio ammessi tutto l\'anno per deroga comunale — verificare i cartelli in loco.',
        addr: 'Plage de Santa Giulia Porto-Vecchio',
    },
];

function initSpiagge() {
    renderSpiagge();
    const val = document.getElementById('dash-spiagge-val');
    if (val) val.textContent = SPIAGGE.length;
}

function renderSpiagge() {
    const el = document.getElementById('spiagge-list');
    if (!el) return;

    el.innerHTML = SPIAGGE.map(s => {
        const caniTag  = s.cani
            ? '<span class="badge-cani">🐾 cani ok</span>'
            : '<span class="badge-nocani">🚫 no cani</span>';
        const barTag   = s.bar ? '<span class="badge-bar">🍹 bar</span>' : '';
        const tipoTag  = s.libera ? '<span class="badge-libera">🆓 libera</span>' : '<span class="badge-attr">💰 attrezzata</span>';
        const mapsUrl  = 'https://maps.google.com/?q=' + encodeURIComponent(s.addr);
        return `<div class="spiaggia-card">
            <div class="sp-header">
                <div class="sp-nome">${s.nome}</div>
                <div class="sp-km">${s.km < 1 ? (s.km * 1000) + ' m' : s.km + ' km'}</div>
            </div>
            <div class="sp-badges">${tipoTag}${caniTag}${barTag}</div>
            <div class="sp-note">${s.note}</div>
            <div class="sp-links"><a href="${mapsUrl}" target="_blank" class="link-maps">🗺 Maps</a></div>
        </div>`;
    }).join('');
}
