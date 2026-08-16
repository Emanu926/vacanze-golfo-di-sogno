// ===== METEO — Open-Meteo API =====
// Coordinate Golfo di Sogno, Porto-Vecchio (Corse-du-Sud)
const LAT = 41.6292;
const LON = 9.3155;

const METEO_URL = `https://api.open-meteo.com/v1/forecast`
    + `?latitude=${LAT}&longitude=${LON}`
    + `&current=temperature_2m,apparent_temperature,weathercode,windspeed_10m,winddirection_10m,windgusts_10m`
    + `&daily=weathercode,temperature_2m_max,temperature_2m_min,windspeed_10m_max,winddirection_10m_dominant,precipitation_sum`
    + `&timezone=Europe%2FParis&forecast_days=7`;

async function fetchWeather() {
    try {
        const res = await fetch(METEO_URL);
        if (!res.ok) throw new Error('API error');
        const data = await res.json();
        renderDashboardWidgets(data);
        renderMeteoPage(data);
    } catch (e) {
        console.warn('Meteo non disponibile:', e);
        setEl('dash-weather-sub', 'non disponibile');
        setEl('dash-wind-sub', 'non disponibile');
        document.getElementById('meteo-today').innerHTML =
            '<div class="meteo-error">⚠️ Dati meteo non disponibili.<br>Controlla la connessione.</div>';
    }
}

// ===== WIDGETS DASHBOARD =====
function renderDashboardWidgets(data) {
    const c = data.current;
    const temp = Math.round(c.temperature_2m) + '°';
    const desc = weatherDesc(c.weathercode);
    const icon = weatherIcon(c.weathercode);
    const ws   = Math.round(c.windspeed_10m);
    const wl   = windLevel(ws);

    setEl('dash-weather-icon', icon);
    setEl('dash-weather-val', temp);
    setEl('dash-weather-sub', desc);
    setEl('dash-wind-inline', ws + ' km/h · ' + windName(c.winddirection_10m));
}

// ===== PAGINA METEO =====
function renderMeteoPage(data) {
    const c = data.current;
    const d = data.daily;
    const ws   = Math.round(c.windspeed_10m);
    const wg   = Math.round(c.windgusts_10m);
    const wl   = windLevel(ws);
    const wdir = windName(c.winddirection_10m);

    // Alba e tramonto
    const sun = getSunTimes(LAT, LON, new Date());
    const sunRow = sun
        ? `<div class="meteo-sun">🌅 ${fmtTime(sun.rise)} &nbsp;·&nbsp; 🌇 ${fmtTime(sun.set)}</div>`
        : '';

    // Card oggi
    document.getElementById('meteo-today').innerHTML = `
        <div class="meteo-card-today">
            <div class="meteo-main">
                <div class="meteo-big-icon">${weatherIcon(c.weathercode)}</div>
                <div class="meteo-big-temp">${Math.round(c.temperature_2m)}°</div>
            </div>
            <div class="meteo-desc">${weatherDesc(c.weathercode)}</div>
            <div class="meteo-feels">Percepita ${Math.round(c.apparent_temperature)}°C</div>
            ${sunRow}
        </div>
    `;

    // Card vento
    document.getElementById('meteo-wind').innerHTML = `
        <div class="wind-card">
            <div class="wind-header">
                <span class="wind-title">💨 Vento</span>
                <span class="wind-badge" style="background:${wl.color}">${wl.label}</span>
            </div>
            <div class="wind-body">
                <div class="wind-main-info">
                    <div class="wind-arrow" style="transform:rotate(${c.winddirection_10m}deg)">↑</div>
                    <div>
                        <div class="wind-speed">${ws} km/h</div>
                        <div class="wind-dir">${wdir} (${windDir(c.winddirection_10m)})</div>
                    </div>
                </div>
                <div class="wind-gusts">
                    <span>Raffiche</span>
                    <strong>${wg} km/h</strong>
                </div>
            </div>
        </div>
    `;

    // Previsioni 7 giorni
    const nomi = ['Dom','Lun','Mar','Mer','Gio','Ven','Sab'];
    let html = '<div class="forecast-title">Prossimi 7 giorni</div><div class="forecast-row">';
    for (let i = 0; i < 7; i++) {
        const date    = new Date(d.time[i] + 'T12:00:00');
        const dayName = i === 0 ? 'Oggi' : nomi[date.getDay()];
        const wMax    = Math.round(d.windspeed_10m_max[i]);
        const wlDay   = windLevel(wMax);
        html += `
            <div class="forecast-day ${i === 0 ? 'today' : ''}">
                <div class="fc-day">${dayName}</div>
                <div class="fc-icon">${weatherIcon(d.weathercode[i])}</div>
                <div class="fc-max">${Math.round(d.temperature_2m_max[i])}°</div>
                <div class="fc-min">${Math.round(d.temperature_2m_min[i])}°</div>
                <div class="fc-wind" style="color:${wlDay.color}">${wMax}<small>km/h</small></div>
            </div>`;
    }
    html += '</div>';
    document.getElementById('forecast-strip').innerHTML = html;
}

