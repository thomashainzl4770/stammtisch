# Stammtisch-App – Anleitung

Installierbare Web-App für Android und iPhone: Anwesenheit, Beiträge und Strafen, Zu- und Absagen,
Termine, Abstimmungen, Kasse, Statistik und Chronik. Kostenlos, ohne App Store.

- **Daten:** Google Firebase (Gratis-Tarif „Spark“, reicht für einen Stammtisch locker)
- **Webseite:** GitHub Pages (gratis)
- **Zugang:** Jedes Gerät wird einmal mit einem PIN freigeschaltet
  - **Runden-PIN** für Mitglieder: ansehen, selbst zu- und absagen, abstimmen
  - **Kassier-PIN**: zusätzlich Anwesenheit, Zahlungen, Buchungen, Termine usw. erfassen

Dauer der Einrichtung: etwa 30 Minuten, einmalig.

---

## Teil 1 – Firebase (die Datenbank)

1. Öffne <https://console.firebase.google.com> und melde dich mit einem Google-Konto an.
2. **Projekt erstellen** → Name z. B. `stammtisch` → Google Analytics **ausschalten** → Projekt erstellen.
3. Links **Build → Authentication** → *Jetzt starten* → Reiter **Anmeldemethode** → **Anonym** → aktivieren → Speichern.
4. Links **Build → Firestore Database** → *Datenbank erstellen*
   - Standort: **europe-west3 (Frankfurt)**
   - **Produktionsmodus** wählen → Erstellen.
5. In Firestore oben den Reiter **Regeln** öffnen, alles löschen, den kompletten Inhalt der Datei
   `firestore.rules` einfügen → **Veröffentlichen**.
6. Reiter **Daten** → **Sammlung starten**
   - Sammlungs-ID: `secret`
   - Dokument-ID: `pin`
   - Feld `kassier`, Typ **string**, Wert: dein Kassier-PIN, nur für dich. Nimm **mindestens 8 Zeichen mit Buchstaben und Ziffern**
     (z. B. `Krone2027Kassa`), denn die Webadresse ist öffentlich und kurze Zahlen-PINs lassen sich durchprobieren.
   - Feld hinzufügen: `runde`, Typ **string**, Wert: der PIN für alle Mitglieder, ebenfalls mind. 8 Zeichen (z. B. `Stammtisch16er`)
   - Speichern.
   Die PINs kannst du hier jederzeit ändern. Schon freigeschaltete Geräte bleiben freigeschaltet.
7. Zahnrad oben links → **Projekteinstellungen** → ganz unten bei *Meine Apps* auf das Symbol **`</>`** (Web) →
   Name `Stammtisch` → *App registrieren* (Firebase Hosting **nicht** anhaken).
8. Es erscheint ein Code-Block mit `const firebaseConfig = { apiKey: "…", authDomain: "…", … }`.
   Öffne die Datei **`firebase-config.js`** mit einem Texteditor und übertrage die sechs Werte
   (apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId). Speichern.
   Diese Werte sind nicht geheim; geschützt werden die Daten durch die Regeln aus Schritt 5.

## Teil 2 – GitHub Pages (die Webseite)

1. Auf <https://github.com> ein kostenloses Konto anlegen (falls noch keins).
2. Oben rechts **+ → New repository** → Name `stammtisch` → **Public** → *Create repository*.
3. Auf der leeren Seite: **uploading an existing file** → alle Dateien aus diesem Ordner hineinziehen
   (auch die geänderte `firebase-config.js`) → unten **Commit changes**.
4. Im Repository **Settings → Pages** → *Source*: **Deploy from a branch** → Branch **main**, Ordner **/(root)** → Save.
5. Nach 1–2 Minuten ist die App erreichbar unter
   `https://DEIN-GITHUB-NAME.github.io/stammtisch/`

## Teil 3 – Aufs Handy und loslegen

1. Link am Handy öffnen.
   - **iPhone:** in Safari → *Teilen* → **Zum Home-Bildschirm**
   - **Android:** in Chrome → *Menü (⋮)* → **App installieren** (oder der Knopf „Installieren“ in der App)
2. App öffnen → **Kassier-PIN** eingeben → du bist Kassier.
3. Unter **Leute** die Mitglieder anlegen (mit Telefon für die WhatsApp-Erinnerung).
4. Link und **Runden-PIN** in die WhatsApp-Gruppe schicken. Jeder installiert die App, gibt den Runden-PIN ein
   und wählt einmal seinen Namen aus.

## Gut zu wissen

- **Neues Handy oder Browserdaten gelöscht:** einfach den PIN noch einmal eingeben und den Namen wählen.
- **Anderes Gerät als Kassier** (z. B. PC): dort ebenfalls den Kassier-PIN eingeben.
  Unter *Leute → Kassier* kannst du dich auf einem Gerät wieder abmelden.
- **Update der App:** geänderte Dateien wieder auf GitHub hochladen (gleiche Namen überschreiben).
  Die Handys holen sich die neue Version beim nächsten Öffnen.
- **Offline:** Die App startet auch ohne Netz und zeigt den letzten Stand. Änderungen werden nachgeschickt,
  sobald wieder Netz da ist.
- **Fotos und Belege** werden verkleinert in der Datenbank gespeichert. Der Gratis-Tarif (1 GB) reicht für
  weit über tausend Fotos.
- **Sicherung:** *Kasse → Export → Alles als Excel*, am besten einmal im Jahr.

## Dateien

| Datei | Zweck |
|---|---|
| `index.html` | die App |
| `firebase-config.js` | deine Firebase-Zugangsdaten (Teil 1, Schritt 8) |
| `firestore.rules` | Sicherheitsregeln zum Einfügen in Firebase (Teil 1, Schritt 5) |
| `manifest.webmanifest`, `sw.js`, `*.png` | Installation als App, Offline-Start, Icons |
