# Portfolio personnel

Portfolio public, responsive et sans dependance de build. La page est rendue depuis les donnees de `assets/js/data.js`, ce qui permet d'ajouter ou filtrer des projets sans dupliquer le HTML.

## Structure

```text
portfolio/
|-- index.html
|-- static.json
|-- README.md
`-- assets/
    |-- css/style.css
    `-- js/
        |-- app.js
        `-- data.js
```

## Personnalisation rapide

1. Remplacer `Votre Nom`, `VN`, l'email et les liens sociaux dans `index.html`.
2. Modifier les projets et leurs tags dans `assets/js/data.js`.
3. Ajouter le CV dans `assets/files/cv.pdf`.
4. Ouvrir `index.html` avec un serveur local pour tester les modules JavaScript.

## Inventaire integre

La selection actuelle reprend les projets publics identifies dans les espaces de travail:

- TechSuite et DefSky: ecosysteme Roblox, vitrine produit et portail developpeur.
- NetTrack, SoundSphere, Genealogie, ActionCam Control Pro et Scrcpy Fluent GUI: applications desktop Windows.
- Shmira RoIP, Chabad Tracking, Chabad Kiosk et CJT Platform: backend, outils operationnels et data web.
- RoN QG, ReadyOrNot Bot et Discord Logging Suite: produits communautaires et automatisation Discord.
- DJI Mic MO et Core-04 Ops: tooling media et infrastructure Linux.

Les donnees sensibles ne sont pas copiees dans le site: secrets, bases locales, tokens, identifiants techniques prives et URLs d infrastructure internes restent exclus.