// ===== ALBA E TRAMONTO (calcolo astronomico offline) =====
function getSunTimes(lat, lon, date) {
    const rad = Math.PI / 180;
    const deg = 180 / Math.PI;
    const JD  = date.getTime() / 86400000 + 2440587.5;
    const n   = Math.round(JD - 2451545 + 0.0008);
    const Js  = n - lon / 360;
    const M   = (357.5291 + 0.98560028 * Js) % 360;
    const C   = 1.9148 * Math.sin(M * rad) + 0.02 * Math.sin(2 * M * rad) + 0.0003 * Math.sin(3 * M * rad);
    const lam = (M + C + 180 + 102.9372) % 360;
    const Jtr = 2451545 + Js + 0.0053 * Math.sin(M * rad) - 0.0069 * Math.sin(2 * lam * rad);
    const sinD = Math.sin(lam * rad) * Math.sin(23.4397 * rad);
    const cosH = (Math.sin(-0.833 * rad) - Math.sin(lat * rad) * sinD) / (Math.cos(lat * rad) * Math.cos(Math.asin(sinD)));
    if (cosH < -1 || cosH > 1) return null;
    const HA  = Math.acos(cosH) * deg;
    const toDate = jd => new Date((jd - 2440587.5) * 86400000);
    return { rise: toDate(Jtr - HA / 360), set: toDate(Jtr + HA / 360) };
}

function fmtTime(date) {
    return date.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Paris' });
}

// ===== UTILITY =====
function setEl(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
}

function weatherIcon(code) {
    if (code === 0)           return '☀️';
    if (code <= 1)            return '🌤️';
    if (code <= 2)            return '⛅';
    if (code <= 3)            return '☁️';
    if (code <= 48)           return '🌫️';
    if (code <= 55)           return '🌦️';
    if (code <= 67)           return '🌧️';
    if (code <= 77)           return '❄️';
    if (code <= 82)           return '🌧️';
    if (code <= 86)           return '🌨️';
    return '⛈️';
}

function weatherDesc(code) {
    if (code === 0)  return 'Cielo sereno';
    if (code <= 1)   return 'Prevalentemente sereno';
    if (code <= 2)   return 'Parzialmente nuvoloso';
    if (code <= 3)   return 'Nuvoloso';
    if (code <= 48)  return 'Nebbia';
    if (code <= 55)  return 'Pioggerella';
    if (code <= 67)  return 'Pioggia';
    if (code <= 77)  return 'Neve';
    if (code <= 82)  return 'Acquazzoni';
    if (code <= 86)  return 'Neve';
    return 'Temporale';
}

function windDir(deg) {
    const dirs  = ['N','NE','E','SE','S','SO','O','NO'];
    return dirs[Math.round(deg / 45) % 8];
}

function windName(deg) {
    const nomi = ['Tramontana','Grecale','Levante','Scirocco','Ostro','Libeccio','Ponente','Maestrale'];
    return nomi[Math.round(deg / 45) % 8];
}

function windLevel(kmh) {
    if (kmh < 15) return { label: 'Calmo',    color: '#22C55E' };
    if (kmh < 30) return { label: 'Moderato', color: '#EAB308' };
    if (kmh < 50) return { label: 'Sostenuto',color: '#F97316' };
    return           { label: '⚠️ Mistral',   color: '#EF4444' };
}
