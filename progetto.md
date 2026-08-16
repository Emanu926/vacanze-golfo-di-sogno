# Vacanze Ema e Stefy — Contesto del progetto

## Chi siamo
- Ema e Stefy, vicini ai 60 anni
- Cane: **Bibi**, cucciolo di Bulldog francese (viene sempre in vacanza)
- Stile di vacanza: relax totale, niente stress, niente folla — soprattutto Stefy ha bisogno di staccare completamente

## Vacanza 2026 — Corsica, Golfo di Sogno
- **Dove**: Golfo di Sogno, frazione di Porto-Vecchio (Corse-du-Sud) — sulla strada tra la Trinité e Cala Rossa
- **Casa**: da definire — indirizzo esatto e contatto dell'affittuario ancora da aggiungere (campo editabile in-app)
- **Quando**: partenza 28 agosto, soggiorno di almeno 2 settimane — rientro non ancora deciso
- **Partenza da**: Castronno (VA) in auto fino a Nizza, poi traghetto per Porto-Vecchio
- **Auto**: Land Rover Discovery Sport

## Tragitto e traghetto
- **Auto**: Castronno → Nizza, ~370 km, ~3h45 di guida senza soste (via A26/A10 fino al confine, poi A8 francese). In agosto, weekend di partenza, mettere in conto traffico: consigliati **45–60 minuti di margine** oltre al tempo di guida puro.
- **Traghetto**: Corsica Ferries, Nizza → Porto-Vecchio, **venerdì 28/8**. Orario indicativo **22:30** (l'utente ha in mente "le 22" — **verificare l'orario esatto sulla prenotazione**, la app segnala la discrepanza).
- **Durata crossing**: ~12h30–13h, arrivo stimato **sabato 29/8 mattina**.
- **Imbarco auto**: Port de Commerce, Terminal 1, 06300 Nice. Presentarsi con **1h30–2h di anticipo** sull'orario di partenza per il check-in e l'imbarco del veicolo.
- **Partenza consigliata da Castronno**: nel primo pomeriggio di venerdì 28/8 (indicativamente 15:00–16:00), per arrivare al porto con margine reale considerando guida + traffico + check-in. Il countdown nell'app (`state.departure` in `app.js`) è impostato su questa base e va aggiustato se cambiano i piani.

## Come passiamo il tempo
- Spiaggia di Golfo di Sogno proprio sotto casa (accesso tramite il camping omonimo)
- Spostamenti verso le spiagge più note della zona (Cala Rossa, Palombaggia, Santa Giulia)
- Zona nuova, da esplorare — meno "pilota automatico" rispetto a Les Issambres

---

## Struttura dell'app

### Navigazione
- **Home** — dashboard con 12 widget + sezione Note in fondo
- **Meteo** — previsioni dettagliate + vento + alba/tramonto (back → Home)
- **Checklist** — lista pre-partenza (back → Home)
- **Zona** — 4 sub-tab: Mercati | Negozi | Aperitivi | Ristoranti (back → Home)
- **Info** — carburante + contatti utili + traghetto (back → Home)
- **Maltempo** — lista attività al coperto (back → Home)
- **Spiagge** — spiagge vicine con info e Maps (back → Home)
- **Spese** — tracker spese con totale (back → Home)
- **Lista spesa** — lista della spesa con checkbox (back → Home)
- Header con titolo cliccabile → Home (sempre visibile)
- Nessuna barra di navigazione inferiore

### Home — 12 widget + Note
| Widget | Contenuto | Destinazione |
|--------|-----------|--------------|
| ✈️ Countdown | giorni/ore alla partenza (28/8) | — |
| ✅ Checklist | % completamento | → Checklist |
| 🌤 Meteo | temperatura + descrizione + vento inline | → Meteo |
| 🛒 Mercato oggi | mercato del giorno | → Zona/Mercati |
| ⛽ Gasolio | prezzo IT vs FR (tragitto verso Nizza) | → Info |
| 🍽 Ristoranti | conteggio | → Zona/Ristoranti |
| 🛍 Negozi | pesce · carne | → Zona/Negozi |
| 🥂 Aperitivi | conteggio locali | → Zona/Aperitivi |
| 🌧 Se piove | conteggio idee al coperto | → Maltempo |
| 🏖 Spiagge | conteggio spiagge | → Spiagge |
| 💶 Spese | totale € + n. voci | → Spese |
| 🛒 Lista spesa | voci da prendere | → Lista spesa |
| 📝 Note | campo testo + lista note con data/ora | (in home) |
| 🚗 Percorso | link diretto Google Maps Castronno → porto di Nizza | apre Maps |

