# Portfolio personnel

Portfolio public, responsive et sans dependance de build. La page est rendue depuis les donnees de `assets/js/data.js`, ce qui permet d'ajouter ou filtrer des projets sans dupliquer le HTML.

## Structure

```text
portfolio/
├── index.html
├── static.json
├── README.md
└── assets/
    ├── css/style.css
    └── js/
        ├── app.js
        └── data.js
```

## Personnalisation rapide

1. Remplacer `Votre Nom`, `VN`, l'email et les liens sociaux dans `index.html`.
2. Modifier les projets et leurs tags dans `assets/js/data.js`.
3. Ajouter le CV dans `assets/files/cv.pdf`.
4. Ouvrir `index.html` avec un serveur local pour tester les modules JavaScript.
