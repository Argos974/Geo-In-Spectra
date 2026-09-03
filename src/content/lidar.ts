import type { ContentBlock } from "./types"

export const lidarContent: ContentBlock[] = [
  {
    type: "paragraph",
    text: "La salle Photogrammétrie et drones reconstruit un modèle 3D à partir de photos, un capteur passif qui ne voit que la première surface opaque. Le LiDAR (Light Detection And Ranging) résout cette limite différemment : un capteur actif, qui émet sa propre lumière et mesure directement une distance, capable de laisser une partie de son signal traverser un couvert végétal jusqu'au sol. Trois pistes complètes ci-dessous (choisis la tienne dans le filtre « Afficher ») : chacune se lit seule, du début à la fin.",
  },
  {
    type: "link",
    to: "/module/photogrammetrie-drones",
    label: "Avant de commencer : SfM, MNS et MNT",
    description: "La salle Photogrammétrie et drones pose déjà la distinction MNS/MNT, réutilisée ici sur un principe de mesure différent.",
  },

  // ================================================================
  // PISTE LYCÉE
  // ================================================================
  { type: "heading", text: "1. Le principe actif du LiDAR : mesurer une distance par le temps de vol d'un pulse laser", level: "lycee" },
  {
    type: "paragraph",
    text: "Un capteur LiDAR émet des impulsions laser à très haute fréquence (souvent plusieurs centaines de milliers par seconde) et mesure le temps que met chaque impulsion à revenir après réflexion sur une surface. Comme la vitesse de la lumière est connue avec une extrême précision, ce temps de vol (time of flight) se convertit directement en distance.",
  },
  {
    type: "formula",
    label: "Distance par temps de vol",
    formula: "d = (c × t) / 2",
    note: "c = vitesse de la lumière (≈3×10⁸ m/s), t = temps aller-retour mesuré. Division par 2 car le temps mesuré couvre le trajet aller ET retour de l'impulsion.",
  },
  {
    type: "callout",
    tone: "example",
    title: "Convertir un temps mesuré en distance",
    text: "Pour une cible au sol à 100 m sous l'avion, le trajet aller-retour du pulse mesure 200 m ; à la vitesse de la lumière, cela correspond à un temps de vol d'environ 667 nanosecondes. L'électronique du capteur doit résoudre ce temps avec une incertitude de quelques dizaines de picosecondes seulement pour livrer une distance fiable au centimètre près.",
  },

  { type: "heading", text: "2. Retours multiples : un pulse traverse la canopée", level: "lycee" },
  {
    type: "paragraph",
    text: "Une même impulsion laser peut heurter plusieurs surfaces successives avant d'être totalement absorbée ou de revenir au capteur : une feuille en haut de la canopée, une branche plus bas, puis le sol. Un capteur LiDAR moderne enregistre plusieurs de ces retours, pas seulement le premier écho comme le ferait un télémètre laser simple.",
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
    type: "diagram",
    name: "lidar-returns",
    caption: "Un même pulse laser touche la cime, une branche, puis le sol : trois retours distincts d'une seule impulsion.",
  },
  {
    type: "callout",
    tone: "warning",
    title: "« Voir à travers » la canopée ne veut pas dire voir le sol partout",
    text: "Un couvert forestier très dense (feuillage continu, sous-bois épais) peut ne laisser passer aucun pulse jusqu'au sol sur certaines zones, même en LiDAR. La densité de points au sol effective dépend directement de la densité de la végétation traversée, pas seulement de la densité d'émission du capteur.",
  },

  { type: "heading", text: "3. Le programme Lidar HD : la France vue d'en haut, point par point", level: "lycee" },
  {
    type: "paragraph",
    text: "L'IGN a engagé au début des années 2020 le programme Lidar HD, un relevé LiDAR aéroporté visant à couvrir l'intégralité du territoire métropolitain avec une densité de points nettement supérieure aux relevés antérieurs, en données ouvertes et gratuites.",
  },
  {
    type: "callout",
    tone: "example",
    title: "Un ordre de grandeur pour un programme national",
    text: "Lidar HD vise une densité d'environ 10 points par m² sur l'ensemble du territoire métropolitain, diffusée en accès libre sur la plateforme de l'IGN. À cette échelle, l'acquisition d'un seul département représente déjà plusieurs dizaines de milliards de points bruts, ce qui explique un déploiement étalé sur plusieurs années plutôt qu'une campagne unique.",
  },
  { type: "heading", text: "4. Trier le nuage de points : sol, végétation, bâti", level: "lycee" },
  {
    type: "paragraph",
    text: "Un relevé LiDAR brut n'est au départ qu'un immense nuage de points X, Y, Z, sans étiquette : rien ne dit encore si un point donné appartient au sol, à un arbre ou à un toit. Un algorithme de classification trie ensuite chaque point dans une catégorie, un peu comme trier un tas de billes mélangées par couleur avant de pouvoir compter combien il y en a de chaque sorte.",
  },
  {
    type: "callout",
    tone: "example",
    title: "Deux surfaces, une différence",
    text: "Une fois les points triés, on peut construire deux surfaces distinctes : le Modèle Numérique de Surface (MNS), l'altitude de tout ce qui est visible d'en haut (toits, cimes d'arbres, sol), et le Modèle Numérique de Terrain (MNT), l'altitude du sol nu seul, obtenu en ne gardant que les points classés « sol ». La différence entre les deux, point par point, donne directement la hauteur de ce qui dépasse du sol : un arbre de 15 m de haut, un bâtiment de 8 m.",
  },

  { type: "heading", text: "5. Plus de points, plus de détails : la densité", level: "lycee" },
  {
    type: "paragraph",
    text: "La densité d'un relevé LiDAR (le nombre de points par m²) dépend de l'altitude de vol et de la vitesse à laquelle le capteur émet ses impulsions. Plus la densité est élevée, plus de petits objets deviennent détectables (un muret bas, un piquet), mais aussi plus le volume de données et le temps de vol augmentent : jamais un réglage gratuit.",
  },

  { type: "heading", text: "6. Le LiDAR au sol : une autre échelle de précision", level: "lycee" },
  {
    type: "paragraph",
    text: "Le LiDAR ne s'utilise pas que depuis un avion : posé sur un trépied ou embarqué sur un véhicule, un scanner LiDAR terrestre relève un monument, une façade ou une rue avec une précision bien plus fine (souvent millimétrique), au prix d'une couverture beaucoup plus locale qu'un survol aérien.",
  },

  { type: "heading", text: "7. Des usages très concrets, du feu de forêt aux ruines cachées", level: "lycee" },
  {
    type: "list",
    items: [
      "Forêt : mesurer la hauteur des arbres et estimer un volume de bois sans y aller à pied, sur des massifs entiers",
      "Risques naturels : un MNT LiDAR précis modélise beaucoup mieux l'écoulement de l'eau lors d'une inondation qu'un modèle grossier",
      "Patrimoine et archéologie : le LiDAR aéroporté a révélé des cités entières, des routes et des structures agricoles cachées sous une canopée forestière dense (par exemple au Cambodge, autour d'Angkor), invisibles sur n'importe quelle photo aérienne classique puisque les arbres masquent tout depuis le ciel",
    ],
  },
  {
    type: "list",
    items: [
      "Bilan — à retenir : le LiDAR mesure une distance par temps de vol d'un pulse laser (d = c×t/2) ; un même pulse peut produire plusieurs retours, dont le dernier atteint souvent le sol sous une canopée pas trop dense ; un algorithme trie ensuite chaque point en sol/végétation/bâti, ce qui permet de construire un MNS et un MNT distincts ; une densité de points plus élevée révèle plus de détails, au prix d'un volume de données et d'un temps de vol accrus ; Lidar HD (IGN) numérise la France entière en données ouvertes, environ 10 points/m² ; le LiDAR terrestre relève un monument au millimètre, sur une zone plus restreinte qu'un survol aérien.",
    ],
  },
  {
    type: "link",
    to: "/module/statistiques-spatiales",
    label: "Voir aussi : interpoler et valider une surface continue",
    description: "Une fois un MNT LiDAR obtenu, le krigeage et les statistiques spatiales permettent d'en évaluer et d'en combler les lacunes rigoureusement.",
  },

  // ================================================================
  // PISTE LICENCE / BUT
  // ================================================================
  { type: "heading", text: "1. Le principe actif du LiDAR : temps de vol et retours multiples", level: "superieur" },
  {
    type: "paragraph",
    text: "Un capteur LiDAR (Light Detection And Ranging) émet des impulsions laser à très haute fréquence (souvent plusieurs centaines de milliers par seconde) et mesure le temps que met chaque impulsion à revenir après réflexion sur une surface. Comme la vitesse de la lumière est connue avec une extrême précision, ce temps de vol (time of flight) se convertit directement en distance.",
  },
  {
    type: "formula",
    label: "Distance par temps de vol",
    formula: "d = (c × t) / 2",
    note: "c = vitesse de la lumière (≈3×10⁸ m/s), t = temps aller-retour mesuré. Division par 2 car le temps mesuré couvre le trajet aller ET retour de l'impulsion. Une précision de mesure de temps de l'ordre de la dizaine de picosecondes est nécessaire pour une précision de distance centimétrique.",
  },
  {
    type: "paragraph",
    text: "Une même impulsion laser peut heurter plusieurs surfaces successives avant d'être totalement absorbée ou de revenir au capteur : une feuille en haut de la canopée, une branche plus bas, puis le sol. Un capteur LiDAR moderne enregistre plusieurs de ces retours (premier retour, derniers retour, parfois la forme d'onde complète), pas seulement le premier écho comme le ferait un télémètre laser simple — c'est cette capacité à enregistrer plusieurs retours par pulse qui distingue le LiDAR d'un simple télémètre, et qui permet, sous réserve d'un couvert pas trop dense, de mesurer à la fois la canopée et le sol en un seul passage.",
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
    type: "diagram",
    name: "lidar-returns",
    caption: "Un même pulse laser touche la cime, une branche, puis le sol : trois retours distincts d'une seule impulsion.",
  },

  { type: "heading", text: "2. Retours discrets ou forme d'onde complète : deux façons d'enregistrer le signal", level: "superieur" },
  {
    type: "paragraph",
    text: "Détecter et enregistrer un « retour » n'est pas anodin techniquement : deux stratégies coexistent selon le capteur, avec des conséquences directes sur la richesse de l'information de structure verticale disponible après acquisition.",
  },
  {
    type: "comparison",
    items: [
      {
        label: "LiDAR discret (discrete return)",
        points: [
          "Le capteur détecte en temps réel les pics d'énergie du signal retour et n'enregistre que leur position (et souvent leur intensité)",
          "Typiquement jusqu'à 4 à 6 retours détectés par pulse",
          "Volume de données maîtrisé, traitement standard immédiat",
          "Mode de la grande majorité des capteurs aéroportés commerciaux, y compris le programme Lidar HD",
        ],
      },
      {
        label: "LiDAR à forme d'onde complète (full waveform)",
        points: [
          "Enregistre l'intégralité de la courbe d'énergie retournée au cours du temps, sans se limiter à des pics détectés en vol",
          "Le traitement post-acquisition (décomposition en gaussiennes) peut extraire davantage de retours qu'une détection embarquée en temps réel",
          "Caractérise plus finement une structure verticale continue (sous-étage forestier stratifié)",
          "Volume de données et temps de traitement nettement supérieurs, usage surtout scientifique/recherche",
        ],
      },
    ],
  },

  { type: "heading", text: "3. Classification du nuage de points : sol, végétation, bâti", level: "superieur" },
  {
    type: "paragraph",
    text: "Le nuage de points brut d'un relevé LiDAR n'est pas classé par nature de surface à l'acquisition : un algorithme de classification (souvent fondé sur une analyse de voisinage local, proche dans son principe du filtre à noyau du module L'Intelligence, mais appliqué en 3D à un nuage plutôt qu'en 2D à une grille de pixels) étiquette ensuite chaque point comme sol, végétation basse/moyenne/haute, bâti, eau, ou bruit.",
  },
  {
    type: "callout",
    tone: "rappel",
    title: "Rappel : le nuage de points, déjà rencontré en photogrammétrie (module Photogrammétrie et drones)",
    text: "Le module Photogrammétrie et drones produit déjà un nuage de points 3D par SfM (un nuage épars mis en correspondance, densifié ensuite par Multi-View Stereo) : la même structure de données qu'un relevé LiDAR, mais obtenue par triangulation photographique plutôt que par mesure directe de distance. C'est ce même objet — un ensemble de points X, Y, Z sans classification a priori — que l'algorithme ci-dessous doit trier ici en sol, végétation ou bâti.",
  },
  {
    type: "callout",
    tone: "example",
    title: "Le filtrage sol, l'étape la plus critique de la chaîne",
    text: "L'algorithme le plus répandu pour isoler les points-sol (TIN densification progressive, Axelsson 2000) construit d'abord une surface grossière à partir des points les plus bas d'un voisinage, puis ajoute progressivement les points qui restent cohérents avec cette surface tout en rejetant ceux trop élevés (probablement végétation ou bâti). Un paramétrage trop strict laisse passer trop peu de points sol (MNT lacunaire) ; trop permissif, il intègre à tort des points de végétation basse au MNT (biais systématique vers le haut).",
  },

  { type: "heading", text: "4. Le format LAS/LAZ et les attributs portés par chaque point", level: "superieur" },
  {
    type: "paragraph",
    text: "Un nuage de points LiDAR se diffuse presque toujours au format standard LAS (défini par l'ASPRS, American Society for Photogrammetry and Remote Sensing), ou son équivalent compressé LAZ. Chaque point du nuage n'est pas qu'une coordonnée X, Y, Z : il porte plusieurs attributs qui permettent de le retraiter, le filtrer ou le reclasser sans revenir à l'acquisition brute.",
  },
  {
    type: "list",
    items: [
      "Coordonnées X, Y, Z : la position 3D du point dans le système de référence choisi",
      "Intensité : l'énergie du retour reçu, révélatrice de la nature de la surface (le bitume, la végétation et l'eau ont des réponses d'intensité différentes)",
      "Numéro de retour / nombre total de retours : la position de ce point dans la séquence de retours d'un même pulse (ex. « 2ᵉ retour sur 3 »)",
      "Temps GPS : l'horodatage précis de l'acquisition, indispensable pour recaler le nuage sur la trajectoire réelle de la plateforme",
      "Angle de balayage (scan angle) : l'écart angulaire par rapport au nadir au moment de l'émission, utile pour pondérer la précision selon la géométrie de visée",
      "Classe : le code de classification attribué au point (voir tableau ci-dessous)",
      "Couleur RVB (optionnelle) : ajoutée seulement si le nuage LiDAR est fusionné avec une caméra embarquée simultanée",
    ],
  },
  {
    type: "table",
    headers: ["Code ASPRS", "Classe", "Contenu typique"],
    rows: [
      ["1", "Non classé", "Points non encore attribués à une classe"],
      ["2", "Sol", "Points-sol retenus par l'algorithme de filtrage (base du MNT)"],
      ["3 / 4 / 5", "Végétation basse / moyenne / haute", "Sous-étage, arbustes, cime de la canopée"],
      ["6", "Bâti", "Toitures et structures identifiées comme bâtiment"],
      ["7", "Bruit (basse altitude)", "Points aberrants à rejeter, souvent des artefacts de mesure"],
      ["9", "Eau", "Surfaces d'eau détectées, généralement peu de retours (absorption du proche infrarouge)"],
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "LAZ n'est pas un format « allégé » en qualité",
    text: "LAZ est une compression sans perte du LAS, au même principe qu'un fichier .zip : un LAZ correctement décompressé restitue exactement les mêmes coordonnées et attributs que le LAS d'origine, au bit près. La confusion inverse — croire qu'un fichier .laz sacrifie de la précision pour réduire son poids — reste une erreur fréquente ; le gain est uniquement un poids de fichier divisé par 4 à 10, jamais une perte d'information.",
  },

  { type: "heading", text: "5. MNT, MNS et modèle de hauteur de canopée (CHM)", level: "superieur" },
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
  {
    type: "callout",
    tone: "example",
    title: "Calculer une hauteur de canopée en un point",
    text: "Sur une placette forestière, le MNS (points classés végétation haute) indique une altitude de 32,4 m au sommet de la cime la plus proche ; le MNT interpolé au même point, à partir des points-sol environnants, donne 18,1 m. La hauteur de canopée locale est donc CHM = 32,4 − 18,1 = 14,3 m, une valeur directement comparable à une mesure de terrain au dendromètre, sans avoir eu besoin d'accéder physiquement au sous-bois.",
  },

  { type: "heading", text: "6. Densité de points et résolution effective", level: "superieur" },
  {
    type: "paragraph",
    text: "La densité de points (points par m²) d'un relevé LiDAR dépend de l'altitude de vol, de la fréquence d'émission du capteur, et de la vitesse de déplacement de la plateforme. Une densité plus élevée permet de détecter des objets plus petits (un MNT à 20 points/m² capture des détails qu'un MNT à 1 point/m² ne peut pas résoudre), au prix d'un volume de données et d'un temps de vol nettement supérieurs.",
  },
  {
    type: "callout",
    tone: "example",
    title: "De la fréquence d'émission à la densité au sol",
    text: "Un capteur émettant 200 000 pulses par seconde (200 kHz), embarqué sur un avion volant à environ 70 m/s (≈ 250 km/h) et balayant une fauchée au sol de 400 m de large, dépose en moyenne 200 000 / (70 × 400) ≈ 7 points par m² avant classification — un ordre de grandeur réaliste pour un relevé LiDAR aéroporté grand public. Doubler la densité visée revient, à altitude et fauchée constantes, à réduire d'autant la vitesse de vol ou à doubler la fréquence d'émission : jamais un réglage gratuit, toujours un compromis avec le temps de vol total.",
  },
  {
    type: "callout",
    tone: "info",
    title: "Densité annoncée vs densité réelle au sol",
    text: "La densité de points annoncée pour un relevé (ex. « 8 points/m² ») est presque toujours la densité globale du nuage brut, avant classification. La densité de points classés « sol » spécifiquement, la seule pertinente pour la qualité du MNT sous couvert dense, est systématiquement plus faible — un chiffre à vérifier séparément, pas à déduire de la densité globale annoncée.",
  },

  { type: "heading", text: "7. LiDAR aéroporté, terrestre mobile et satellite", level: "superieur" },
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

  { type: "heading", text: "8. LiDAR terrestre et mobile : des cas d'usage à part entière", level: "superieur" },
  {
    type: "paragraph",
    text: "Le LiDAR terrestre se scinde lui-même en deux familles d'usage assez différentes de l'aéroporté : le scanner terrestre statique (Terrestrial Laser Scanning, TLS), posé sur trépied et immobile pendant l'acquisition, produit la densité de points la plus élevée possible mais couvre une seule station à la fois ; le système mobile embarqué (Mobile Mapping System, MMS), monté sur un véhicule, un chariot ou un sac à dos, balaie en continu le long d'un trajet, au prix d'une précision légèrement inférieure au TLS statique mais d'une couverture linéaire bien plus rapide.",
  },
  {
    type: "list",
    items: [
      "Relevé de voirie et de réseaux : géométrie exacte de chaussée, mobilier urbain, réseaux aériens, pour l'entretien ou la conception de projets d'aménagement",
      "Numérisation du patrimoine bâti : relevé intérieur/extérieur d'un monument à quelques millimètres de précision, base d'une maquette BIM « scan-to-BIM »",
      "Surveillance d'ouvrages d'art : comparaison de scans répétés d'un pont ou d'un barrage dans le temps pour détecter une déformation structurelle infime",
      "Perception embarquée de véhicules autonomes : un usage LiDAR temps réel, différent du relevé topographique, où le nuage sert à la navigation immédiate plutôt qu'à produire un document cartographique",
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
  {
    type: "list",
    items: [
      "Bilan — à retenir : d = c×t/2 convertit un temps de vol en distance, à la dizaine de picosecondes près pour une précision centimétrique ; discret (quelques pics, temps réel) vs forme d'onde complète (courbe entière, post-traitement) ; un algorithme de classification (ex. TIN progressif) sépare sol/végétation/bâti, jamais donné à l'acquisition ; LAS/LAZ portent X,Y,Z + intensité + numéro de retour + classe, LAZ compresse sans perte ; CHM = MNS − MNT, plus fiable en LiDAR qu'en photogrammétrie sous canopée ; la densité annoncée (globale) diffère de la densité de points sol réellement utile.",
    ],
  },
  {
    type: "link",
    to: "/module/statistiques-spatiales",
    label: "Voir aussi : interpoler et valider une surface continue",
    description: "Une fois un MNT LiDAR obtenu, le krigeage et les statistiques spatiales (module Les Statistiques) permettent d'en évaluer et d'en combler les lacunes rigoureusement.",
  },

  // ================================================================
  // PISTE MASTER / RECHERCHE
  // ================================================================
  { type: "heading", text: "1. Le programme Lidar HD : la France numérisée en haute densité", level: "approfondissement" },
  {
    type: "paragraph",
    text: "L'IGN a engagé au début des années 2020 le programme Lidar HD, un relevé LiDAR aéroporté visant à couvrir l'intégralité du territoire métropolitain avec une densité de points nettement supérieure aux relevés antérieurs, en données ouvertes.",
  },
  {
    type: "callout",
    tone: "example",
    title: "Un ordre de grandeur pour un programme national",
    text: "Lidar HD vise une densité d'environ 10 points par m² sur l'ensemble du territoire métropolitain, un nuage de points classé (sol, végétation, bâti) diffusé en dalles LAZ, ainsi que des MNT et MNS dérivés à 1 m de résolution, en accès libre sur la plateforme de l'IGN. À cette échelle, l'acquisition d'un seul département représente déjà plusieurs dizaines de milliards de points bruts, ce qui explique un déploiement étalé sur plusieurs années plutôt qu'une campagne unique.",
  },

  {
    type: "diagram",
    name: "lidar-returns",
    caption: "Un capteur en mode discret ne garde que les pics détectés en vol ; un capteur full waveform enregistre la courbe d'énergie complète, décomposée après coup — potentiellement plus de structure verticale extraite du même signal physique.",
  },

  { type: "heading", text: "2. LiDAR bathymétrique : voir sous l'eau", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Une variante du LiDAR utilise une longueur d'onde verte (plutôt que le proche infrarouge du LiDAR terrestre classique) qui pénètre l'eau claire sur plusieurs mètres à quelques dizaines de mètres de profondeur selon la turbidité, permettant de cartographier simultanément la topographie terrestre et la bathymétrie côtière depuis une même plateforme aéroportée — une application directement utile à la gestion du trait de côte et des zones littorales.",
  },
  {
    type: "callout",
    tone: "info",
    title: "Deux échos pour un seul pulse",
    text: "Un pulse LiDAR bathymétrique génère typiquement deux retours distincts pour un même point : un premier sur la surface de l'eau elle-même, un second sur le fond une fois la lumière verte réfractée dans l'eau puis réfléchie sur le sédiment. La profondeur se déduit du décalage temporel entre ces deux retours, corrigé de l'indice de réfraction de l'eau (environ 1,33), qui ralentit la lumière par rapport à sa vitesse dans l'air.",
  },

  { type: "heading", text: "3. Le LiDAR satellite : GEDI et ICESat-2", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Contrairement au LiDAR aéroporté (couverture continue sur une emprise donnée), un LiDAR embarqué sur satellite échantillonne le globe le long de traces étroites et espacées, sans jamais produire une grille continue comme un MNT classique. GEDI (Global Ecosystem Dynamics Investigation, NASA, installé sur la Station spatiale internationale depuis 2018) est optimisé pour la structure verticale de la végétation ; ICESat-2 (NASA, lancé en 2018) est optimisé pour l'altimétrie de précision (glace polaire, niveau des eaux continentales).",
  },
  {
    type: "callout",
    tone: "example",
    title: "Un échantillonnage épars, pas une carte complète",
    text: "GEDI ne couvre que la bande de latitudes entre 51,6° N et 51,6° S (l'inclinaison orbitale de l'ISS), sous forme d'empreintes au sol de 25 m de diamètre espacées le long de traces parallèles, jamais une couverture continue comme Lidar HD. Pour produire une carte de biomasse forestière continue à l'échelle d'un pays, on combine typiquement ces mesures ponctuelles mais très précises avec une image satellite optique ou radar continue (Sentinel-2, Sentinel-1), en calibrant la seconde sur la première plutôt que d'utiliser GEDI seul.",
  },

  { type: "heading", text: "4. Comparer LiDAR, radar et photogrammétrie", level: "approfondissement" },
  {
    type: "comparison",
    items: [
      { label: "LiDAR", points: ["Actif, laser (optique)", "Mesure directe de distance (temps de vol)", "Retours multiples, pénètre partiellement la canopée"] },
      { label: "Radar (InSAR, module Le Regard)", points: ["Actif, micro-ondes", "Mesure de phase, pas seulement de distance", "Traverse les nuages, pas la végétation dense"] },
      { label: "Photogrammétrie (SfM)", points: ["Passif, lumière solaire réfléchie", "Reconstruction géométrique indirecte", "Ne voit que la première surface opaque"] },
    ],
  },

  { type: "heading", text: "5. Limites et pièges du LiDAR", level: "approfondissement" },
  {
    type: "list",
    items: [
      "Coût et complexité logistique nettement supérieurs à la photogrammétrie de drone pour une même emprise",
      "Aucune information de texture/couleur native (un nuage de points LiDAR pur porte une intensité de retour, pas une couleur RVB, sauf fusion avec une caméra embarquée séparée)",
      "Sous canopée très dense, la densité de points sol réelle peut rester insuffisante malgré une densité globale annoncée élevée",
      "Le LiDAR bathymétrique ne pénètre pas une eau turbide : sa portée en profondeur dépend fortement de la clarté de l'eau, très variable selon le site et la saison",
      "Un capteur en mode full waveform ne produit pas automatiquement « plus de points » qu'un capteur en mode discret : il produit un signal plus riche à décomposer, ce qui exige un traitement spécifique en aval, pas seulement un export brut",
    ],
  },
  {
    type: "callout",
    tone: "question",
    title: "À toi de voir",
    text: "Un projet doit cartographier le trait de côte ET la bathymétrie proche d'une plage à eau turbide, avec un seul survol. En te basant sur cette section, quelles limites du LiDAR bathymétrique risquent de compromettre cet objectif, et quelle information faudrait-il collecter avant le vol pour évaluer la faisabilité ?",
  },
  {
    type: "list",
    items: [
      "Bilan — à retenir : Lidar HD numérise la France entière à ~10 points/m² en données ouvertes ; une longueur d'onde verte pénètre l'eau claire pour la bathymétrie (deux retours, surface puis fond), mais pas l'eau turbide ; GEDI/ICESat-2 échantillonnent le globe par traces étroites et espacées, jamais une grille continue, et se combinent avec une image satellite continue pour cartographier une biomasse à l'échelle d'un pays ; LiDAR (distance directe), radar (phase), photogrammétrie (reconstruction indirecte) répondent à des contraintes différentes ; coût, absence de texture native et limite sous canopée très dense restent les pièges principaux du LiDAR.",
    ],
  },
  {
    type: "link",
    to: "/module/statistiques-spatiales",
    label: "Voir aussi : interpoler et valider une surface continue",
    description: "Une fois un MNT LiDAR obtenu, le krigeage et les statistiques spatiales permettent d'en évaluer et d'en combler les lacunes rigoureusement.",
  },
]