---

## Dati Golfo di Sogno / Porto-Vecchio

Elenco **volutamente essenziale**: solo esercizi trovati con nome e indirizzo verificabile online. Rispetto alla versione Les Issambres (costruita con più tempo sul posto), qui mancano ancora aperitivi/negozi/pizzerie minori — da integrare una volta arrivati.

### Mercati (3)
- Mercato di Porto-Vecchio: domenica 9:00–13:00, città alta vicino al municipio
- Mercato del giovedì (solo luglio-agosto): 7:00–13:00, stesso luogo
- Mercato notturno del giovedì (solo luglio-agosto): artigianato, 19:00–24:00

### Supermercati (4)
- Carrefour Market (La Trinité, il più vicino) · Casino CODIM 2 · Hyper U (Les Quatre Chemins) · Auchan ex Géant Casino (ZI Poretta)

### Aperitivi (2)
- Da Mare by Sea Lounge — Palombaggia · sunset lounge con DJ set (15:00–20:00 in agosto)
- Bar Plage — Santa Giulia · cucina mediterranea vista baia

### Ristoranti (3)
- Golfo Di Sogno — Ogliastraccio, fronte spiaggia, sulla strada per Cala Rossa (il più vicino)
- Ranch'O Plage — Cala Rossa, pranzo/cena in riva al mare
- Costa Marina — vista Palombaggia, cucina francese + pizza al forno a legna

### Negozi (2)
- 🐟 Pescheria: Poissonnerie Calypso (Porto-Vecchio)
- 🥩 Macelleria: Boucherie des Éleveurs (Les Quatre Chemins)

Mancano ancora: frutta/verdura, pasticceria, panetteria — nessun nome verificato trovato, da cercare in loco.

### Spiagge (4)
- Golfo di Sogno (0,3 km) — sotto casa, accesso dal camping, cani da verificare
- Cala Rossa (3 km) — libera, bar, no cani
- Palombaggia (10 km) — libera, bar, **cani ok** al guinzaglio (deroga comunale, verificare cartelli)
- Santa Giulia (12 km) — libera, bar, **cani ok** al guinzaglio (deroga comunale, verificare cartelli)

### Contatti utili (Info)
- Alloggio Golfo di Sogno — campo editabile, indirizzo e telefono da aggiungere
- Emergenze: SAMU 15 · Police 17 · Pompiers 18 · EU 112
- Vet: Clinique Vétérinaire des 4 Portes `04 95 70 13 58` (stesso numero per urgenze fuori orario)
- Farmacia: Pharmacie des 4 Chemins `04 95 70 13 69` — orari da verificare in loco
- Taxi Ciabrini 24h `06 86 73 97 80`
- Taxi H24 `04 20 30 30 35`
- Traghetto Nizza → Porto-Vecchio: Corsica Ferries, ven 28/8 ~22:30 (da verificare), Port de Commerce Terminal 1 Nizza

