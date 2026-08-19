import type { ContentBlock } from "./types"

export const lidarContent: ContentBlock[] = [
  {
    type: "paragraph",
    text: "La salle Photogrammétrie et drones reconstruit un modèle 3D à partir de photos, un capteur passif qui ne voit que la première surface opaque. Le LiDAR (Light Detection And Ranging) résout cette limite différemment : un capteur actif, qui émet sa propre lumière et mesure directement une distance, capable de laisser une partie de son signal traverser un couvert végétal jusqu'au sol.",
  },
  {
    type: "link",
    to: "/module/photogrammetrie-drones",
    label: "Avant de commencer : SfM, MNS et MNT",
    description: "La salle Photogrammétrie et drones pose déjà la distinction MNS/MNT, réutilisée ici sur un principe de mesure différent.",
  },

  { type: "heading", text: "1. Le principe actif du LiDAR : mesurer une distance par le temps de vol d'un pulse laser", level: "lycee" },
  {
    type: "paragraph",
    text: "Un capteur LiDAR émet des impulsions laser à très haute fréquence (souvent plusieurs centaines de milliers par seconde) et mesure le temps que met chaque impulsion à revenir après réflexion sur une surface. Comme la vitesse de la lumière est connue avec une extrême précision, ce temps de vol (time of flight) se convertit directement en distance.",
  },
  {
    type: "formula",
    label: "Distance par temps de vol",
    formula: "d = (c × t) / 2",
    note: "c = vitesse de la lumière (≈3×10⁸ m/s), t = temps aller-retour mesuré. Division par 2 car le temps mesuré couvre le trajet aller ET retour de l'impulsion. Une précision de mesure de temps de l'ordre de la picoseconde est nécessaire pour une précision de distance centimétrique — la contrainte technique centrale d'un capteur LiDAR.",
  },

  { type: "heading", text: "2. Retours multiples : un pulse traverse la canopée", level: "lycee" },
  {
    type: "paragraph",
    text: "Une même impulsion laser peut heurter plusieurs surfaces successives avant d'être totalement absorbée ou de revenir au capteur : une feuille en haut de la canopée, une branche plus bas, puis le sol. Un capteur LiDAR moderne enregistre plusieurs de ces retours (premier retour, derniers retour, parfois la forme d'onde complète), pas seulement le premier écho comme le ferait un télémètre laser simple.",
  },
  {
    type: "table",
    headers: ["Retour", "Origine typique", "Usage"],
    rows: [
      ["Premier retour (first return)", "Sommet de la canopée, toiture", "Modèle Numérique de Surface (MNS)"],
      ["Derniers retours (last returns)", "Sol, sous couvert clairsemé", "Modèle Numérique de Terrain (MNT), après filtrage"],
      ["Retours intermédiaires", "Branches, sous-étage végétal", "Structure verticale de la végétation (analyse forestière)"],
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "\"Voir à travers\" la canopée ne veut pas dire voir le sol partout",
    text: "Un couvert forestier très dense (feuillage continu, sous-bois épais) peut ne laisser passer aucun pulse jusqu'au sol sur certaines zones, même en LiDAR. La densité de points au sol effective dépend directement de la densité de la végétation traversée, pas seulement de la densité d'émission du capteur : une carte de densité de points au sol doit être vérifiée avant de faire confiance à un MNT LiDAR sous canopée très fermée.",
  },

  { type: "heading", text: "3. Classification du nuage de points : sol, végétation, bâti", level: "superieur" },
  {
    type: "paragraph",
    text: "Le nuage de points brut d'un relevé LiDAR n'est pas classé par nature de surface à l'acquisition : un algorithme de classification (souvent fondé sur une analyse de voisinage local, proche dans son principe du filtre à noyau du module L'Intelligence, mais appliqué en 3D à un nuage plutôt qu'en 2D à une grille de pixels) étiquette ensuite chaque point comme sol, végétation basse/moyenne/haute, bâti, eau, ou bruit.",
  },
  {
    type: "callout",
    tone: "example",
    title: "Le filtrage sol, l'étape la plus critique de la chaîne",
    text: "L'algorithme le plus répandu pour isoler les points-sol (TIN densification progressive, Axelsson 2000) construit d'abord une surface grossière à partir des points les plus bas d'un voisinage, puis ajoute progressivement les points qui restent cohérents avec cette surface tout en rejetant ceux trop élevés (probablement végétation ou bâti). Un paramétrage trop strict laisse passer trop peu de points sol (MNT lacunaire) ; trop permissif, il intègre à tort des points de végétation basse au MNT (biais systématique vers le haut).",
  },

  { type: "heading", text: "4. MNT, MNS et modèle de hauteur de canopée (CHM)", level: "superieur" },
  {
    type: "paragraph",
    text: "Une fois le nuage de points classé, les mêmes produits dérivés que pour la photogrammétrie s'obtiennent, généralement avec une meilleure fidélité sous couvert végétal (le LiDAR ayant réellement mesuré des points au sol, pas seulement filtré une surface visible d'en haut) :",
  },
  {
    type: "formula",
    label: "Modèle de hauteur de canopée (rappel)",
    formula: "CHM = MNS − MNT",
    note: "Identique en principe au calcul de la salle Photogrammétrie et drones, mais généralement plus fiable en forêt dense avec des données LiDAR : le MNT y bénéficie de vrais points sol mesurés, pas d'une surface uniquement filtrée à partir de ce qui est visible d'en haut.",
  },

  { type: "heading", text: "5. Densité de points et résolution effective", level: "superieur" },
  {
    type: "paragraph",
    text: "La densité de points (points par m²) d'un relevé LiDAR dépend de l'altitude de vol, de la fréquence d'émission du capteur, et de la vitesse de déplacement de la plateforme. Une densité plus élevée permet de détecter des objets plus petits (un MNT à 20 points/m² capture des détails qu'un MNT à 1 point/m² ne peut pas résoudre), au prix d'un volume de données et d'un temps de vol nettement supérieurs.",
  },
  {
    type: "callout",
    tone: "info",
    title: "Densité annoncée vs densité réelle au sol",
    text: "La densité de points annoncée pour un relevé (ex. « 8 points/m² ») est presque toujours la densité globale du nuage brut, avant classification. La densité de points classés « sol » spécifiquement, la seule pertinente pour la qualité du MNT sous couvert dense, est systématiquement plus faible — un chiffre à vérifier séparément, pas à déduire de la densité globale annoncée.",
  },

  { type: "heading", text: "6. LiDAR aéroporté, terrestre mobile et satellite", level: "superieur" },
  {
    type: "table",
    headers: ["Plateforme", "Usage typique", "Précision/densité"],
    rows: [
      ["LiDAR aéroporté (avion, hélicoptère)", "Couverture régionale à départementale, MNT/forêt", "Quelques points/m² à quelques dizaines de points/m²"],
      ["LiDAR terrestre mobile (véhicule, sac à dos)", "Voirie, façades, patrimoine bâti, précision fine", "Plusieurs centaines à milliers de points/m²"],
      ["LiDAR satellite (ex. ICESat-2, GEDI)", "Couverture mondiale, échantillonnage épars, pas une couverture continue", "Profils étroits, quelques mètres de large, pas une grille continue"],
    ],
  },
  { type: "game" },

  { type: "heading", text: "7. LiDAR bathymétrique : voir sous l'eau", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Une variante du LiDAR utilise une longueur d'onde verte (plutôt que le proche infrarouge du LiDAR terrestre classique) qui pénètre l'eau claire sur plusieurs mètres à quelques dizaines de mètres de profondeur selon la turbidité, permettant de cartographier simultanément la topographie terrestre et la bathymétrie côtière depuis une même plateforme aéroportée — une application directement utile à la gestion du trait de côte et des zones littorales.",
  },

  { type: "heading", text: "8. Comparer LiDAR, radar et photogrammétrie", level: "approfondissement" },
  {
    type: "comparison",
    items: [
      { label: "LiDAR", points: ["Actif, laser (optique)", "Mesure directe de distance (temps de vol)", "Retours multiples, pénètre partiellement la canopée"] },
      { label: "Radar (InSAR, module Le Regard)", points: ["Actif, micro-ondes", "Mesure de phase, pas seulement de distance", "Traverse les nuages, pas la végétation dense"] },
      { label: "Photogrammétrie (SfM)", points: ["Passif, lumière solaire réfléchie", "Reconstruction géométrique indirecte", "Ne voit que la première surface opaque"] },
    ],
  },

  { type: "heading", text: "9. Applications : forêt, risques naturels, patrimoine", level: "superieur" },
  {
    type: "list",
    items: [
      "Inventaire forestier : hauteur de canopée, biomasse estimée, détection de coupes rases sur des séries temporelles de CHM",
      "Cartographie du risque d'inondation : un MNT LiDAR à haute résolution modélise l'écoulement de l'eau bien plus finement qu'un MNT satellite à résolution grossière",
      "Détection de mouvements de terrain : comparaison de deux MNT LiDAR à des dates différentes pour quantifier un glissement ou un affaissement",
      "Archéologie et patrimoine : le LiDAR aéroporté a révélé des structures archéologiques entières masquées sous une canopée forestière dense, invisibles sur toute image optique classique",
    ],
  },

  { type: "heading", text: "10. Limites et pièges du LiDAR", level: "approfondissement" },
  {
    type: "list",
    items: [
      "Coût et complexité logistique nettement supérieurs à la photogrammétrie de drone pour une même emprise",
      "Aucune information de texture/couleur native (un nuage de points LiDAR pur porte une intensité de retour, pas une couleur RVB, sauf fusion avec une caméra embarquée séparée)",
      "Sous canopée très dense, la densité de points sol réelle peut rester insuffisante malgré une densité globale annoncée élevée (section 5)",
      "Le LiDAR bathymétrique ne pénètre pas une eau turbide : sa portée en profondeur dépend fortement de la clarté de l'eau, très variable selon le site et la saison",
    ],
  },
  {
    type: "link",
    to: "/module/statistiques-spatiales",
    label: "Voir aussi : interpoler et valider une surface continue",
    description: "Une fois un MNT LiDAR ou photogrammétrique obtenu, le krigeage et les statistiques spatiales (module Les Statistiques) permettent d'en évaluer et d'en combler les lacunes rigoureusement.",
  },
]
