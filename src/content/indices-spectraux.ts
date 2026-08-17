import type { ContentBlock } from "./types"

export const indicesSpectrauxContent: ContentBlock[] = [
  {
    type: "paragraph",
    text: "Un indice spectral est une combinaison mathématique simple entre plusieurs bandes d'une image satellite, conçue pour faire ressortir un phénomène précis (végétation, humidité, bâti…) tout en atténuant les effets parasites (éclairage, ombre, type de sol). Le principe commun : opposer une bande où le phénomène réfléchit fortement à une bande où il réfléchit faiblement, puis normaliser le résultat entre -1 et 1. Chaque indice présenté ici a été publié dans une revue scientifique à un moment précis ; connaître son origine aide à comprendre ce qu'il mesure réellement, et surtout ses limites d'usage.",
  },

  { type: "heading", text: "1. NDVI : Normalized Difference Vegetation Index" },
  {
    type: "formula",
    label: "Formule du NDVI",
    formula: "NDVI = (NIR − Rouge) / (NIR + Rouge)",
    note: "NIR = réflectance proche infrarouge, Rouge = réflectance dans le rouge visible. Résultat toujours compris entre -1 et 1.",
  },
  {
    type: "paragraph",
    text: "C'est l'indice le plus utilisé en télédétection. Il exploite le contraste déjà présenté au module précédent : la végétation en bonne santé réfléchit fortement le proche infrarouge et absorbe le rouge (photosynthèse), ce qui donne un NDVI élevé. Un sol nu, une surface bâtie ou de l'eau donnent un NDVI faible, voire négatif. Formulé par Rouse et al. (1974) pour le suivi de la végétation des Grandes Plaines américaines depuis les données ERTS-1 (le futur Landsat 1), puis popularisé par les travaux de Tucker (1979) sur la relation entre NDVI et biomasse foliaire, c'est aujourd'hui l'indice de référence de la quasi-totalité des produits opérationnels de suivi de la végétation (MODIS NDVI, Copernicus Global Land Service).",
  },
  {
    type: "table",
    headers: ["Valeur NDVI", "Interprétation typique"],
    rows: [
      ["< 0", "Eau, neige, nuages"],
      ["0 – 0.2", "Sol nu, roche, zone bâtie/minérale"],
      ["0.2 – 0.4", "Végétation clairsemée ou stressée"],
      ["0.4 – 0.8", "Végétation dense et vigoureuse"],
    ],
  },
  {
    type: "diagram",
    name: "ndvi-scale",
    caption: "L'échelle du NDVI et ses classes de lecture, de l'eau à la végétation dense.",
  },
  {
    type: "callout",
    tone: "warning",
    title: "Limite importante : la saturation",
    text: "Au-delà d'une certaine densité de canopée (Indice de Surface Foliaire, LAI > ~3), le NDVI sature ; il n'augmente plus alors que la biomasse continue de croître, car le signal du sol sous-jacent devient négligeable et la réponse en NIR plafonne. Pour ces cas, on utilise des indices dérivés comme le SAVI ou l'EVI (section 4), qui corrigent partiellement cet effet.",
  },
  {
    type: "formula",
    label: "Sentinel-2 : quelles bandes pour le NIR et le Rouge ?",
    formula: "Rouge = B4 (665 nm, 10 m)   ·   NIR = B8 (842 nm, 10 m)",
    note: "Il existe aussi une bande B8A (865 nm, 20 m), plus étroite spectralement, parfois préférée pour des applications scientifiques exigeant une meilleure séparation avec les bandes d'absorption atmosphérique voisines — mais B8 reste le choix standard pour le NDVI en 10 m natif.",
  },

  { type: "heading", text: "2. NDMI : Normalized Difference Moisture Index" },
  {
    type: "formula",
    label: "Formule du NDMI",
    formula: "NDMI = (NIR − SWIR) / (NIR + SWIR)",
    note: "SWIR = réflectance infrarouge à ondes courtes (~1.6 µm sur Sentinel-2, bande B11).",
  },
  {
    type: "paragraph",
    text: "L'eau contenue dans les tissus végétaux absorbe fortement le SWIR (une conséquence directe des bandes d'absorption de l'eau liquide vers 1.4–1.9 µm, voir module précédent). Une végétation bien hydratée a donc un NDMI élevé ; une végétation en stress hydrique (sécheresse, précurseur de risque incendie) voit son NDMI chuter avant même que le changement soit visible à l'œil nu ou détectable par le NDVI seul — le NDVI mesure la vigueur chlorophyllienne, le NDMI mesure directement la teneur en eau des tissus, deux grandeurs biophysiques distinctes qui décrochent l'une de l'autre précisément au moment le plus intéressant pour la surveillance du risque. C'est un indicateur précoce très utilisé pour le suivi de sécheresse et l'évaluation de l'inflammabilité de la végétation (Gao, 1996, qui l'introduit sous le nom de NDWI pour la végétation — à ne pas confondre avec le NDWI de surface en eau de la section 4).",
  },

  { type: "heading", text: "3. NDBI : Normalized Difference Built-up Index" },
  {
    type: "formula",
    label: "Formule du NDBI",
    formula: "NDBI = (SWIR − NIR) / (SWIR + NIR)",
    note: "Symétrique du NDMI : les surfaces bâties réfléchissent davantage le SWIR que le NIR, contrairement à la végétation.",
  },
  {
    type: "paragraph",
    text: "Publié par Zha, Gao et Ni (2003) pour cartographier automatiquement l'étalement urbain de Nanjing (Chine) depuis Landsat TM, le NDBI est utilisé pour cartographier l'étalement urbain, détecter les surfaces imperméabilisées, ou, combiné au NDVI, distinguer une zone bâtie d'un sol nu (les deux ont un NDVI faible, mais un NDBI les différencie nettement, car un matériau minéral construit — béton, tuile, bitume — réfléchit bien davantage le SWIR qu'un sol nu naturel).",
  },

  { type: "heading", text: "4. Les indices corrigés de la végétation : SAVI, MSAVI2 et EVI", level: "superieur" },
  {
    type: "paragraph",
    text: "Le NDVI a deux défauts documentés depuis les années 1980 : sa sensibilité au sol nu visible à travers un couvert clairsemé (le sol a sa propre réflectance, qui \"pollue\" le signal de végétation), et sa saturation en forte biomasse (section 1). Plusieurs indices ont été conçus spécifiquement pour corriger l'un ou l'autre défaut.",
  },
  {
    type: "formula",
    label: "SAVI (Huete, 1988) — correction de l'effet du sol",
    formula: "SAVI = (NIR − Rouge) / (NIR + Rouge + L) × (1 + L)",
    note: "L est une constante de correction de la ligne de sol (\"soil brightness correction factor\"), généralement fixée à 0.5, valeur empirique adaptée à une densité de végétation intermédiaire. L = 0 ramène le SAVI au NDVI ; L = 1 correspond à une très faible densité de végétation.",
  },
  {
    type: "formula",
    label: "MSAVI2 (Qi et al., 1994) — SAVI sans paramètre à régler",
    formula: "MSAVI2 = (2·NIR + 1 − √((2·NIR + 1)² − 8·(NIR − Rouge))) / 2",
    note: "Version \"auto-ajustée\" du SAVI : L n'est plus un paramètre fixe choisi par l'utilisateur, mais recalculé pixel par pixel à partir de l'image elle-même — utile quand on ne connaît pas a priori la densité de végétation de la zone étudiée.",
  },
  {
    type: "formula",
    label: "EVI (Liu & Huete, 1995 ; Huete et al., 2002) — correction atmosphérique et de saturation",
    formula: "EVI = G × (NIR − Rouge) / (NIR + C1·Rouge − C2·Bleu + L)",
    note: "Coefficients standards (produit MODIS) : G = 2.5, C1 = 6, C2 = 7.5, L = 1. L'ajout de la bande bleue corrige les résidus d'aérosols atmosphériques que le NDVI seul ne compense pas, et la formule reste linéaire à plus haute biomasse : c'est l'indice de référence du produit opérationnel MODIS MOD13, utilisé notamment pour le suivi de la forêt amazonienne, où le NDVI sature presque en permanence.",
  },
  {
    type: "callout",
    tone: "info",
    title: "Lequel choisir ?",
    text: "Le NDVI reste le standard par défaut (simple, comparable à des décennies d'archives). Le SAVI/MSAVI2 est préférable sur sol peu couvert (semis, zones arides, débuts de saison culturale). L'EVI est préférable sur forêt dense ou canopée fermée, là où le NDVI plafonne. Changer d'indice au milieu d'une série temporelle sans le documenter est une erreur méthodologique fréquente : les valeurs ne sont pas directement comparables d'un indice à l'autre.",
  },

  { type: "heading", text: "5. Autres indices courants" },
  {
    type: "table",
    headers: ["Indice", "Formule", "Usage"],
    rows: [
      ["NDWI", "(Vert − NIR) / (Vert + NIR)", "Détection de surfaces en eau libre (McFeeters, 1996)"],
      ["SAVI", "(NIR−Rouge)/(NIR+Rouge+L) × (1+L)", "NDVI corrigé de l'effet du sol nu (L ≈ 0.5)"],
      ["BAI", "1 / ((0.1−Rouge)² + (0.06−NIR)²)", "Détection de zones brûlées (Burned Area Index, Martín, 1998)"],
      ["NBR", "(NIR − SWIR2) / (NIR + SWIR2)", "Sévérité de brûlis (Key & Benson, 2006) ; ΔNBR = NBR avant − NBR après feu"],
      ["GNDVI", "(NIR − Vert) / (NIR + Vert)", "Variante plus sensible à la concentration en chlorophylle (Gitelson et al., 1996)"],
      ["MNDWI", "(Vert − SWIR) / (Vert + SWIR)", "Eau en contexte urbain (Xu, 2006), moins sensible au bruit du bâti que le NDWI classique"],
    ],
  },
  {
    type: "callout",
    tone: "example",
    title: "ΔNBR : cartographier la sévérité d'un incendie après coup",
    text: "Le NBR utilise la bande SWIR2 (~2.2 µm, B12 sur Sentinel-2), car la végétation brûlée et les cendres ont une réflectance NIR effondrée et une réflectance SWIR fortement augmentée par rapport à une végétation saine. Comparer le NBR juste avant et juste après un feu (ΔNBR = NBR_préfeu − NBR_postfeu) est la méthode standard des services forestiers (US Forest Service, séquelle d'usage international) pour classer la sévérité d'un incendie en plusieurs catégories, de la repousse rapide à la mortalité totale du peuplement.",
  },

  { type: "heading", text: "6. Signatures spectrales comparées", level: "superieur" },
  {
    type: "paragraph",
    text: "Chaque type de surface (végétation, eau, sol nu, bâti) a une signature spectrale caractéristique — sa réflectance selon la longueur d'onde. Superposer ces signatures explique d'un coup pourquoi le NDVI, le NDMI et le NDBI choisissent chacun des paires de bandes différentes : ils exploitent l'endroit du spectre où deux types de surface se distinguent le plus nettement.",
  },
  {
    type: "diagram",
    name: "spectral-signatures",
    caption: "Végétation, eau, sol nu et bâti n'ont pas la même courbe de réflectance : c'est ce qui rend chaque indice possible.",
  },
  {
    type: "callout",
    tone: "info",
    title: "Lire le graphe",
    text: "L'eau absorbe presque tout le rayonnement au-delà du visible, d'où sa réflectance qui chute continûment. La végétation présente le sursaut caractéristique en proche infrarouge (voir module Télédétection). Sol nu et bâti ont des courbes plus plates et proches l'une de l'autre dans le visible/NIR, ce qui explique pourquoi il faut aller chercher le SWIR (NDBI) pour les séparer.",
  },

  { type: "heading", text: "7. Indices radar : au-delà de l'optique", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Un capteur SAR ne mesure pas une réflectance mais un coefficient de rétrodiffusion (σ°, en dB) — les indices \"spectraux\" au sens strict n'existent donc pas en radar, mais des indicateurs équivalents jouent le même rôle : ratios entre polarisations, ou différences temporelles.",
  },
  {
    type: "list",
    items: [
      "Ratio de polarisation VH/VV (Sentinel-1) : une chute marquée signale souvent une surface en eau libre ou une inondation, la surface calme se comportant comme un miroir radar (réflexion spéculaire, peu de retour vers le capteur)",
      "RVI (Radar Vegetation Index) : combine les polarisations pour approcher une information de structure/densité de végétation, sans dépendre du tout de l'éclairage solaire ni de la couverture nuageuse",
      "Détection de changement radar par différence temporelle : très utilisée pour la cartographie rapide de zones inondées, un cas où l'optique est justement inutilisable (ciel couvert au moment de la crue)",
    ],
  },

  { type: "heading", text: "8. Limites communes à tous les indices spectraux" },
  {
    type: "list",
    items: [
      "Effets atmosphériques : nuages, brume, aérosols faussent la réflectance mesurée si l'image n'est pas correctement corrigée (niveau L2A pour Sentinel-2)",
      "Résolution spatiale : un pixel de 10 m peut mélanger plusieurs types de couverture (effet de mélange spectral, mixed pixel)",
      "Angle de prise de vue et ombres portées : un même objet peut avoir une réflectance différente selon l'heure et la saison de l'acquisition (effets BRDF, voir module précédent)",
      "Saturation : voir NDVI ci-dessus, un phénomène général à haute densité de signal",
      "Absence de vérité terrain : un indice élevé ou faible reste une mesure indirecte — sans relevé de terrain de contrôle, son interprétation reste une hypothèse, pas un fait établi",
    ],
  },
  {
    type: "callout",
    tone: "example",
    title: "Exemple d'application concrète",
    text: "Un projet de cartographie du risque incendie de forêt peut croiser NDMI (stress hydrique de la végétation), NDVI (densité de combustible), pente et exposition au vent pour produire un indice composite de comportement du feu. C'est exactement ce type de croisement multi-indices qui est mis en pratique dans le module Travaux pratiques, et détaillé en profondeur dans le module L'Intelligence.",
  },
]
