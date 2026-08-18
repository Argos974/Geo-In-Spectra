import type { ContentBlock } from "./types"

export const teledetectionContent: ContentBlock[] = [
  {
    type: "paragraph",
    text: "La télédétection consiste à observer et mesurer la surface terrestre à distance, sans contact physique, généralement depuis un satellite ou un avion. Le principe physique commun à tous les capteurs optiques : chaque matériau (végétation, eau, bâti, sol nu) réfléchit la lumière différemment selon la longueur d'onde. En mesurant cette réflectance sur plusieurs bandes du spectre, on peut identifier et quantifier ce qui recouvre le sol. Ce module va plus loin que la seule intuition physique : il pose les bases quantitatives (rayonnement, résolutions, orbites, corrections) qui permettent de comprendre pourquoi un capteur est construit d'une façon plutôt qu'une autre, et pourquoi une image brute n'est jamais directement exploitable.",
  },

  { type: "heading", text: "1. Le rayonnement électromagnétique" },
  {
    type: "paragraph",
    text: "Le Soleil émet un rayonnement qui couvre un large spectre de longueurs d'onde. Une partie atteint le sol, y est en partie absorbée et en partie réfléchie vers le capteur satellite. La proportion réfléchie, la réflectance, varie selon la longueur d'onde et selon la nature de la surface observée. C'est cette signature spectrale qui permet de distinguer une forêt d'un champ, d'un parking ou d'un plan d'eau.",
  },
  {
    type: "table",
    headers: ["Domaine", "Longueur d'onde", "Usage typique"],
    rows: [
      ["Visible (bleu, vert, rouge)", "~ 0.4 – 0.7 µm", "Composition couleur naturelle, distinction eau/sol/végétation"],
      ["Proche infrarouge (NIR)", "~ 0.7 – 1.3 µm", "Très réfléchi par la végétation en bonne santé ; cœur de la plupart des indices de végétation"],
      ["Infrarouge à ondes courtes (SWIR)", "~ 1.3 – 2.5 µm", "Sensible à l'humidité (végétation, sol) ; cœur des indices d'humidité et de stress hydrique"],
      ["Infrarouge thermique", "~ 8 – 14 µm", "Température de surface, détection de foyers actifs, îlots de chaleur urbains"],
    ],
  },
  {
    type: "diagram",
    name: "em-spectrum",
    caption: "Les quatre domaines du spectre utilisés en télédétection, du visible au thermique.",
  },
  {
    type: "callout",
    tone: "info",
    title: "Pourquoi la végétation est \"rouge\" en proche infrarouge",
    text: "La chlorophylle absorbe fortement le rouge visible (pour la photosynthèse) mais la structure interne des feuilles (les espaces intercellulaires du mésophylle spongieux) réfléchit très fortement le proche infrarouge. Ce contraste rouge/NIR est si marqué et si stable qu'il constitue la base de l'indice le plus utilisé en télédétection végétale : le NDVI (module suivant).",
  },
  {
    type: "diagram",
    name: "reflectance-curve",
    caption: "La courbe de réflectance d'une végétation en bonne santé : le creux dans le rouge, le sursaut dans le proche infrarouge.",
  },

  { type: "heading", text: "2. Rayonnement réfléchi et rayonnement émis : deux physiques différentes", level: "superieur" },
  {
    type: "paragraph",
    text: "Une confusion fréquente consiste à traiter toutes les bandes d'une image satellite de la même façon. Or le visible/NIR/SWIR et le thermique ne mesurent pas le même phénomène physique. Tout corps dont la température est supérieure au zéro absolu émet un rayonnement électromagnétique dont la répartition en longueur d'onde dépend uniquement de sa température (loi du corps noir de Planck). La loi de Wien donne la longueur d'onde du maximum d'émission :",
  },
  {
    type: "formula",
    label: "Loi de déplacement de Wien",
    formula: "λ_max = 2898 / T   (λ en µm, T en Kelvin)",
    note: "Le Soleil (~5778 K) émet un maximum vers 0.5 µm, dans le visible : c'est ce rayonnement, réfléchi par la surface terrestre, que mesurent les bandes visible/NIR/SWIR (télédétection dite \"réflective\", nécessite un éclairage solaire). La Terre elle-même, à ~288 K en moyenne, émet un maximum vers 10 µm : c'est ce que mesurent les bandes thermiques (télédétection dite \"émissive\", fonctionne aussi de nuit, puisqu'elle ne dépend pas de la lumière du Soleil).",
  },
  {
    type: "callout",
    tone: "info",
    title: "Conséquence pratique",
    text: "Une bande visible ou NIR est inutilisable de nuit (pas de rayonnement solaire à réfléchir). Une bande thermique, elle, mesure une température de surface aussi bien de jour que de nuit : c'est pourquoi les capteurs thermiques (Landsat TIRS, MODIS LST) sont la source privilégiée pour cartographier des îlots de chaleur urbains ou détecter un foyer d'incendie actif, y compris nocturne.",
  },

  { type: "heading", text: "3. Les fenêtres atmosphériques", level: "superieur" },
  {
    type: "paragraph",
    text: "Le rayonnement ne traverse pas l'atmosphère uniformément : la vapeur d'eau, le CO₂ et l'ozone absorbent fortement certaines longueurs d'onde précises (bandes d'absorption, notamment autour de 1.4 µm et 1.9 µm pour la vapeur d'eau, et vers 9.6 µm pour l'ozone). Les intervalles où l'atmosphère reste globalement transparente sont les fenêtres atmosphériques : c'est uniquement dans ces fenêtres que les concepteurs de capteurs placent les bandes spectrales, sous peine de mesurer surtout l'absorption de l'air plutôt que la réflectance du sol.",
  },
  {
    type: "callout",
    tone: "example",
    title: "Pourquoi le SWIR de Sentinel-2 est centré à 1.61 µm et non à 1.9 µm",
    text: "La bande B11 (SWIR) de Sentinel-2 est calée à 1.61 µm précisément parce que cette longueur d'onde tombe dans une fenêtre atmosphérique propre, entre deux bandes d'absorption de la vapeur d'eau. Un capteur mal positionné spectralement mesurerait surtout l'humidité de l'atmosphère traversée, pas celle de la végétation au sol : ce qui invaliderait un indice comme le NDMI.",
  },

  { type: "heading", text: "4. Capteurs optiques vs radar (SAR)" },
  {
    type: "comparison",
    items: [
      {
        label: "Optique (passif)",
        points: [
          "Mesure la lumière solaire réfléchie",
          "Nécessite un ciel dégagé (bloqué par les nuages)",
          "Résolution spectrale riche (plusieurs bandes fines)",
          "Ex. : Sentinel-2, Landsat, Pléiades",
        ],
      },
      {
        label: "Radar / SAR (actif)",
        points: [
          "Émet sa propre onde radar et mesure le signal retour (rétrodiffusion)",
          "Traverse les nuages, fonctionne de nuit",
          "Sensible à la structure/rugosité/teneur en eau de surface, pas à la couleur",
          "Ex. : Sentinel-1, TerraSAR-X, ALOS PALSAR",
        ],
      },
    ],
  },
  {
    type: "paragraph",
    text: "Un capteur SAR (Synthetic Aperture Radar) mesure la puissance du signal micro-onde qu'il a lui-même émis et qui lui revient après réflexion sur le sol : le coefficient de rétrodiffusion (σ°, en décibels). Cette rétrodiffusion dépend de trois facteurs indépendants de tout éclairage : la rugosité de surface à l'échelle de la longueur d'onde radar, la constante diélectrique (fortement liée à la teneur en eau), et la géométrie de la cible (un bâtiment produit un effet de réflexion en coin très caractéristique, très brillant sur l'image).",
  },
  {
    type: "table",
    headers: ["Bande radar", "Longueur d'onde", "Propriété"],
    rows: [
      ["Bande X", "~ 2.5 – 3.75 cm", "Très sensible à la texture fine ; usage militaire, urbain haute résolution"],
      ["Bande C", "~ 3.75 – 7.5 cm", "Compromis pénétration/sensibilité ; standard de Sentinel-1"],
      ["Bande L", "~ 15 – 30 cm", "Pénètre la canopée forestière et le sol sec ; ALOS PALSAR, NISAR (2024)"],
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "L'interférométrie radar (InSAR)",
    text: "En comparant la phase du signal radar entre deux passages successifs du même satellite au-dessus du même point, on peut mesurer des déplacements du sol de l'ordre du millimètre : affaissement minier, glissement de terrain, subsidence urbaine, déformation co-sismique. C'est une capacité qu'aucun capteur optique ne possède, puisqu'elle repose sur la phase de l'onde radar, une information que l'optique ne mesure pas.",
  },

  { type: "heading", text: "5. Orbites et géométrie d'acquisition", level: "superieur" },
  {
    type: "comparison",
    items: [
      {
        label: "Orbite héliosynchrone (polaire, basse altitude)",
        points: [
          "Altitude ~700–800 km, passage au-dessus d'un même lieu toujours à la même heure solaire locale",
          "Couvre progressivement toute la planète au fil des orbites successives",
          "Cas de la quasi-totalité des satellites d'observation : Sentinel-2, Landsat, SPOT, Pléiades",
        ],
      },
      {
        label: "Orbite géostationnaire",
        points: [
          "Altitude ~36 000 km, reste fixe au-dessus d'un même point de l'équateur",
          "Observe en continu la même moitié de la Terre, avec une résolution spatiale grossière (km)",
          "Cas des satellites météorologiques : Météosat (Europe), GOES (États-Unis)",
        ],
      },
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Angle d'observation et effets BRDF",
    text: "La réflectance mesurée d'une même surface varie selon l'angle d'éclairage solaire et l'angle de visée du capteur, un effet décrit par la fonction de distribution de réflectance bidirectionnelle (BRDF). Deux images d'un même champ, prises à des heures ou des saisons différentes, ne sont donc jamais strictement comparables sans en tenir compte : c'est une des raisons pour lesquelles les grands producteurs de données (Copernicus, USGS) livrent des composites normalisés BRDF pour les analyses de longues séries temporelles.",
  },

  { type: "heading", text: "6. Les quatre résolutions d'une image satellite" },
  {
    type: "list",
    items: [
      "Résolution spatiale : taille au sol d'un pixel (ex. Sentinel-2 : 10 m en visible/NIR, 20 m sur certaines bandes SWIR)",
      "Résolution spectrale : nombre et finesse des bandes mesurées (Sentinel-2 : 13 bandes, du visible au SWIR)",
      "Résolution temporelle : fréquence de revisite du même endroit (Sentinel-2 : ~5 jours avec les deux satellites jumeaux)",
      "Résolution radiométrique : nombre de niveaux d'intensité codés par pixel (Sentinel-2 : quantification 12 bits, soit 4096 niveaux par bande)",
    ],
  },
  {
    type: "formula",
    label: "Résolution radiométrique : le nombre de niveaux codables",
    formula: "Nombre de niveaux = 2^(nombre de bits)",
    note: "8 bits → 256 niveaux (image classique) ; 10 bits → 1024 niveaux ; 12 bits → 4096 niveaux (Sentinel-2) ; 16 bits → 65 536 niveaux. Plus la résolution radiométrique est élevée, plus le capteur distingue de nuances fines de réflectance, un enjeu direct pour la sensibilité d'un indice comme le NDVI dans les valeurs intermédiaires.",
  },
  {
    type: "callout",
    tone: "warning",
    title: "Un compromis, jamais gratuit",
    text: "Aucun satellite ne maximise les quatre résolutions à la fois : c'est un compromis physique et budgétaire, imposé par la conservation de l'énergie du signal. Un capteur très haute résolution spatiale (ex. Pléiades, 0.5 m) capte moins de photons par pixel : il doit soit élargir ses bandes spectrales (moins de résolution spectrale), soit réduire sa fauchée (moins de résolution temporelle) pour conserver un rapport signal/bruit exploitable. Un capteur à revisite quotidienne (ex. MODIS) a en retour une résolution spatiale grossière (250 m à 1 km). Le choix du capteur dépend toujours de l'échelle du phénomène étudié.",
  },
  { type: "game" },

  { type: "heading", text: "7. Architecture d'un capteur : push-broom vs whisk-broom", level: "approfondissement" },
  {
    type: "comparison",
    items: [
      {
        label: "Push-broom (barrette)",
        points: [
          "Une ligne fixe de détecteurs, perpendiculaire à la trajectoire",
          "Chaque ligne au sol est imagée d'un coup, le déplacement du satellite balaie les lignes suivantes",
          "Pas de pièce mobile : plus fiable, plus léger, meilleur rapport signal/bruit",
          "Cas de Sentinel-2, SPOT, Pléiades",
        ],
      },
      {
        label: "Whisk-broom (miroir oscillant)",
        points: [
          "Un miroir mobile balaie chaque ligne perpendiculairement à la trajectoire, détecteur par détecteur",
          "Mécanique plus complexe, historiquement plus simple à fabriquer avec peu de détecteurs",
          "Cas de Landsat TM/ETM+ et de MODIS",
        ],
      },
    ],
  },

  { type: "heading", text: "8. Les principales plateformes accessibles gratuitement" },
  {
    type: "table",
    headers: ["Mission", "Opérateur", "Résolution", "Revisite", "Accès"],
    rows: [
      ["Sentinel-2", "ESA / Copernicus", "10–20 m", "~5 jours (2 satellites)", "Copernicus Data Space Ecosystem (gratuit)"],
      ["Sentinel-1 (radar)", "ESA / Copernicus", "5–20 m", "~6 jours", "Copernicus Data Space Ecosystem (gratuit)"],
      ["Landsat 8/9", "USGS/NASA", "15–30 m (pan 15 m)", "~16 jours (8 jours combiné)", "USGS EarthExplorer (gratuit)"],
      ["MODIS (Terra/Aqua)", "NASA", "250 m – 1 km", "quotidien", "NASA EarthData (gratuit)"],
      ["Copernicus DEM / SRTM", "ESA / NASA", "30 m (GLO-30) / ~30 m", "acquisition unique (relief statique)", "Copernicus / USGS (gratuit)"],
      ["Pléiades / Pléiades Neo", "Airbus (commercial)", "0.3–0.5 m", "quotidien (tasking)", "Payant"],
    ],
  },
  {
    type: "callout",
    tone: "example",
    title: "Lien avec le module Indices spectraux",
    text: "Sentinel-2 est la référence utilisée dans quasiment tous les cas pratiques de ce cours : gratuite, résolution spatiale suffisante pour du travail à l'échelle d'une parcelle ou d'un massif, et dotée des bandes rouge/NIR/SWIR nécessaires au calcul du NDVI, NDMI et NDBI présentés dans le module suivant.",
  },
  {
    type: "marginnote",
    title: "Anecdote : Landsat 1 ne s'est jamais appelé Landsat 1",
    text: "Lancé le 23 juillet 1972, le tout premier satellite civil d'observation de la Terre s'appelait ERTS-1 (Earth Resources Technology Satellite). La NASA le rebaptise \"Landsat 1\" en 1975, seulement après le lancement d'ERTS-2, pour donner à toute la future famille de satellites un nom de programme cohérent. Le nom d'origine ne survit aujourd'hui que dans les archives scientifiques les plus anciennes.",
  },

  { type: "heading", text: "9. La photo-interprétation", level: "lycee" },
  {
    type: "paragraph",
    text: "Avant tout calcul d'indice, la première compétence en télédétection reste la lecture directe de l'image à l'œil, une compétence qui reste précieuse aujourd'hui pour vérifier un résultat automatique, et directement utile en épreuve de commentaire de document. Six clés de lecture classiques, héritées de la photo-interprétation aérienne militaire et civile du XXᵉ siècle :",
  },
  {
    type: "list",
    items: [
      "La forme : un rectangle très régulier évoque un bâtiment ou une serre, une ligne sinueuse un cours d'eau ou une route",
      "La texture : lisse pour un plan d'eau ou un toit, grenue pour une forêt vue en résolution fine",
      "La teinte / le ton : la coloration en composition naturelle (rouge/vert/bleu) ou fausse couleur (souvent NIR/rouge/vert, qui fait ressortir la végétation en rouge vif)",
      "L'ombre portée : trahit la hauteur d'un objet (bâtiment, arbre) que l'image seule, vue du dessus, ne montre pas directement",
      "Le motif (pattern) : une répétition régulière (rangées d'arbres d'un verger, trame d'un lotissement) signale une organisation humaine ou agricole",
      "L'association / le contexte : un bâtiment isolé au milieu de parcelles agricoles se lit différemment du même bâtiment en plein tissu urbain",
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "Composition naturelle vs fausse couleur",
    text: "Une composition \"fausse couleur\" affiche le proche infrarouge à la place du rouge visible : la végétation, très réfléchissante en NIR, apparaît alors en rouge vif plutôt qu'en vert. Ce n'est pas une erreur de calibration : c'est un choix délibéré, hérité des premiers films infrarouges aériens des années 1940, qui rend la végétation immédiatement identifiable à l'œil, sans calculer le moindre indice.",
  },

  { type: "heading", text: "10. De la valeur brute (DN) à la réflectance physique", level: "superieur" },
  {
    type: "paragraph",
    text: "La valeur d'un pixel telle qu'enregistrée par le capteur (Digital Number, DN) n'est pas directement une réflectance : c'est une mesure brute de luminance, propre au capteur et à ses réglages. Il faut la convertir en une grandeur physique standardisée avant de pouvoir comparer deux images entre elles, ou de calculer un indice dont le sens physique est garanti.",
  },
  {
    type: "formula",
    label: "Radiance au capteur puis réflectance au sommet de l'atmosphère (TOA)",
    formula: "L = DN × gain + offset  puis  ρ_TOA = (π × L × d²) / (ESUN × cos θs)",
    note: "L = luminance mesurée, ESUN = éclairement solaire exo-atmosphérique dans la bande, d = distance Terre-Soleil en unités astronomiques, θs = angle zénithal solaire. Cette formule ramène toute image, quel que soit le capteur, l'heure et la saison, à une réflectance comparable, comprise entre 0 et 1.",
  },

  { type: "heading", text: "11. Prétraiter une image avant de l'utiliser", level: "superieur" },
  {
    type: "paragraph",
    text: "Une image satellite brute (niveau L1C pour Sentinel-2) n'est pas directement comparable à une autre image, ni même exploitable pour un indice fiable, sans un minimum de correction :",
  },
  {
    type: "list",
    items: [
      "Correction radiométrique : compense les différences de sensibilité entre capteurs et dans le temps, via la formule DN → réflectance TOA ci-dessus",
      "Correction atmosphérique : retire l'effet de la vapeur d'eau, des aérosols et des nuages fins sur la réflectance mesurée, pour obtenir une réflectance de surface (BOA, bottom-of-atmosphere) : c'est ce qui distingue le niveau L2A du L1C pour Sentinel-2",
      "Correction géométrique (orthorectification) : recale précisément l'image sur un système de coordonnées en tenant compte du relief, pour qu'elle se superpose exactement à d'autres couches sans décalage lié au terrain",
      "Mosaïquage : assemble plusieurs scènes adjacentes en une seule image continue, en harmonisant leurs teintes aux raccords",
    ],
  },
  {
    type: "table",
    headers: ["Méthode de rééchantillonnage", "Principe", "Effet sur les valeurs"],
    rows: [
      ["Plus proche voisin (nearest neighbor)", "Reprend telle quelle la valeur du pixel source le plus proche", "Aucune valeur inventée : seule méthode correcte pour une donnée catégorielle (classification, masque)"],
      ["Bilinéaire", "Moyenne pondérée des 4 pixels sources les plus proches", "Lisse légèrement l'image ; correct pour une donnée continue (réflectance) mais fausse une classification"],
      ["Cubique (convolution cubique)", "Moyenne pondérée sur 16 pixels sources (4×4), avec des poids négatifs possibles", "Rendu visuel plus net que le bilinéaire, au prix d'un léger risque de dépassement (overshoot) hors de la plage de valeurs d'origine"],
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Ne jamais rééchantillonner une classification en bilinéaire",
    text: "Le géoréférencement/reprojection (correction géométrique ci-dessus) nécessite de rééchantillonner la grille de pixels sur de nouvelles coordonnées. Appliquer une interpolation bilinéaire ou cubique à une carte de classes (ex. 1 = forêt, 2 = eau, 3 = bâti) produit des valeurs intermédiaires absurdes (1.5 ne veut rien dire). Le plus proche voisin est la seule méthode qui préserve le sens d'une donnée catégorielle.",
  },
  {
    type: "comparison",
    items: [
      {
        label: "Dark Object Subtraction (DOS)",
        points: [
          "Méthode empirique simple (Chavez, 1988)",
          "Suppose qu'au moins un pixel de la scène (eau profonde, ombre) devrait avoir une réflectance nulle",
          "Soustrait à toute la bande la valeur minimale observée, jugée due à la diffusion atmosphérique",
          "Rapide, mais approximative : ne modélise pas la physique de l'atmosphère",
        ],
      },
      {
        label: "Modèle de transfert radiatif (6S, Sen2Cor)",
        points: [
          "Modélise explicitement la diffusion et l'absorption atmosphérique (Vermote et al., 1997, modèle 6S)",
          "Utilise des données auxiliaires : vapeur d'eau, aérosols, ozone, pression",
          "Sen2Cor est le processeur officiel ESA qui produit le niveau L2A de Sentinel-2 à partir du L1C",
          "Plus précis, physiquement fondé, mais plus coûteux en calcul",
        ],
      },
    ],
  },
  {
    type: "callout",
    tone: "warning",
    title: "Toujours vérifier le masque de nuages",
    text: "Le niveau L2A de Sentinel-2 fournit une bande SCL (Scene Classification Layer) qui classe chaque pixel : végétation, sol nu, eau, nuage, ombre de nuage, neige... Calculer un indice sans exclure les pixels nuageux ou leurs ombres produit des valeurs aberrantes, parfois indétectables à l'œil sur une seule bande mais visibles comme un bruit incohérent sur une série temporelle.",
  },

  { type: "heading", text: "12. Au-delà du multispectral : l'imagerie hyperspectrale", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Un capteur multispectral comme Sentinel-2 mesure une dizaine de bandes larges (quelques dizaines à une centaine de nanomètres chacune). Un capteur hyperspectral (ex. PRISMA de l'agence spatiale italienne, EnMAP allemand, ou l'instrument aéroporté AVIRIS de la NASA) mesure plusieurs centaines de bandes contiguës, chacune large de quelques nanomètres seulement, une courbe de réflectance quasi continue par pixel plutôt qu'un échantillonnage épars.",
  },
  {
    type: "list",
    items: [
      "Cette résolution spectrale fine permet de détecter des signatures d'absorption précises (minéraux, espèces végétales, polluants) invisibles à un capteur multispectral, qui les moyenne sur une bande trop large",
      "Le volume de données explose (plusieurs centaines de bandes par pixel) : le traitement mobilise des méthodes de réduction de dimension (ACP, voir module Les Couleurs) avant toute classification",
      "Le continuum removal (retrait du continuum) normalise chaque bande d'absorption par rapport à une ligne de base spectrale locale, pour comparer la profondeur d'une bande d'absorption indépendamment de l'albédo global du pixel",
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "Le mélange spectral, un problème que l'hyperspectral rend justement traitable",
    text: "Un pixel de 20-30 m (résolution typique des capteurs hyperspectraux actuels) contient presque toujours plusieurs matériaux mélangés. Le démélange spectral (spectral unmixing) exploite la richesse des centaines de bandes pour estimer la proportion de chaque matériau \"pur\" (endmember) dans un pixel, un problème mal posé avec seulement une dizaine de bandes multispectrales, mais abordable avec un vrai spectre hyperspectral.",
  },

  { type: "heading", text: "13. La physique complète : équation de transfert radiatif et polarimétrie SAR", level: "approfondissement" },
  {
    type: "paragraph",
    text: "La formule DN → réflectance TOA de la section 10 est une approximation calibrée ; la grandeur physique réellement mesurée par le capteur obéit à l'équation de transfert radiatif (ETR), qui décrit tout ce que subit le rayonnement entre le Soleil et le capteur.",
  },
  {
    type: "formula",
    label: "Équation de transfert radiatif simplifiée (cas optique)",
    formula: "L_capteur = L_surface · T_atm + L_path",
    note: "L_surface = radiance réellement issue de la surface (ce qu'on veut mesurer), T_atm = transmittance de l'atmosphère (fraction du signal qui la traverse sans être diffusée ni absorbée), L_path = radiance de trajet (\"path radiance\", la lumière diffusée par l'atmosphère elle-même qui atteint le capteur sans jamais avoir touché le sol : c'est ce terme, non nul même au-dessus d'une surface parfaitement noire, qui justifie la Dark Object Subtraction de la section précédente). Un modèle comme 6S (Vermote et al., 1997) résout cette équation en modélisant T_atm et L_path à partir de la composition atmosphérique réelle, plutôt que de l'estimer empiriquement comme le fait la DOS.",
  },
  {
    type: "paragraph",
    text: "Côté radar, la rétrodiffusion (σ°, module Le Regard section 4) dépend du mécanisme physique de diffusion, que la polarimétrie SAR permet de distinguer en combinant plusieurs polarisations d'émission/réception (HH, VV, HV, VH) :",
  },
  {
    type: "list",
    items: [
      "Diffusion de surface (Bragg) : dominante sur une surface lisse à l'échelle de la longueur d'onde radar (eau calme, sol nu lisse) ; signal fort en co-polarisation (HH ou VV), faible en polarisation croisée",
      "Diffusion de volume : dominante dans un milieu structuré en trois dimensions (canopée forestière, culture dense) ; dépolarise fortement le signal, augmentant la polarisation croisée (HV/VH)",
      "Double rebond (double-bounce) : réflexion en coin, typique d'une surface verticale au-dessus d'une surface horizontale (façade de bâtiment + sol, tronc + sol inondé en forêt) ; signature très caractéristique en HH",
    ],
  },
  {
    type: "callout",
    tone: "example",
    title: "La décomposition de Freeman-Durden",
    text: "La décomposition de Freeman-Durden (1998) exploite précisément ces trois mécanismes pour recomposer, à partir des polarisations mesurées, la contribution relative de la diffusion de surface, de volume et du double rebond dans chaque pixel, une méthode qui permet, par exemple, de distinguer une forêt inondée (double rebond tronc/eau, signature radar unique) d'une forêt sur sol sec (diffusion de volume dominante), invisible en optique sous la canopée.",
  },

  { type: "heading", text: "14. Température de brillance : de la radiance thermique à la température", level: "approfondissement" },
  {
    type: "paragraph",
    text: "La bande thermique (module précédent, section \"rayonnement réfléchi et émis\") mesure une radiance, pas directement une température : il faut inverser la loi de Planck pour retrouver la température de brillance du pixel.",
  },
  {
    type: "formula",
    label: "Température de brillance (inversion simplifiée de Planck)",
    formula: "T_b = K2 / ln(K1/L_capteur + 1)",
    note: "K1 et K2 sont des constantes de calibration propres à chaque capteur thermique (ex. Landsat TIRS bandes 10/11), fournies dans les métadonnées de chaque scène. T_b est une température de brillance, pas la température de surface réelle : elle suppose un corps noir parfait (émissivité = 1). La température de surface réelle (Land Surface Temperature, LST) nécessite une correction d'émissivité supplémentaire, propre à chaque type de surface (l'eau et la végétation dense ont une émissivité proche de 1 ; le métal ou le sable sec, nettement plus faible).",
  },
  {
    type: "link",
    to: "/module/indices-spectraux",
    label: "Continuer : du rouge et du NIR au NDVI",
    description: "Le module Les Couleurs combine les bandes présentées ici (rouge, NIR, SWIR) en indices interprétables : NDVI, NDMI, NDBI et au-delà.",
  },
]