### Regole per Bibi
- Guinzaglio obbligatorio ovunque
- Molte spiagge turistiche vietano i cani in alta stagione — Palombaggia e Santa Giulia fanno eccezione (deroga comunale, cani ok al guinzaglio tutto l'anno, verificare cartelli)
- Supermercati: cani non ammessi
- Microchip + vaccinazione antirabbica obbligatori (Francia, Corsica compresa)

### Maltempo (5 attività al coperto)
- Chiesetta di San Giovanni Battista (Porto-Vecchio) · Complesso Galaxy — cinema/bowling/laser game · Alta Game — squash/escape game/VR · Bastion de l'Étendard (Bonifacio, ~25 km) · Città vecchia e acquario di Bonifacio (~25 km)

---

## Checklist pre-partenza

13 categorie, ~42 item. Stato salvato in localStorage.
Sezione **Aggiunte** in fondo: voci custom aggiungibili/modificabili/eliminabili dall'app.

Categorie: Casa · Auto · Documenti · Cibo · Bibi · Spiaggia e Piscina · Vestiti · Libri e Svago · Tecnologia · DJ · Fotografia · Medicine · Beauty

Da valutare: aggiungere voce "documenti traghetto/prenotazione Corsica Ferries" tra i Documenti, non presente nel modello originale (pensato per un viaggio solo su strada).

---

## Note tecniche

### File principali
- `index.html` — struttura PWA, 9 sezioni, 12+ widget home + Note
- `js/app.js` — stato, navigazione, countdown (partenza 28/8), contatti editabili
- `js/weather.js` — meteo Open-Meteo + calcolo astronomico alba/tramonto (coordinate Golfo di Sogno)
- `js/fuel.js` — carburante IT (6 waypoint Castronno→Ventimiglia) + FR (2 waypoint Menton→Nizza)
- `js/checklist.js` — checklist con localStorage + sezione Aggiunte custom
- `js/zona.js` — mercati, negozi, aperitivi, ristoranti, regole cane, maltempo (dati Porto-Vecchio)
- `js/notes.js` — note con data/ora, persistenza localStorage, conferma eliminazione
- `js/spese.js` — tracker spese con totale, conferma eliminazione
- `js/listaspesa.js` — lista spesa con checkbox, svuota con conferma
- `js/spiagge.js` — 4 spiagge con info e link Maps
- `css/style.css` — design responsive mobile-first
- `sw.js` — service worker cache-first (`vacanze-golfo-sogno-v1`)
- `manifest.json` — PWA manifest

### API usate
- **Meteo**: Open-Meteo (gratuita, no chiave) — `api.open-meteo.com`
- **Carburante IT**: API community MIMIT — 6 waypoint Castronno→Ventimiglia, raggio 15km, self-service
- **Carburante FR**: API governo francese — 2 waypoint Menton→Nizza, raggio 15km
- **Alba/Tramonto**: calcolo astronomico offline (formula NOAA), nessuna API
- Le API carburante richiedono HTTPS o localhost (non funzionano su `file://`)

### URL produzione (GitHub Pages)
```
https://emanu926.github.io/vacanze-golfo-di-sogno/
```
Repository: `https://github.com/Emanu926/vacanze-golfo-di-sogno` (duplicato di `vacanze-es`, storia completa importata)

### Server locale per sviluppo
```
cd "vacanze-golfo-di-sogno"
python -m http.server 8765
```
Aprire su `http://127.0.0.1:8765` — dopo ogni modifica fare **Ctrl+Shift+R** per bypassare il service worker.

### localStorage
| Chiave | Contenuto |
|--------|-----------|
| `checklist` | stato checked degli item `{id: boolean}` |
| `checklist_custom` | voci aggiunte dall'utente `[{id, text}]` |
| `contatto-villa` | indirizzo/numero alloggio (editabile in-app) |
| `vacation-notes` | note `[{text, ts}]` |
| `vacation-spese` | spese `[{motivo, importo, ts}]` |
| `vacation-listaspesa` | lista spesa `[{testo, fatto}]` |

---

## Stato costruzione

### ✅ Ereditato da Les Issambres (invariato)
PWA con service worker, navigazione header/back, 12 widget home + Note, meteo con vento inline e alba/tramonto, checklist 13 categorie + Aggiunte custom, Zona 4 sub-tab, contatti editabili in localStorage, tracker spese, lista spesa con condivisione, note con data/ora, installazione PWA iPhone, campi testo 16px anti-zoom Safari.

### ✅ Aggiornato per Golfo di Sogno
- Coordinate meteo e distanze aggiornate su Golfo di Sogno/Porto-Vecchio
- Tragitto carburante ridotto al solo tratto rilevante (Castronno→Ventimiglia IT, Menton→Nizza FR) dato che dopo Nizza si imbarca
- Widget "Percorso" ora punta al porto di Nizza (non più a un indirizzo villa)
- Nuova card Info con dati traghetto Nizza→Porto-Vecchio (orario da confermare, terminal, tempistiche imbarco)
- Dati zona (mercati, ristoranti, negozi, spiagge, contatti) sostituiti con quelli di Porto-Vecchio — elenco più corto dell'originale, verificato solo con nomi/indirizzi trovabili online
- Regole cane aggiornate (eccezione Palombaggia/Santa Giulia)
- Cache service worker rinominata `vacanze-golfo-sogno-v1`

### 🔲 Da fare
- Aggiungere indirizzo e contatto esatti dell'alloggio (non ancora prenotato/definito al momento della duplicazione)
- Confermare orario esatto del traghetto sulla prenotazione reale
- Decidere e inserire la data di rientro
- Espandere aperitivi/negozi/pizzerie una volta sul posto
- Sincronizzazione checklist/note/spese tra i due iPhone (richiede backend, es. Supabase) — invariato dal modello originale
- Widget meduse, mappa offline, eventi in zona — invariato dal modello originale

### 📋 Provenienza
Cartella duplicata da `vacanze-es` (Les Issambres 2026) il 16/08/2026 tramite import GitHub (storia commit conservata). Per la prossima vacanza si ripete lo stesso procedimento: duplicare, aggiornare coordinate/data/dati locali/nome alloggio/versione cache. Le località già visitate restano nella loro cartella.

---
*Ultimo aggiornamento: 16 agosto 2026*
