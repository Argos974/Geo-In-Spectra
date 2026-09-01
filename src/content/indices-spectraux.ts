import type { ContentBlock } from "./types"

export const indicesSpectrauxContent: ContentBlock[] = [
  {
    type: "paragraph",
    text: "Un indice spectral est une combinaison mathématique simple entre plusieurs bandes d'une image satellite, conçue pour faire ressortir un phénomène précis (végétation, humidité, bâti…) tout en atténuant les effets parasites (éclairage, ombre, type de sol). Le principe commun : opposer une bande où le phénomène réfléchit fortement à une bande où il réfléchit faiblement, puis normaliser le résultat entre -1 et 1. Trois pistes complètes ci-dessous (choisis la tienne dans le filtre « Afficher ») : chacune se lit seule, du début à la fin.",
  },

  // ================================================================
  // PISTE LYCÉE
  // ================================================================
  { type: "heading", text: "1. NDVI : l'indice de végétation de référence", level: "lycee" },
  {
    type: "formula",
    label: "Formule du NDVI",
    formula: "NDVI = (NIR − Rouge) / (NIR + Rouge)",
    note: "NIR = réflectance proche infrarouge, Rouge = réflectance dans le rouge visible. Résultat toujours compris entre -1 et 1.",
  },
  {
    type: "paragraph",
    text: "C'est l'indice le plus utilisé en télédétection. Il exploite le contraste déjà vu au module Le Regard : la végétation en bonne santé réfléchit fortement le proche infrarouge et absorbe le rouge (photosynthèse), ce qui donne un NDVI élevé. Un sol nu, une surface bâtie ou de l'eau donnent un NDVI faible, voire négatif.",
  },
  {
    type: "callout",
    tone: "rappel",
    title: "Rappel : réflectance et contraste rouge/NIR (module Le Regard)",
    text: "Le module Le Regard établit que chaque surface réfléchit différemment selon la longueur d'onde, et que la végétation saine présente un contraste marqué entre un rouge très absorbé et un proche infrarouge très réfléchi. C'est précisément ce contraste rouge/NIR, déjà mesuré bande par bande, que le NDVI transforme ici en un seul indice normalisé.",
  },
  {
    type: "callout",
    tone: "example",
    title: "Calcul guidé : un pixel de forêt et un pixel de parking",
    text: "Pixel de forêt : Rouge = 0.04, NIR = 0.45 → NDVI = (0.45 − 0.04) / (0.45 + 0.04) = 0.41/0.49 ≈ 0.84 (végétation dense). Pixel de parking bitumé : Rouge = 0.12, NIR = 0.14 → NDVI = (0.14 − 0.12) / (0.14 + 0.12) = 0.02/0.26 ≈ 0.08 (proche de zéro, ni eau ni végétation). Même formule, deux résultats qui racontent deux surfaces radicalement différentes.",
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

  { type: "heading", text: "2. NDMI et NDBI : humidité et bâti, la même idée retournée", level: "lycee" },
  {
    type: "formula",
    label: "NDMI (humidité) et NDBI (bâti)",
    formula: "NDMI = (NIR − SWIR) / (NIR + SWIR)   ·   NDBI = (SWIR − NIR) / (SWIR + NIR)",
    note: "Les deux indices utilisent exactement les deux mêmes bandes (NIR, SWIR), dans l'ordre inverse l'un de l'autre.",
  },
  {
    type: "paragraph",
    text: "L'eau contenue dans les tissus végétaux absorbe fortement le SWIR : une végétation bien hydratée a donc un NDMI élevé, une végétation en stress hydrique voit son NDMI chuter avant même que le changement soit visible à l'œil. Le NDBI fait l'inverse : les surfaces bâties (béton, tuile, bitume) réfléchissent davantage le SWIR que le NIR, contrairement à la végétation — c'est ce qui permet de distinguer une zone bâtie d'un sol nu, deux surfaces qui ont pourtant un NDVI tout aussi faible l'une que l'autre.",
  },
  {
    type: "marginnote",
    title: "Mnémotechnique : retenir le sens de toutes les formules NDx",
    text: "Les trois indices NDVI/NDMI/NDBI partagent la même forme (A−B)/(A+B) : seul l'ordre des deux bandes change. Retenir une seule règle suffit pour les trois : la bande placée EN PREMIER (le signe +) est celle où le phénomène cherché réfléchit le plus fort. Végétation → NIR d'abord (NDVI). Humidité → NIR d'abord aussi, mais face au SWIR (NDMI). Bâti → c'est l'inverse, le SWIR réfléchit plus que le NIR (NDBI) : la seule des trois où l'ordre bascule.",
  },
  { type: "game" },

  { type: "heading", text: "3. Des indices simples aux indices composés", level: "lycee" },
  {
    type: "paragraph",
    text: "Un peu comme un bulletin météo qui annonce un « risque d'orage élevé » en croisant température, humidité et pression plutôt qu'une seule mesure isolée : un indice simple comme le NDVI, le NDMI ou le NDBI combine deux bandes brutes d'un capteur. Un indice composé va un cran plus loin : il combine plusieurs indices déjà calculés entre eux, plutôt que de repartir des bandes. L'objectif est de faire ressortir un phénomène qu'aucun indice seul ne capture correctement.",
  },
  {
    type: "callout",
    tone: "example",
    title: "Exemple réel : un indice composite de comportement du feu",
    text: "Un système de cartographie du risque incendie peut pondérer plusieurs entrées déjà calculées (indice d'humidité de la végétation, alignement du vent avec la pente, exposition solaire) dans une seule moyenne pondérée pour produire un indice de comportement du feu. Aucune de ces entrées prise seule ne suffit : c'est leur combinaison réfléchie qui a un sens opérationnel.",
  },
  {
    type: "paragraph",
    text: "Les formules ci-dessus restent abstraites tant qu'on ne les a pas vues s'appliquer à de vrais pixels. La planche suivante décode dans le navigateur les bandes réelles du jeu de données canonique : cliquer un pixel calcule NDVI, NDMI ou NDBI en direct à partir de sa réflectance réelle.",
  },
  {
    type: "live",
    name: "raster-explorer",
    caption: "Planche vivante. Mêmes bandes, mêmes formules que ci-dessus, appliquées pixel par pixel à la scène Sentinel-2 réelle de Vitrolles.",
  },
  {
    type: "list",
    items: [
      "Bilan — à retenir : NDVI = (NIR−Rouge)/(NIR+Rouge), élevé pour la végétation dense ; NDMI = (NIR−SWIR)/(NIR+SWIR), chute en cas de stress hydrique ; NDBI = (SWIR−NIR)/(SWIR+NIR), élevé pour le bâti ; les trois partagent la même forme (A−B)/(A+B) ; un indice composé combine plusieurs indices déjà calculés, pas seulement des bandes brutes.",
    ],
  },
  {
    type: "link",
    to: "/module/traitements-ia",
    label: "Continuer : du pixel isolé au voisinage, jusqu'à la classification",
    description: "Le module L'Intelligence prend le relais à partir d'ici : filtres à noyau, classification supervisée/non supervisée, deep learning.",
  },

  // ================================================================
  // PISTE LICENCE / BUT
  // ================================================================
  { type: "heading", text: "1. NDVI : Normalized Difference Vegetation Index", level: "superieur" },
  {
    type: "brique",
    id: "ndvi-formule",
    title: "La formule du NDVI",
    blocks: [
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
    ],
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
    text: "Au-delà d'une certaine densité de canopée (Indice de Surface Foliaire, LAI > ~3), le NDVI sature ; il n'augmente plus alors que la biomasse continue de croître, car le signal du sol sous-jacent devient négligeable et la réponse en NIR plafonne. Pour ces cas, on utilise des indices dérivés comme le SAVI ou l'EVI, qui corrigent partiellement cet effet.",
  },
  {
    type: "formula",
    label: "Sentinel-2 : quelles bandes pour le NIR et le Rouge ?",
    formula: "Rouge = B4 (665 nm, 10 m)   ·   NIR = B8 (842 nm, 10 m)",
    note: "Il existe aussi une bande B8A (865 nm, 20 m), plus étroite spectralement, parfois préférée pour des applications scientifiques exigeant une meilleure séparation avec les bandes d'absorption atmosphérique voisines, mais B8 reste le choix standard pour le NDVI en 10 m natif.",
  },

  { type: "heading", text: "2. NDMI : Normalized Difference Moisture Index", level: "superieur" },
  {
    type: "formula",
    label: "Formule du NDMI",
    formula: "NDMI = (NIR − SWIR) / (NIR + SWIR)",
    note: "SWIR = réflectance infrarouge à ondes courtes (~1.6 µm sur Sentinel-2, bande B11).",
  },
  {
    type: "paragraph",
    text: "L'eau contenue dans les tissus végétaux absorbe fortement le SWIR (une conséquence directe des bandes d'absorption de l'eau liquide vers 1.4–1.9 µm). Une végétation bien hydratée a donc un NDMI élevé ; une végétation en stress hydrique (sécheresse, précurseur de risque incendie) voit son NDMI chuter avant même que le changement soit visible à l'œil nu ou détectable par le NDVI seul. Le NDVI mesure la vigueur chlorophyllienne, le NDMI mesure directement la teneur en eau des tissus, deux grandeurs biophysiques distinctes qui décrochent l'une de l'autre précisément au moment le plus intéressant pour la surveillance du risque. C'est un indicateur précoce très utilisé pour le suivi de sécheresse et l'évaluation de l'inflammabilité de la végétation.",
  },
  {
    type: "callout",
    tone: "warning",
    title: "Un même nom, deux indices différents : NDWI",
    text: "Gao (1996) introduit la formule (NIR − SWIR) / (NIR + SWIR) — celle du NDMI ci-dessus — sous le nom de NDWI, pour la teneur en eau de la végétation. McFeeters (1996), la même année, publie un indice totalement différent, (Vert − NIR) / (Vert + NIR), pour détecter des surfaces en eau libre (lacs, rivières), et l'appelle lui aussi NDWI (voir le tableau plus bas). Les deux coexistent dans la littérature sous le même nom : en pratique, la formule Gao est presque toujours rebaptisée NDMI (comme dans ce cours) pour éviter la confusion, mais un article ou un plugin QGIS qui parle de « NDWI » tout court peut désigner l'un ou l'autre — vérifier systématiquement la formule, pas seulement le sigle.",
  },

  { type: "heading", text: "3. NDBI : Normalized Difference Built-up Index", level: "superieur" },
  {
    type: "formula",
    label: "Formule du NDBI",
    formula: "NDBI = (SWIR − NIR) / (SWIR + NIR)",
    note: "Symétrique du NDMI : les surfaces bâties réfléchissent davantage le SWIR que le NIR, contrairement à la végétation.",
  },
  {
    type: "paragraph",
    text: "Publié par Zha, Gao et Ni (2003) pour cartographier automatiquement l'étalement urbain de Nanjing (Chine) depuis Landsat TM, le NDBI est utilisé pour cartographier l'étalement urbain, détecter les surfaces imperméabilisées, ou, combiné au NDVI, distinguer une zone bâtie d'un sol nu (les deux ont un NDVI faible, mais un NDBI les différencie nettement, car un matériau minéral construit réfléchit bien davantage le SWIR qu'un sol nu naturel).",
  },
  {
    type: "marginnote",
    title: "Mnémotechnique : retenir le sens de toutes les formules NDx",
    text: "Les trois indices NDVI/NDMI/NDBI partagent la même forme (A−B)/(A+B) : seul l'ordre des deux bandes change. La bande placée EN PREMIER (le signe +) est celle où le phénomène cherché réfléchit le plus fort. Végétation → NIR d'abord (NDVI). Humidité → NIR d'abord aussi, face au SWIR (NDMI). Bâti → c'est l'inverse (NDBI), la seule des trois où l'ordre bascule.",
  },

  { type: "heading", text: "4. Les indices corrigés de la végétation : SAVI, MSAVI2 et EVI", level: "superieur" },
  {
    type: "paragraph",
    text: "Le NDVI a deux défauts documentés depuis les années 1980 : sa sensibilité au sol nu visible à travers un couvert clairsemé (le sol a sa propre réflectance, qui « pollue » le signal de végétation), et sa saturation en forte biomasse. Plusieurs indices ont été conçus spécifiquement pour corriger l'un ou l'autre défaut.",
  },
  {
    type: "brique",
    id: "indices-derives",
    title: "Indices dérivés : SAVI, EVI, NBR, NDRE",
    blocks: [
      {
        type: "formula",
        label: "SAVI (Huete, 1988) : correction de l'effet du sol",
        formula: "SAVI = (NIR − Rouge) / (NIR + Rouge + L) × (1 + L)",
        note: "L est une constante de correction de la ligne de sol (« soil brightness correction factor »), généralement fixée à 0.5, valeur empirique adaptée à une densité de végétation intermédiaire. L = 0 ramène le SAVI au NDVI ; L = 1 correspond à une très faible densité de végétation.",
      },
      {
        type: "formula",
        label: "MSAVI2 (Qi et al., 1994) : SAVI sans paramètre à régler",
        formula: "MSAVI2 = (2·NIR + 1 − √((2·NIR + 1)² − 8·(NIR − Rouge))) / 2",
        note: "Version « auto-ajustée » du SAVI : L n'est plus un paramètre fixe choisi par l'utilisateur, mais recalculé pixel par pixel à partir de l'image elle-même, utile quand on ne connaît pas a priori la densité de végétation de la zone étudiée.",
      },
      {
        type: "formula",
        label: "EVI (Liu & Huete, 1995 ; Huete et al., 2002) : correction atmosphérique et de saturation",
        formula: "EVI = G × (NIR − Rouge) / (NIR + C1·Rouge − C2·Bleu + L)",
        note: "Coefficients standards (produit MODIS) : G = 2.5, C1 = 6, C2 = 7.5, L = 1. L'ajout de la bande bleue corrige les résidus d'aérosols atmosphériques que le NDVI seul ne compense pas, et la formule reste linéaire à plus haute biomasse : c'est l'indice de référence du produit opérationnel MODIS MOD13, utilisé notamment pour le suivi de la forêt amazonienne, où le NDVI sature presque en permanence.",
      },
    ],
  },
  {
    type: "callout",
    tone: "info",
    title: "Lequel choisir ?",
    text: "Le NDVI reste le standard par défaut (simple, comparable à des décennies d'archives). Le SAVI/MSAVI2 est préférable sur sol peu couvert (semis, zones arides, débuts de saison culturale). L'EVI est préférable sur forêt dense ou canopée fermée, là où le NDVI plafonne. Changer d'indice au milieu d'une série temporelle sans le documenter est une erreur méthodologique fréquente : les valeurs ne sont pas directement comparables d'un indice à l'autre.",
  },
  { type: "game" },

  { type: "heading", text: "5. Red-edge et indices de chlorophylle", level: "superieur" },
  {
    type: "paragraph",
    text: "Sentinel-2 possède une particularité rare parmi les capteurs gratuits : trois bandes situées dans le red-edge (le « bord rouge », la zone de transition très abrupte entre absorption chlorophyllienne et plateau de réflectance NIR : B5 à 705 nm, B6 à 740 nm, B7 à 783 nm). Cette zone est directement sensible à la teneur en chlorophylle de la feuille, avant même que le NDVI (fondé sur le plateau NIR, moins sensible aux variations fines de chlorophylle une fois la canopée fermée) ne réagisse.",
  },
  {
    type: "formula",
    label: "NDRE (Normalized Difference Red Edge, Gitelson & Merzlyak, 1994)",
    formula: "NDRE = (NIR − RedEdge) / (NIR + RedEdge)",
    note: "Sur Sentinel-2 : NIR = B8 (842 nm). Pour RedEdge, la littérature n'est pas unanime : la publication d'origine (Gitelson & Merzlyak, 1994) teste à la fois 705 nm et 750 nm ; la pratique courante utilise B5 (705 nm, le plus proche du rouge, le plus sensible à la chlorophylle) ou B6 (740 nm, un peu plus stable en forte biomasse) selon les études. Un NDRE « B5 » et un NDRE « B6 » calculés sur la même image ne sont pas strictement le même indice : toujours préciser laquelle des deux bandes a été utilisée dans un rapport ou une publication.",
  },
  {
    type: "callout",
    tone: "info",
    title: "Pourquoi si peu de capteurs gratuits ont des bandes red-edge",
    text: "Landsat (toutes générations) n'a jamais eu de bande red-edge : le NDRE et les indices de chlorophylle qui en dépendent sont, de fait, réservés aux capteurs qui en sont équipés (Sentinel-2, RapidEye, certains capteurs commerciaux). C'est une des raisons pour lesquelles Sentinel-2 s'est imposé plus vite que Landsat en agriculture de précision malgré une résolution spatiale comparable.",
  },

  { type: "heading", text: "6. Autres indices courants", level: "superieur" },
  {
    type: "table",
    headers: ["Indice", "Formule", "Usage"],
    rows: [
      ["NDWI", "(Vert − NIR) / (Vert + NIR)", "Détection de surfaces en eau libre (McFeeters, 1996)"],
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
    text: "Le NBR utilise la bande SWIR2 (~2.2 µm, B12 sur Sentinel-2), car la végétation brûlée et les cendres ont une réflectance NIR effondrée et une réflectance SWIR fortement augmentée par rapport à une végétation saine. Comparer le NBR juste avant et juste après un feu (ΔNBR = NBR_préfeu − NBR_postfeu) est la méthode standard des services forestiers pour classer la sévérité d'un incendie en plusieurs catégories, de la repousse rapide à la mortalité totale du peuplement.",
  },
  {
    type: "paragraph",
    text: "Les formules ci-dessus restent abstraites tant qu'on ne les a pas vues s'appliquer à de vrais pixels. La planche suivante décode dans le navigateur les 6 bandes réelles du jeu de données canonique : cliquer un pixel calcule NDVI, NDMI, NDBI, NDRE ou NDWI en direct à partir de sa réflectance réelle, formule affichée avec les vraies valeurs plutôt qu'un exemple générique.",
  },
  {
    type: "live",
    name: "raster-explorer",
    caption: "Planche vivante. Mêmes bandes, mêmes formules que ci-dessus, appliquées pixel par pixel à la scène Sentinel-2 réelle de Vitrolles.",
  },

  { type: "heading", text: "7. Indices complexes : au-delà du simple ratio", level: "superieur" },
  {
    type: "paragraph",
    text: "Un indice complexe ne se limite pas à une division entre deux bandes : il peut combiner linéairement plusieurs bandes avec des coefficients fixes, ou reposer sur une transformation statistique de l'image entière. Deux exemples classiques :",
  },
  {
    type: "list",
    items: [
      "Tasseled Cap (transformation de Kauth-Thomas, 1976) : combine toutes les bandes d'une image via des coefficients fixes, propres à chaque capteur, pour produire trois axes interprétables : luminosité du sol (brightness), verdeur de la végétation (greenness), humidité (wetness)",
      "Analyse en composantes principales (ACP) appliquée à l'image : recombine les bandes corrélées entre elles en un plus petit nombre de composantes non corrélées, qui concentrent l'essentiel de l'information utile",
    ],
  },
  {
    type: "formula",
    label: "Tasseled Cap : axe « greenness » (coefficients Landsat TM en réflectance, Crist, 1985)",
    formula: "Greenness ≈ −0.160·B1 − 0.282·B2 − 0.493·B3 + 0.794·B4 − 0.0002·B5 − 0.145·B7",
    note: "Le proche infrarouge (B4) domine largement la combinaison, ce qui est physiquement attendu : c'est la bande la plus sensible à la structure foliaire, donc à la « verdeur ». Contrairement au NDVI, ces coefficients ne sont pas universels : ils sont recalculés pour chaque capteur (des jeux distincts existent pour Landsat TM, ETM+, OLI et pour Sentinel-2) à partir d'une analyse statistique des images de ce capteur précis. C'est le prix de leur précision accrue.",
  },
  {
    type: "callout",
    tone: "info",
    title: "Pourquoi ne pas toujours utiliser un indice complexe ?",
    text: "Un indice simple (NDVI) est interprétable en un coup d'œil et comparable d'une étude à l'autre. Un indice complexe est souvent plus précis pour un usage donné, mais ses coefficients sont propres à un capteur et un contexte : il perd en généralité ce qu'il gagne en finesse.",
  },

  { type: "heading", text: "8. Signatures spectrales comparées", level: "superieur" },
  {
    type: "paragraph",
    text: "Chaque type de surface (végétation, eau, sol nu, bâti) a une signature spectrale caractéristique, sa réflectance selon la longueur d'onde. Superposer ces signatures explique d'un coup pourquoi le NDVI, le NDMI et le NDBI choisissent chacun des paires de bandes différentes : ils exploitent l'endroit du spectre où deux types de surface se distinguent le plus nettement.",
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
    text: "L'eau absorbe presque tout le rayonnement au-delà du visible, d'où sa réflectance qui chute continûment. La végétation présente le sursaut caractéristique en proche infrarouge. Sol nu et bâti ont des courbes plus plates et proches l'une de l'autre dans le visible/NIR, ce qui explique pourquoi il faut aller chercher le SWIR (NDBI) pour les séparer.",
  },

  { type: "heading", text: "9. Limites communes à tous les indices spectraux", level: "superieur" },
  {
    type: "list",
    items: [
      "Effets atmosphériques : nuages, brume, aérosols faussent la réflectance mesurée si l'image n'est pas correctement corrigée (niveau L2A pour Sentinel-2)",
      "Résolution spatiale : un pixel de 10 m peut mélanger plusieurs types de couverture (effet de mélange spectral, mixed pixel)",
      "Angle de prise de vue et ombres portées : un même objet peut avoir une réflectance différente selon l'heure et la saison de l'acquisition (effets BRDF, voir module Le Regard)",
      "Saturation : voir NDVI ci-dessus, un phénomène général à haute densité de signal",
      "Absence de vérité terrain : un indice élevé ou faible reste une mesure indirecte ; sans relevé de terrain de contrôle, son interprétation reste une hypothèse, pas un fait établi",
    ],
  },
  {
    type: "callout",
    tone: "example",
    title: "Exemple d'application concrète",
    text: "Un projet de cartographie du risque incendie de forêt peut croiser NDMI (stress hydrique de la végétation), NDVI (densité de combustible), pente et exposition au vent pour produire un indice composite de comportement du feu. C'est exactement ce type de croisement multi-indices qui est mis en pratique dans le module Travaux pratiques.",
  },
  {
    type: "list",
    items: [
      "Bilan — à retenir : SAVI/MSAVI2/EVI corrigent respectivement l'effet du sol et la saturation du NDVI ; le red-edge (Sentinel-2 seulement) sensibilise le NDRE à la chlorophylle avant que le NDVI ne réagisse ; un indice complexe (Tasseled Cap, ACP) combine plusieurs bandes avec des coefficients propres au capteur ; tous les indices partagent les mêmes limites : atmosphère, mélange spectral, BRDF, saturation, absence de vérité terrain.",
    ],
  },
  {
    type: "link",
    to: "/module/travaux-pratiques",
    label: "Pratiquer : du calcul de NDVI à l'indice composé",
    description: "La séance 3 de l'Atelier calcule un NDVI réel, puis compose un ΔNDVI multi-dates à partir de ce que ce module vient de présenter.",
  },
  {
    type: "link",
    to: "/module/traitements-ia",
    label: "Continuer : du pixel isolé au voisinage, jusqu'à la classification",
    description: "Le module L'Intelligence prend le relais à partir d'ici : filtres à noyau, classification supervisée/non supervisée, deep learning.",
  },

  // ================================================================
  // PISTE MASTER / RECHERCHE
  // ================================================================
  { type: "heading", text: "1. Indices radar : au-delà de l'optique", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Un capteur SAR ne mesure pas une réflectance mais un coefficient de rétrodiffusion (σ°, en dB) : les indices « spectraux » au sens strict n'existent donc pas en radar, mais des indicateurs équivalents jouent le même rôle : ratios entre polarisations, ou différences temporelles.",
  },
  {
    type: "list",
    items: [
      "Ratio de polarisation VH/VV (Sentinel-1) : une chute marquée signale souvent une surface en eau libre ou une inondation, la surface calme se comportant comme un miroir radar (réflexion spéculaire, peu de retour vers le capteur)",
      "RVI (Radar Vegetation Index) : combine les polarisations pour approcher une information de structure/densité de végétation, sans dépendre du tout de l'éclairage solaire ni de la couverture nuageuse",
      "Détection de changement radar par différence temporelle : très utilisée pour la cartographie rapide de zones inondées, un cas où l'optique est justement inutilisable (ciel couvert au moment de la crue)",
    ],
  },

  { type: "heading", text: "2. Valider un indice : le confronter à une mesure biophysique réelle", level: "approfondissement" },
  {
    type: "paragraph",
    text: "Un indice spectral reste, par construction, une mesure indirecte. Le valider scientifiquement suppose de le confronter statistiquement à une grandeur biophysique mesurée sur le terrain : le LAI (Leaf Area Index, surface foliaire par unité de surface au sol) est la référence la plus courante pour un indice de végétation.",
  },
  {
    type: "formula",
    label: "Régression indice ↔ variable terrain",
    formula: "LAI ≈ a · exp(b · NDVI) + c   (ou une régression linéaire simple selon la gamme de LAI étudiée)",
    note: "Le couple (R², RMSE) de cette régression, calculé sur un jeu de placettes terrain indépendant, quantifie la qualité du lien indice↔terrain pour la zone et la culture étudiées. RMSE : ici, la racine carrée de l'écart quadratique moyen entre le LAI prédit par la régression et le LAI réellement mesuré sur le terrain (même définition qu'en géoréférencement, module Fondements — seule la grandeur comparée change). Un R² proche de 1 avec une RMSE faible valide l'indice comme proxy fiable du LAI localement, mais ces coefficients (a, b, c) sont propres à un couvert végétal et une région, et ne se généralisent jamais automatiquement ailleurs sans nouvelle calibration terrain.",
  },
  {
    type: "callout",
    tone: "warning",
    title: "Un R² élevé sur le jeu de calibration ne garantit rien sur un jeu indépendant",
    text: "Comme pour un modèle de classification (module L'Intelligence, sur-apprentissage), une régression indice↔LAI calibrée et évaluée sur le même jeu de placettes terrain donne un R² optimiste. La validation rigoureuse exige un jeu de placettes de test indépendant, jamais utilisé pour ajuster (a, b, c).",
  },

  { type: "heading", text: "3. Séries temporelles et phénologie", level: "approfondissement" },
  {
    type: "brique",
    id: "series-temporelles",
    title: "Séries temporelles et phénologie",
    blocks: [
      {
        type: "paragraph",
        text: "Un indice calculé sur une seule date décrit un état. La même série d'indices calculée à intervalles réguliers sur une saison ou plusieurs années décrit une dynamique, la phénologie (cycle végétatif) d'une culture ou d'un écosystème, exploitable pour détecter un changement réel plutôt qu'une simple fluctuation saisonnière.",
      },
      {
        type: "list",
        items: [
          "Régression harmonique : modélise le cycle saisonnier normal d'un indice (ex. NDVI) par une somme de sinusoïdes (une composante annuelle, éventuellement une semestrielle), ajustée sur plusieurs années d'archive",
          "Résidu par rapport à la courbe harmonique : une fois le cycle saisonnier normal modélisé, l'écart entre la valeur observée et la valeur attendue à cette date signale une anomalie (stress, coupe, maladie) indépendamment de la saison",
          "Détection de rupture (ex. approche BFAST : Breaks For Additive Season and Trend, Verbesselt et al., 2010) : détecte statistiquement le moment où la série change durablement de comportement (tendance ou saisonnalité), utilisée pour dater automatiquement une déforestation sur une série Landsat/Sentinel-2 pluriannuelle",
        ],
      },
    ],
  },
  {
    type: "callout",
    tone: "example",
    title: "Pourquoi un ΔNDVI simple (deux dates) ne suffit pas toujours",
    text: "Le ΔNDVI de la séance 3 du module Travaux pratiques compare deux dates précises : un bon outil pour un changement net et localisé (coupe rase). Sur un phénomène progressif ou bruité par la variabilité interannuelle (sécheresse pluriannuelle, dépérissement lent), une analyse de série temporelle complète (harmonique + détection de rupture) sépare beaucoup mieux le signal réel du bruit saisonnier normal qu'une simple différence à deux dates.",
  },
  {
    type: "callout",
    tone: "question",
    title: "À toi de voir",
    text: "Une parcelle agricole montre un NDVI en baisse progressive sur trois années consécutives. Propose deux hypothèses radicalement différentes qui produiraient exactement le même signal (une baisse lente et régulière), et explique quelle méthode de cette section permettrait de les départager sans aller sur le terrain.",
  },
  {
    type: "list",
    items: [
      "Bilan — à retenir : un indice radar (VH/VV, RVI) remplace la réflectance par la rétrodiffusion, utile quand l'optique est aveugle (nuages) ; valider un indice suppose une régression contre une mesure terrain indépendante (LAI), avec RMSE et R² interprétés prudemment ; une série temporelle (régression harmonique + détection de rupture) sépare un signal réel d'une fluctuation saisonnière, mieux qu'une différence à deux dates seule.",
    ],
  },
  {
    type: "link",
    to: "/module/traitements-ia",
    label: "Continuer : du pixel isolé au voisinage, jusqu'à la classification",
    description: "Le module L'Intelligence prend le relais à partir d'ici : filtres à noyau, classification supervisée/non supervisée, deep learning.",
  },
]
