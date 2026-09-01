export const profile = {
  name: 'Noah Van Goethem',
  initials: 'NV',
  role: 'Developpeur full-stack et systemes',
  location: 'Anverse, Belgique',
  availability: 'Disponible pour des projets ambitieux',
  email: 'vgt.noah@gmail.com'
};

// Only public projects belong in this browser-delivered dataset.
export const projects = [
  {
    title: 'TechSuite', type: 'Ecosysteme / Roblox', year: '2026', status: 'Valide', color: 'mint', number: '01',
    tags: ['Luau', 'Architecture', 'Systems'],
    description: 'Un ecosysteme de technologie virtuelle: reseaux, OS, web, DNS et interfaces avec de vrais systemes derriere chaque experience.',
    details: '94 scripts canoniques, 16 036 lignes, 7 produits valides et un workflow Rojo de migration auditable.',
    role: 'Architecture systeme, runtime et outillage de release.',
    challenge: 'Faire fonctionner des objets technologiques virtuels comme un ecosysteme coherent plutot que comme de simples interfaces.',
    outcome: 'Une base modulaire avec reseau, desktop, web, internet et contrats de produits clairement separes.'
  },
  {
    title: 'DefSky', type: 'Produit / Showcase', year: '2026', status: 'En cours', color: 'blue', number: '02',
    tags: ['JavaScript', 'Node.js', 'Render'],
    description: 'La vitrine publique et le Developer Portal d une marque de technologie virtuelle construite autour de TechSuite.',
    details: 'Catalogue produit, pages editoriales, portail dynamique, docs, store et parcours de verification mock.',
    role: 'Conception produit, front-end, contenu et deploiement.',
    challenge: 'Rendre une architecture technique complexe lisible pour un visiteur qui ne connait pas encore l ecosysteme.',
    outcome: 'Une experience publique coherente avec showroom, catalogue, pages produit et portail developpeur.'
  },
  {
    title: 'NetTrack', type: 'Desktop / Monitoring', year: '2025', status: 'Produit', color: 'clay', number: '03',
    tags: ['C#', '.NET 8', 'WinUI 3'],
    description: 'Moniteur reseau natif Windows 11 avec capture ETW, historique SQLite et analyse par processus.',
    details: 'TCP/UDP temps reel, DNS inverse, LiveCharts2, detection Wi-Fi, tray et alertes Windows.',
    role: 'Architecture desktop, capture reseau, persistance et interface.',
    challenge: 'Transformer des evenements reseau bas niveau en informations utiles sans perdre le temps reel.',
    outcome: 'Un tableau de bord natif avec historique, analyse des applications et fonctionnement degrade sans droits admin.'
  },
  {
    title: 'SoundSphere', type: 'Desktop / Audio', year: '2025', status: 'Produit', color: 'violet', number: '04',
    tags: ['C#', 'WinUI 3', 'SQLite'],
    description: 'Lecteur audio local et prive pour Windows, avec recherche, bibliotheque intelligente et recommandations contextuelles.',
    details: 'Lecture Windows, controles multimedia, embeddings ONNX DirectML facultatifs et packaging x64/ARM64.',
    role: 'Produit complet, services audio, donnees locales et packaging.',
    challenge: 'Proposer une experience riche tout en gardant les medias, l historique et les chemins de fichiers locaux.',
    outcome: 'Une application Windows orientee vie privee avec indexation, recherche, lecture et recommandations deterministes.'
  },
  {
    title: 'Genealogie', type: 'Desktop / Data', year: '2025', status: 'Produit', color: 'mint', number: '05',
    tags: ['Electron', 'React', 'Excel'],
    description: 'Application Windows Fluent pour explorer, maintenir et distribuer un registre genealogique.',
    details: 'Electron, React, Vite, Fluent UI, ExcelJS, import CSV et mises a jour desktop.',
    role: 'Architecture Electron, interface Fluent et pipeline de donnees.',
    challenge: 'Faire evoluer un registre metier volumineux sans sacrifier la lisibilite ni les possibilites d export.',
    outcome: 'Un outil desktop installable avec import, navigation de donnees et mecanisme de distribution automatise.'
  },
  {
    title: 'ActionCam Control Pro', type: 'Desktop / Hardware', year: '2024', status: 'Prototype', color: 'blue', number: '06',
    tags: ['C#', 'Windows', 'GoPro'],
    description: 'Outils de controle et d integration pour cameras d action et flux media.',
    details: 'Suite Windows accompagnee de laboratoires web pour media, logs et protocoles camera.',
    role: 'Integration hardware, outillage Windows et exploration de protocoles.',
    challenge: 'Construire une couche de controle fiable autour d appareils et de flux media heterogenes.',
    outcome: 'Une base de travail desktop et plusieurs laboratoires pour tester controle, media et diagnostics.'
  },
  {
    title: 'Scrcpy Fluent GUI', type: 'Desktop / Tooling', year: '2025', status: 'Produit', color: 'clay', number: '07',
    tags: ['Electron', 'React', 'ADB'],
    description: 'Interface Windows Fluent pour piloter scrcpy et ADB sans memoriser la ligne de commande.',
    details: 'Renderer Vite, processus Electron, options scrcpy, packaging NSIS et architecture asInvoker.',
    role: 'Conception de l interface, orchestration Electron et packaging.',
    challenge: 'Rendre des options techniques nombreuses comprehensibles et previsibles pour une utilisation quotidienne.',
    outcome: 'Un outil Windows installable qui centralise les options scrcpy et ADB dans une interface claire.'
  },
  {
    title: 'DJI Mic MO', type: 'Tooling / Media', year: '2024', status: 'Prototype', color: 'violet', number: '08',
    tags: ['Python', 'HTML', 'Media'],
    description: 'Petit outil de controle et d exploration autour des workflows audio et video DJI.',
    details: 'Prototype Python accompagne d une interface web legere pour tester les flux media.',
    role: 'Prototypage rapide, scripts Python et interface de test.',
    challenge: 'Valider rapidement un workflow media avec peu de dependances et des retours observables.',
    outcome: 'Un prototype compact pour experimenter et documenter les flux audio et video.'
  }
];

export const filters = ['Tous', 'JavaScript', 'C#', 'React', 'Node.js', 'Luau', 'Electron', 'Python'];
