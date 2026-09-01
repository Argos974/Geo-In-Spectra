import type { ContentLevel } from "@/content/types"
import type { DiagramName } from "@/components/diagrams"

export interface Exercise {
  prompt: string
  formula?: { label: string; formula: string; note?: string }
  dataset?: { headers: string[]; rows: string[][] }
  /** Planche du registre (src/components/diagrams/registry.ts) qui appuie visuellement l'énoncé — pas systématique, seulement quand une figure existante ou dédiée éclaire vraiment le problème. */
  diagram?: { name: DiagramName; caption?: string }
  solutionText: string
  solutionItems?: string[]
  /**
   * Piste visée (Lycée/Licence-BUT/Master-Recherche) — absent sur les
   * exercices d'avant le passage des salles à 3 pistes : ceux-là restent
   * affichés quelle que soit la piste active (voir ExercisesPage), plutôt que
   * de disparaître tant qu'ils n'ont pas été explicitement déclinés.
   */
  level?: ContentLevel
}

export interface ExerciseSet {
  title: string
  intro: string
  exercises: Exercise[]
}

/**
 * Exercices courts, un point d'entrée pratique dédié à chaque salle (même
 * logique que le quiz et le jeu : 1 page par salle) — complémentaires aux
 * séances de l'Atelier, pas un remplacement : ici, 3 questions courtes avec
 * corrigé, pas une séance complète. L'Atelier lui-même n'a pas d'entrée ici,
 * puisqu'il est déjà entièrement composé d'exercices.
 *
 * Chaque exercice qui repose sur un calcul rappelle sa formule (bloc dédié)
 * et fournit un vrai jeu de données (tableau) à traiter — pas seulement un
 * scénario à commenter comme au quiz. Le but : forcer un vrai calcul/lecture
 * de données, pas juste reconnaître un concept déjà vu sous forme de QCM.
 */
export const exercises: Record<string, ExerciseSet> = {
  fondamentaux: {
    title: "Exercices : Fondements",
    intro: "Des exercices avec un vrai calcul à faire, à partir d'un jeu de données à chaque fois — affichés selon la piste choisie dans la salle (les exercices non déclinés par piste restent visibles quel que soit le niveau).",
    exercises: [
      {
        level: "lycee",
        prompt:
          "Un randonneur connaît sa distance à trois refuges de montagne dont il a les coordonnées exactes : 8 km du refuge A, 5 km du refuge B, 6 km du refuge C. Explique, sans calculer, comment il peut retrouver sa position sur une carte à l'aide d'un compas — et pourquoi la distance à un seul refuge ne suffirait pas.",
        diagram: { name: "trilateration-circles", caption: "Trois cercles de distance (un par refuge) : leur unique intersection commune est la position cherchée." },
        solutionText: "Il trace au compas un cercle de 8 km autour de A, un cercle de 5 km autour de B, un cercle de 6 km autour de C : les trois cercles se croisent (approximativement) en un seul point, sa position — exactement le principe de la trilatération utilisé par un GPS, avec des satellites à la place des refuges.",
        solutionItems: [
          "Une seule distance connue (à A seul) laisse une infinité de positions possibles : tout le cercle de 8 km autour de A.",
          "Deux distances (A et B) réduisent la position à deux points possibles seulement : les deux intersections des deux cercles.",
          "La troisième distance (C) lève l'ambiguïté entre ces deux points : un seul reste cohérent avec les trois cercles à la fois.",
        ],
      },
      {
        level: "superieur",
        prompt:
          "Calcule la distance réelle représentée par 1° de longitude à Marseille (43.30°N) et à Brest (48.39°N), à partir de la formule ci-dessous. Que remarques-tu, et pourquoi ce n'est pas un détail anodin pour un calcul de distance en degrés ?",
        formula: {
          label: "Longueur d'1° de longitude selon la latitude",
          formula: "L(°lon) ≈ 111.32 × cos(latitude) km",
          note: "Les méridiens convergent vers les pôles : un même écart de longitude représente une distance au sol plus courte à mesure que la latitude augmente.",
        },
        solutionText: "Deux longueurs nettement différentes pour le même 1° de longitude, preuve concrète qu'un degré n'est pas une unité de distance fixe.",
        solutionItems: [
          "Marseille (43.30°N) : 111.32 × cos(43.30°) ≈ 111.32 × 0.728 ≈ 81.0 km pour 1° de longitude.",
          "Brest (48.39°N) : 111.32 × cos(48.39°) ≈ 111.32 × 0.664 ≈ 73.9 km pour 1° de longitude.",
          "Écart d'environ 7 km sur un seul degré entre ces deux villes pourtant proches en latitude : à l'échelle d'un pays entier ou près des pôles, l'erreur commise en traitant les degrés comme des mètres devient massive.",
        ],
      },
      {
        level: "superieur",
        diagram: { name: "coordinate-systems", caption: "Repère Lambert-93 : X vers l'est, Y vers le nord — la lecture directe des coordonnées de l'énoncé." },
        prompt:
          "Calcule la distance de chacun des points suivants à Paris (X = 652 000, Y = 6 862 000 en Lambert-93), classe-les du plus proche au plus éloigné, et indique la direction du plus proche par rapport à Paris.",
        formula: {
          label: "Distance euclidienne en système projeté métrique",
          formula: "d = √((X₂ − X₁)² + (Y₂ − Y₁)²)",
          note: "Valide uniquement dans un système projeté (Lambert-93) : X croît vers l'est, Y croît vers le nord.",
        },
        dataset: {
          headers: ["Point", "X (Lambert-93)", "Y (Lambert-93)"],
          rows: [
            ["A", "750 000", "6 600 000"],
            ["B", "620 000", "6 900 000"],
            ["C", "700 000", "6 862 000"],
          ],
        },
        solutionText: "Classement du plus proche au plus éloigné : C, puis B (à quelques centaines de mètres près seulement), puis A, largement plus loin.",
        solutionItems: [
          "C : ΔX = 48 000, ΔY = 0 → d = 48 000 m = 48.0 km, plein est de Paris.",
          "B : ΔX = −32 000, ΔY = 38 000 → d = √(32 000² + 38 000²) ≈ 49.7 km, au nord-ouest.",
          "A : ΔX = 98 000, ΔY = −262 000 → d = √(98 000² + 262 000²) ≈ 279.7 km, au sud-est.",
          "C et B sont trop proches (48.0 vs 49.7 km) pour trancher au jugé : sans le calcul, l'ordre C/B est facile à inverser par erreur.",
        ],
      },
      {
        level: "superieur",
        prompt:
          "Un géoréférencement a été calé sur 4 points de contrôle : les points 1, 2 et 3 sont regroupés dans le même coin de l'image ; le point 4, ajouté ensuite pour vérifier, se trouve à l'autre bout de l'image. Calcule le RMSE global (les 4 points), puis le RMSE en ne gardant que les points 1 à 3. Que révèle la comparaison des deux résultats ?",
        formula: {
          label: "RMSE d'un géoréférencement (résidus dx, dy par point de contrôle)",
          formula: "RMSE = √( (1/n) × Σ(dx² + dy²) )",
          note: "Rappel : la RMSE (Root Mean Square Error, erreur quadratique moyenne) mesure l'écart type des résidus dx/dy (l'écart entre la position calée et la position réelle de chaque point de contrôle) — plus elle est petite, plus le calage est fidèle en moyenne. Voir le module Fondements pour le détail.",
        },
        dataset: {
          headers: ["Point", "dx (m)", "dy (m)"],
          rows: [
            ["1", "0.8", "-0.3"],
            ["2", "1.1", "0.4"],
            ["3", "-0.6", "0.9"],
            ["4", "15.2", "-18.7"],
          ],
        },
        solutionText: "Le RMSE local (points 1-3, tous groupés) paraît excellent, mais le RMSE global (avec le point 4, loin du groupe) révèle une erreur bien plus grande — exactement le piège du géoréférencement calé sur des points trop regroupés.",
        solutionItems: [
          "Points 1-3 seuls : (0.73 + 1.37 + 1.17) / 3 = 1.09, RMSE ≈ 1.04 m — un résultat très rassurant, en apparence.",
          "Les 4 points : (0.73 + 1.37 + 1.17 + 580.73) / 4 = 146.0, RMSE ≈ 12.08 m.",
          "Le point 4, seul à sortir de la zone d'appui, révèle une erreur réelle plus de 10 fois supérieure à ce que suggérait le résidu local — un résidu faible ne garantit la précision qu'au voisinage des points utilisés pour le calage.",
        ],
      },
      {
        level: "approfondissement",
        prompt:
          "Un point mesuré en ITRF il y a exactement 8 ans est comparé, sans transformation, à sa coordonnée RGF93 actuelle. La dérive de la plaque eurasienne est d'environ 2,5 cm/an. Calcule l'écart accumulé, et compare-le à la précision typique d'un relevé RTK.",
        formula: {
          label: "Dérive cumulée entre deux référentiels",
          formula: "écart ≈ vitesse de dérive × durée",
        },
        solutionText: "L'écart accumulé (~20 cm) dépasse largement la précision centimétrique d'un relevé RTK : comparer directement les deux coordonnées sans transformation ITRF → RGF93 produirait une erreur bien plus grande que celle du relevé lui-même.",
        solutionItems: [
          "écart ≈ 2,5 cm/an × 8 ans = 20 cm.",
          "Un relevé RTK vise 1 à 2 cm de précision : un écart de 20 cm dû au seul référentiel, non corrigé, est dix fois plus grand que l'incertitude de la mesure elle-même.",
          "C'est pourquoi RGF93 reste « gelé » sur la plaque eurasienne (module Fondements, piste Master/Recherche) : sans ce choix, tout cadastre ou plan topographique français devrait être recalculé en continu.",
        ],
      },
    ],
  },
  teledetection: {
    title: "Exercices : Le Regard",
    intro: "Trois exercices avec un vrai calcul à faire, à partir d'un jeu de données à chaque fois.",
    exercises: [
      {
        level: "superieur",
        diagram: { name: "reflectance-curve", caption: "Courbe de réflectance : l'eau absorbe fortement le NIR, contrairement au bleu — la signature qui explique le NDWI calculé ici." },
        prompt:
          "Un pixel de plan d'eau a les réflectances suivantes. Calcule son NDWI et son ratio de réflectance Bleu/NIR. Que confirment ces deux nombres sur la nature du pixel ?",
        formula: {
          label: "NDWI (McFeeters)",
          formula: "NDWI = (Vert − NIR) / (Vert + NIR)",
        },
        dataset: {
          headers: ["Bande", "Réflectance"],
          rows: [
            ["Bleu", "0.09"],
            ["Vert", "0.07"],
            ["NIR", "0.02"],
          ],
        },
        solutionText: "NDWI = (0.07 − 0.02) / (0.07 + 0.02) = 0.05 / 0.09 ≈ 0.56, nettement positif : signature d'eau confirmée.",
        solutionItems: [
          "NDWI ≈ 0.56, bien au-dessus de 0 : confirme une surface en eau.",
          "Ratio Bleu/NIR = 0.09 / 0.02 = 4.5 : le bleu est 4.5 fois plus réfléchi que le NIR, cohérent avec l'absorption quasi totale du NIR par l'eau.",
        ],
      },
      {
        level: "approfondissement",
        prompt:
          "Deux acquisitions du même lieu, aux conditions solaires suivantes. Calcule le ratio d'irradiance directe théorique reçue par l'acquisition B par rapport à A, et explique ce que ça implique pour comparer les deux images pixel à pixel sans précaution.",
        formula: {
          label: "Irradiance directe reçue au sol (approximation)",
          formula: "Irradiance ∝ sin(hauteur du soleil)",
        },
        dataset: {
          headers: ["Acquisition", "Date", "Heure solaire", "Hauteur du soleil", "Nébulosité"],
          rows: [
            ["A", "21/06", "12:00", "68°", "5%"],
            ["B", "15/01", "09:00", "18°", "15%"],
          ],
        },
        solutionText: "Ratio B/A = sin(18°) / sin(68°) ≈ 0.309 / 0.927 ≈ 0.33 : l'acquisition B ne reçoit qu'environ un tiers de l'irradiance directe de l'acquisition A.",
        solutionItems: [
          "sin(18°) ≈ 0.309, sin(68°) ≈ 0.927 → ratio ≈ 0.33.",
          "Une même surface au sol renverra donc un flux réfléchi presque 3 fois plus faible en B qu'en A, sans que sa réflectance intrinsèque ait changé : comparer les deux images sans correction confondrait ce pur effet d'éclairage avec un vrai changement au sol.",
        ],
      },
      {
        level: "lycee",
        prompt:
          "Nébulosité relevée sur 10 jours consécutifs au-dessus d'un site à surveiller. En considérant qu'une image optique n'est exploitable qu'en dessous de 20 % de nébulosité (le radar restant exploitable tous les jours), calcule le pourcentage de jours exploitables en optique sur cette période, et le nombre de jours d'observation perdus.",
        dataset: {
          headers: ["Jour", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
          rows: [["Nébulosité (%)", "80", "45", "10", "5", "60", "90", "15", "25", "8", "70"]],
        },
        solutionText: "4 jours sur 10 seulement sont exploitables en optique (40 %), soit 6 jours d'observation perdus sur la période — contre 10 jours sur 10 en radar.",
        solutionItems: [
          "Jours < 20 % : jour 3 (10 %), jour 4 (5 %), jour 7 (15 %), jour 9 (8 %) → 4 jours exploitables sur 10, soit 40 %.",
          "6 jours perdus en optique sur cette seule période de 10 jours, alors que le radar aurait fourni une image exploitable chacun de ces 10 jours.",
        ],
      },
    ],
  },
  "indices-spectraux": {
    title: "Exercices : Les Couleurs",
    intro: "Trois exercices, avec un vrai calcul à faire sur un jeu de données à chaque fois.",
    exercises: [
      {
        level: "lycee",
        diagram: { name: "ndvi-scale", caption: "Échelle du NDVI et ses classes d'interprétation, pour situer les 4 pixels calculés ici." },
        prompt:
          "Calcule le NDVI de chacun des 4 pixels suivants, classe chacun, puis indique combien appartiennent à la classe \"végétation dense et vigoureuse\" (0.4 à 0.8).",
        formula: {
          label: "NDVI",
          formula: "NDVI = (NIR − Rouge) / (NIR + Rouge)",
        },
        dataset: {
          headers: ["Pixel", "Rouge", "NIR"],
          rows: [
            ["1", "0.08", "0.45"],
            ["2", "0.22", "0.28"],
            ["3", "0.05", "0.06"],
            ["4", "0.18", "0.55"],
          ],
        },
        solutionText: "2 pixels sur 4 (le 1 et le 4) sont en classe \"végétation dense et vigoureuse\".",
        solutionItems: [
          "Pixel 1 : (0.45 − 0.08) / 0.53 ≈ 0.70 → végétation dense.",
          "Pixel 2 : (0.28 − 0.22) / 0.50 ≈ 0.12 → très faible, sol quasi nu ou végétation en fort stress.",
          "Pixel 3 : (0.06 − 0.05) / 0.11 ≈ 0.09 → proche de 0, à la frontière sol nu/eau.",
          "Pixel 4 : (0.55 − 0.18) / 0.73 ≈ 0.51 → végétation dense.",
        ],
      },
      {
        level: "superieur",
        diagram: { name: "spectral-signatures", caption: "Signatures spectrales comparées : le contraste SWIR/NIR entre surfaces bâties et végétation, à la base du NDBI." },
        prompt: "Un pixel a pour réflectance SWIR = 0.30 et NIR = 0.20. Calcule son NDBI et interprète le résultat.",
        formula: {
          label: "NDBI",
          formula: "NDBI = (SWIR − NIR) / (SWIR + NIR)",
        },
        solutionText: "NDBI = (0.30 − 0.20) / (0.30 + 0.20) = 0.10 / 0.50 = 0.20, un NDBI positif signale une surface bâtie ou minérale (le SWIR y est plus réfléchi que le NIR), à l'opposé d'un pixel de végétation.",
      },
      {
        level: "approfondissement",
        prompt: "Deux parcelles ont exactement le même NDVI (0.15) en plein été : l'une est un champ labouré, l'autre un parking. Quel indice permettrait de les distinguer, et pourquoi le NDVI seul ne suffit pas ?",
        solutionText: "Le NDBI. Sol nu agricole et surface bâtie ont tous deux un NDVI faible (peu ou pas de végétation) : le NDVI seul ne peut pas les séparer. Le NDBI exploite le contraste SWIR/NIR, très différent entre un matériau minéral construit (béton, bitume, tuile) et un sol nu naturel.",
      },
    ],
  },
  "outils-sig": {
    title: "Exercices : Le Compas",
    intro: "Trois exercices avec un vrai calcul ou une vraie lecture de données à faire.",
    exercises: [
      {
        level: "lycee",
        diagram: { name: "spatial-operations", caption: "Intersection de deux couches : la surface commune calculée ici, entre chaque commune et la zone inondable." },
        prompt:
          "Pour ces 4 communes, calcule le pourcentage de surface couverte par la zone inondable, identifie la commune entièrement en zone inondable et celle qui n'est pas concernée.",
        formula: {
          label: "Taux de couverture d'une zone",
          formula: "% couverture = (surface intersectée / surface totale) × 100",
        },
        dataset: {
          headers: ["Commune", "Surface totale (ha)", "Surface inondable intersectée (ha)"],
          rows: [
            ["A", "1 200", "180"],
            ["B", "850", "850"],
            ["C", "2 000", "0"],
            ["D", "430", "95"],
          ],
        },
        solutionText: "B est entièrement en zone inondable (100 %), C n'est pas concernée (0 %).",
        solutionItems: [
          "A : 180 / 1 200 = 15 %.",
          "B : 850 / 850 = 100 % — entièrement en zone inondable.",
          "C : 0 / 2 000 = 0 % — non concernée.",
          "D : 95 / 430 ≈ 22.1 %.",
        ],
      },
      {
        level: "superieur",
        diagram: { name: "lisa-quadrant", caption: "Quadrants LISA (HH/LL/HL/LH) : la commune X et son voisinage se situeraient ici dans le quadrant \"haut entouré de haut\"." },
        prompt:
          "Une commune X affiche un taux de chômage de 12 %. Ses 4 communes voisines directes affichent les valeurs ci-dessous. Calcule le retard spatial (spatial lag) de la commune X, et indique s'il est cohérent avec un indice de Moran global du département de +0.72.",
        formula: {
          label: "Retard spatial (spatial lag) simple",
          formula: "lag(X) = moyenne des valeurs des voisins directs de X",
        },
        dataset: {
          headers: ["Voisin", "1", "2", "3", "4"],
          rows: [["Taux de chômage (%)", "10", "14", "11", "9"]],
        },
        solutionText: "Le retard spatial (11 %) est très proche de la valeur propre de la commune (12 %) : cohérent avec une forte autocorrélation spatiale positive.",
        solutionItems: [
          "lag(X) = (10 + 14 + 11 + 9) / 4 = 11 %.",
          "11 % est très proche des 12 % de la commune X elle-même : ses voisins lui ressemblent, exactement ce qu'un indice de Moran de +0.72 (fort regroupement) laisse attendre.",
        ],
      },
      {
        level: "approfondissement",
        diagram: { name: "variogram", caption: "Anatomie d'un variogramme (nugget, sill, range) — le vocabulaire à retrouver dans les valeurs de l'énoncé." },
        prompt:
          "À partir de ce variogramme expérimental (distance vs semi-variance), identifie approximativement le nugget, le palier (sill) et la portée (range). Explique en une phrase ce que la portée signifie pour la carte d'incertitude produite par krigeage.",
        dataset: {
          headers: ["Distance (m)", "0", "500", "1 000", "2 000", "3 000", "5 000", "8 000"],
          rows: [["Semi-variance γ", "0", "0.8", "1.5", "2.6", "3.0", "3.05", "3.02"]],
        },
        solutionText: "Nugget ≈ 0, palier (sill) ≈ 3.0, portée (range) ≈ 3 000 m.",
        solutionItems: [
          "Nugget ≈ 0 (valeur à distance nulle quasi nulle) : peu de bruit/variabilité à très courte distance.",
          "Palier (sill) ≈ 3.0 à 3.05 : plafond atteint dès 3 000-5 000 m, la courbe ne progresse quasiment plus après.",
          "Portée (range) ≈ 3 000 m : au-delà de cette distance, deux points n'apportent plus d'information corrélée l'un sur l'autre — un point à estimer à plus de 3 000 m de toute observation aura une variance de krigeage nettement plus élevée.",
        ],
      },
    ],
  },
  "traitements-ia": {
    title: "Exercices : L'Intelligence",
    intro: "Trois exercices avec un vrai calcul à faire, à partir d'un jeu de données à chaque fois.",
    exercises: [
      {
        level: "superieur",
        diagram: { name: "classification-methods", caption: "Les méthodes de classification qui produisent ce genre de matrice de confusion." },
        prompt:
          "À partir de cette matrice de confusion (100 pixels, classification forêt / non-forêt), calcule Po, Pe puis le kappa. Commente le résultat.",
        formula: {
          label: "Kappa de Cohen",
          formula: "κ = (Po − Pe) / (1 − Pe)",
          note: "Po = précision observée. Pe = précision attendue par hasard, à partir des totaux marge de la matrice.",
        },
        dataset: {
          headers: ["", "Prédit : Forêt", "Prédit : Non-forêt"],
          rows: [
            ["Réel : Forêt", "42", "8"],
            ["Réel : Non-forêt", "5", "45"],
          ],
        },
        solutionText: "κ ≈ 0.74 : un accord \"substantiel\", mais pas encore \"quasi parfait\" — Pe est déjà élevé car les deux classes sont proches de 50/50.",
        solutionItems: [
          "Po = (42 + 45) / 100 = 0.87.",
          "Totaux marge : réel forêt = 50, réel non-forêt = 50 ; prédit forêt = 47, prédit non-forêt = 53.",
          "Pe = (50 × 47 + 50 × 53) / 100² = (2 350 + 2 650) / 10 000 = 0.50.",
          "κ = (0.87 − 0.50) / (1 − 0.50) = 0.37 / 0.50 = 0.74.",
        ],
      },
      {
        level: "lycee",
        prompt:
          "À partir de ce suivi précision train/test par époque, identifie l'époque à partir de laquelle le sur-apprentissage démarre clairement, en justifiant par les chiffres (écart train − test).",
        dataset: {
          headers: ["Époque", "10", "30", "60", "100"],
          rows: [
            ["Précision train", "72 %", "85 %", "94 %", "99 %"],
            ["Précision test", "70 %", "80 %", "78 %", "61 %"],
          ],
        },
        solutionText: "Le sur-apprentissage démarre nettement après l'époque 30 : au-delà, train et test cessent de progresser ensemble.",
        solutionItems: [
          "Écart train − test : époque 10 → 2 pts, époque 30 → 5 pts, époque 60 → 16 pts, époque 100 → 38 pts.",
          "Jusqu'à l'époque 30, les deux courbes progressent ensemble (écart faible et stable). Après, le train continue de monter pendant que le test régresse : c'est la signature du sur-apprentissage.",
        ],
      },
      {
        level: "approfondissement",
        diagram: { name: "iou", caption: "IoU = aire d'intersection / aire d'union — le rapport que ce kappa gonflé masque ici." },
        prompt:
          "Sur cette matrice de confusion pour une segmentation de bâtiments (10 000 pixels), calcule l'IoU du bâtiment, puis le kappa classique (Po, Pe). Pourquoi les deux résultats divergent-ils autant, et lequel des deux est le plus honnête ici ?",
        formula: {
          label: "IoU (Intersection over Union)",
          formula: "IoU = TP / (TP + FP + FN)",
        },
        dataset: {
          headers: ["", "Valeur"],
          rows: [
            ["TP (bâtiment correctement prédit)", "340"],
            ["FP (faux positif)", "60"],
            ["FN (faux négatif)", "90"],
            ["TN (fond correctement prédit)", "9 510"],
          ],
        },
        solutionText: "IoU ≈ 0.69 (recouvrement décent, pas parfait) alors que κ ≈ 0.81 (\"quasi parfait\") : le kappa est gonflé par l'immense majorité de pixels de fond correctement classés, l'IoU reste le plus honnête ici.",
        solutionItems: [
          "IoU = 340 / (340 + 60 + 90) = 340 / 490 ≈ 0.69.",
          "Po = (340 + 9 510) / 10 000 = 0.985.",
          "Totaux marge : réel bâtiment = 430, réel non-bâtiment = 9 570 ; prédit bâtiment = 400, prédit non-bâtiment = 9 600.",
          "Pe = (430 × 400 + 9 570 × 9 600) / 10 000² ≈ 0.920 → κ = (0.985 − 0.920) / (1 − 0.920) ≈ 0.81.",
          "Le kappa se concentre sur l'ensemble des 10 000 pixels, dominé par le fond ; l'IoU se concentre uniquement sur l'objet d'intérêt (le bâtiment), ce qui révèle un recouvrement bien moins impressionnant que ne le laisse croire le kappa.",
        ],
      },
    ],
  },
  methodologie: {
    title: "Exercices : La Méthode",
    intro: "Trois exercices concrets : classer un vrai jeu de données, rédiger à partir de chiffres réels, corriger un texte.",
    exercises: [
      {
        prompt:
          "Classe ces 5 communes en 3 classes par la méthode des quantiles (des effectifs aussi égaux que possible par classe), puis propose une palette adaptée à ce type de donnée (justifie teinte vs valeur).",
        dataset: {
          headers: ["Commune", "Population"],
          rows: [
            ["A", "1 200"],
            ["B", "3 400"],
            ["C", "800"],
            ["D", "15 000"],
            ["E", "2 100"],
          ],
        },
        solutionText: "Classes (tri croissant, effectifs 2/2/1) : {C, A} faible, {E, B} moyenne, {D} forte — palette en dégradé de valeur d'une seule teinte, pas de couleurs qualitatives.",
        solutionItems: [
          "Tri croissant : C (800), A (1 200), E (2 100), B (3 400), D (15 000).",
          "Classe faible : C, A (800-1 200). Classe moyenne : E, B (2 100-3 400). Classe forte : D (15 000), isolée par sa valeur très supérieure aux autres.",
          "La population est une donnée quantitative ordonnée : une palette en dégradé de valeur (clair → foncé) d'une seule teinte, pas des couleurs qualitatives sans ordre perceptif.",
        ],
      },
      {
        prompt:
          "Une zone industrielle de 40 ha a été installée à 800 m d'un port ; le trafic de poids lourds a augmenté de 35 % depuis son ouverture. À partir de ces deux chiffres, rédige une phrase de description (le fait observé, chiffré) puis une phrase d'analyse (la mise en relation causale).",
        solutionText: "Description = uniquement le fait mesuré et localisé ; analyse = l'interprétation causale, avec sa part d'hypothèse.",
        solutionItems: [
          "Description : \"Une zone industrielle de 40 ha a été implantée à 800 m du port ; le trafic de poids lourds y a augmenté de 35 % depuis son ouverture.\"",
          "Analyse : \"Cette hausse du trafic s'explique probablement par la proximité choisie avec le port, qui facilite l'import de matières premières et l'export de produits finis vers la zone industrielle.\"",
          "Le second niveau (la mise en relation causale, avec sa prudence — \"probablement\") est ce qui distingue un commentaire noté haut d'une simple énumération de chiffres.",
        ],
      },
      {
        prompt:
          "Sépare ce paragraphe en une section Résultats (uniquement le fait mesuré) et une section Discussion (l'interprétation), et explique en une phrase pourquoi le mélanger tel quel pose problème : \"Le NDVI moyen de la parcelle a chuté de 0.62 à 0.31 entre juin et août, ce qui prouve que la parcelle souffre d'un stress hydrique sévère lié à la sécheresse estivale.\"",
        solutionText: "Le mot \"prouve\" présente une interprétation comme un fait établi, alors que le NDVI seul ne peut que suggérer une cause, pas la démontrer.",
        solutionItems: [
          "Résultats : \"Le NDVI moyen de la parcelle a chuté de 0.62 à 0.31 entre juin et août.\"",
          "Discussion : \"Cette baisse suggère un stress hydrique sévère, probablement lié à la sécheresse estivale — hypothèse plausible mais non démontrée par le seul NDVI, qui ne mesure pas directement l'eau disponible dans le sol.\"",
          "Le paragraphe initial fait passer une hypothèse (\"ce qui prouve\") pour un résultat établi : mélanger les deux niveaux masque au lecteur ce qui a été réellement mesuré et ce qui relève de l'interprétation de l'auteur.",
        ],
      },
    ],
  },
  "projections-avancees": {
    title: "Exercices : Les Projections",
    intro: "Trois exercices avec un vrai calcul ou une vraie lecture de données à faire.",
    exercises: [
      {
        level: "lycee",
        diagram: { name: "tissot-distortion", caption: "Indicatrices de Tissot : la même déformation d'aire, visible ici sous Mercator, que révèle le calcul Afrique/Groenland." },
        prompt:
          "Calcule le ratio de surface réelle Afrique/Groenland, puis le ratio de leur surface apparente sur une carte Mercator. Compare les deux ratios et quantifie l'ampleur de la déformation.",
        dataset: {
          headers: ["Territoire", "Surface réelle (km²)", "Surface apparente sur la carte Mercator (unités arbitraires)"],
          rows: [
            ["Groenland", "2 166 000", "830"],
            ["Afrique", "30 370 000", "870"],
          ],
        },
        solutionText: "L'Afrique est 14 fois plus grande en réalité, mais apparaît à peine 1.05 fois plus grande sur la carte : la déformation fausse le rapport visuel d'un facteur ≈ 13.3.",
        solutionItems: [
          "Ratio réel : 30 370 000 / 2 166 000 ≈ 14.0.",
          "Ratio apparent sur la carte : 870 / 830 ≈ 1.05.",
          "14.0 / 1.05 ≈ 13.3 : la carte Mercator sous-représente le rapport réel de surface d'un facteur supérieur à 13.",
        ],
      },
      {
        level: "superieur",
        prompt:
          "Calcule la moyenne et l'écart-type du décalage mesuré entre deux couches SIG, à ces 4 points de la carte. Ce profil (valeurs proches, même direction partout) confirme-t-il plutôt un problème de datum ou de projection ?",
        dataset: {
          headers: ["Point", "1", "2", "3", "4"],
          rows: [
            ["Décalage mesuré (m)", "198", "203", "195", "201"],
            ["Direction", "NE", "NE", "NE", "NE"],
          ],
        },
        solutionText: "Moyenne ≈ 199 m, écart-type ≈ 3 m : un décalage très homogène partout — la signature typique d'un problème de datum, pas de projection.",
        solutionItems: [
          "Moyenne = (198 + 203 + 195 + 201) / 4 = 199.25 m.",
          "Écart-type ≈ 3.0 m (variance = Σ(écart à la moyenne)² / 4 ≈ 9.19, racine ≈ 3.03).",
          "Un décalage aussi homogène en amplitude et en direction sur toute la carte est la signature d'une translation quasi constante (confusion de datum) — une déformation de projection varierait nettement selon la position sur la carte.",
        ],
      },
      {
        level: "approfondissement",
        diagram: { name: "tissot-distortion", caption: "La déformation croît avec l'éloignement au parallèle standard — exactement le phénomène chiffré ici pour la Scandinavie." },
        prompt:
          "À partir de ce tableau de déformation d'échelle de Lambert-93 selon la latitude, à partir de quelle latitude environ la déformation dépasse 2 %, et qu'est-ce que ça implique pour une carte couvrant la Scandinavie (60-70°N) en Lambert-93 ?",
        dataset: {
          headers: ["Latitude", "44°N (parallèle standard)", "46.5°N (centre)", "49°N (parallèle standard)", "60°N", "75°N"],
          rows: [["Déformation d'échelle", "0.0 %", "-0.02 %", "0.0 %", "+2.1 %", "+9.8 %"]],
        },
        solutionText: "La déformation dépasse déjà 2 % dès 60°N : une carte Scandinavie en Lambert-93 accumulerait plusieurs pourcents d'erreur d'échelle, inacceptable pour un usage précis hors du territoire français pour lequel il est calé.",
      },
    ],
  },
  "cartographie-web": {
    title: "Exercices : Le Web",
    intro: "Trois exercices avec un vrai calcul ou une vraie lecture de données à faire.",
    exercises: [
      {
        level: "lycee",
        diagram: { name: "tile-pyramid", caption: "Pyramide de tuiles : chaque niveau de zoom quadruple le nombre de tuiles du niveau précédent." },
        prompt:
          "Une carte web affiche 4 tuiles au zoom 1. Combien de tuiles couvrent le monde entier au zoom 5 ? Si l'écran n'affiche à l'instant qu'une zone de 3×2 tuiles, quel est le ratio tuiles chargées / tuiles disponibles à ce zoom ?",
        formula: {
          label: "Nombre de tuiles couvrant le monde à un niveau de zoom z",
          formula: "N = 4^z",
        },
        solutionText: "1 024 tuiles disponibles au zoom 5 ; seules 6 sont réellement chargées pour un écran de 3×2 tuiles, soit un ratio de 0.6 %.",
        solutionItems: [
          "N = 4^5 = 1 024 tuiles couvrant le monde entier à ce zoom.",
          "Écran de 3×2 = 6 tuiles chargées sur 1 024 disponibles ≈ 0.59 %.",
          "Seule une petite fraction des tuiles existantes est chargée à un instant donné — celle correspondant à la zone réellement visible à l'écran.",
        ],
      },
      {
        level: "superieur",
        prompt:
          "Pour passer du style clair au style sombre d'une même carte, combien de Ko doivent être re-téléchargés en tuiles raster (nouvelle image) contre en tuiles vectorielles (même géométrie, juste le style qui change) ? Chiffre le gain.",
        dataset: {
          headers: ["Style", "Taille d'une tuile raster (Ko)", "Taille d'une tuile vecteur (Ko)"],
          rows: [
            ["Clair", "45", "12"],
            ["Sombre", "45 (nouvelle image)", "12 (même fichier, juste le style CSS change)"],
          ],
        },
        solutionText: "45 Ko à re-télécharger par tuile en raster, contre 0 Ko en vecteur : un gain de bande passante de 100 % sur le changement de style.",
        solutionItems: [
          "Raster : chaque tuile sombre est une image différente de la tuile claire → 45 Ko à re-télécharger par tuile changée.",
          "Vecteur : la géométrie déjà chargée ne change pas, seul le style de rendu côté client change → 0 Ko de re-téléchargement.",
        ],
      },
      {
        level: "approfondissement",
        prompt:
          "Un développeur charge un fichier GeoJSON de 80 000 sommets sur une carte Leaflet, qui devient saccadée. Le budget technique visé est de moins de 10 000 sommets pour rester fluide sur mobile. D'après ce tableau, quelle tolérance de simplification Douglas-Peucker choisir au minimum, et quel compromis faut-il surveiller si elle est trop grande ?",
        dataset: {
          headers: ["Tolérance (m)", "0 (brut)", "5", "20", "50", "100"],
          rows: [["Sommets restants", "80 000", "42 000", "9 500", "2 100", "480"]],
        },
        solutionText: "Une tolérance de 20 m (9 500 sommets) est le minimum qui passe sous le budget de 10 000 — au-delà, la simplification risque de déformer visiblement les formes.",
        solutionItems: [
          "20 m est la plus petite tolérance du tableau qui descend sous 10 000 sommets (9 500), donc celle qui préserve le plus de détail tout en respectant le budget.",
          "Des tolérances plus grandes (50 m, 100 m) libéreraient encore plus de sommets mais au prix d'une simplification excessive : les formes réelles peuvent alors se déformer visiblement, un compromis à valider à l'œil, pas seulement par le compte de sommets.",
        ],
      },
    ],
  },
  "statistiques-spatiales": {
    title: "Exercices : Les Statistiques",
    intro: "Trois exercices avec un vrai jeu de données à lire et interpréter.",
    exercises: [
      {
        level: "superieur",
        diagram: { name: "lisa-quadrant", caption: "Le quadrant HH (haut entouré de haut) regroupe les communes formant un vrai cluster chaud, comme les voisines de cet énoncé." },
        prompt:
          "Un indice de Moran global sur le taux de départs de feu par commune vaut +0.65, significatif. Le maire d'une commune isolée demande si sa commune est concernée. À partir de ces z-scores Gi* (significatif si |z| > 1.96), la commune du maire fait-elle partie d'un cluster à risque ? Et ses 4 communes voisines ?",
        dataset: {
          headers: ["Commune", "Gi* (z-score)"],
          rows: [
            ["Commune du maire", "-0.3"],
            ["Voisine 1", "+2.8"],
            ["Voisine 2", "+3.1"],
            ["Voisine 3", "+2.4"],
            ["Voisine 4", "-2.6"],
          ],
        },
        solutionText: "La commune du maire (z = -0.3) n'appartient à aucun cluster significatif ; trois de ses voisines forment un vrai cluster chaud (HH) juste à côté, et une quatrième un cluster froid distinct.",
        solutionItems: [
          "Commune du maire : |z| = 0.3 < 1.96 → non significatif, ni cluster ni anomalie, valeur proche de ce qu'on attendrait au hasard.",
          "Voisines 1, 2, 3 (z = 2.8, 3.1, 2.4) : significativement positives → cluster chaud (HH) local.",
          "Voisine 4 (z = -2.6) : significativement négative → cluster froid (LL) ou anomalie locale, à examiner séparément.",
          "Réponse honnête au maire : sa commune elle-même n'est pas dans le cluster détecté, même si un cluster existe juste à côté — l'indice global de Moran ne permet pas cette précision, seul un indicateur local (Gi*/LISA) le peut.",
        ],
      },
      {
        level: "approfondissement",
        prompt:
          "La zone A a la densité KDE visuelle la plus intense sur la carte, presque autant que B. D'après ce tableau, A est-elle statistiquement significative comme B ? Que ça montre sur la lecture d'une carte KDE seule ?",
        dataset: {
          headers: ["Zone", "Densité KDE (relative)", "Gi* (z-score)", "Significatif ?"],
          rows: [
            ["A (rouge vif visuel)", "0.92", "1.1", "Non"],
            ["B", "0.88", "2.7", "Oui"],
            ["C", "0.40", "0.2", "Non"],
            ["D", "0.35", "-2.9", "Oui (froid)"],
          ],
        },
        solutionText: "A n'est pas significative (z = 1.1) malgré une densité KDE quasi identique à B, qui l'est (z = 2.7) : l'intensité visuelle d'une KDE ne distingue pas une vraie concentration statistique d'un simple effet de lissage.",
      },
      {
        level: "approfondissement",
        prompt:
          "Un modèle OLS classique et un modèle spatial (spatial lag) obtiennent ces résultats sur les mêmes données. Lequel choisir, et pourquoi le R² plus élevé de l'OLS est-il trompeur ici ?",
        dataset: {
          headers: ["Modèle", "R²", "Moran des résidus", "p-value du coefficient revenu"],
          rows: [
            ["OLS classique", "0.81", "+0.58 (p < 0.01)", "0.003"],
            ["Spatial lag", "0.79", "+0.06 (p = 0.41)", "0.041"],
          ],
        },
        solutionText: "Le modèle spatial est le bon choix, malgré son R² légèrement inférieur : les résidus de l'OLS sont fortement autocorrélés spatialement, ce qui gonfle artificiellement sa confiance apparente.",
        solutionItems: [
          "Le Moran des résidus OLS (+0.58, très significatif) trahit une autocorrélation spatiale non capturée par le modèle : l'hypothèse d'indépendance des résidus (nécessaire à l'OLS classique) est violée.",
          "Cette autocorrélation gonfle artificiellement le R² et sous-estime les p-values de l'OLS — sa précision affichée (0.81, p = 0.003) est trompeuse.",
          "Le modèle spatial, dont les résidus sont proches de l'indépendance (Moran = 0.06, non significatif), donne une estimation plus honnête même si numériquement \"moins bonne\" en apparence (R² = 0.79, p = 0.041, mais encore significatif à 5 %).",
        ],
      },
    ],
  },
  "photogrammetrie-drones": {
    title: "Exercices : Le Drone",
    intro: "Trois exercices avec un vrai calcul à faire, à partir d'un jeu de données à chaque fois.",
    exercises: [
      {
        level: "superieur",
        diagram: { name: "flight-overlap", caption: "Recouvrement longitudinal entre deux photos successives — la géométrie derrière le calcul d'avancement demandé ici." },
        prompt:
          "Chaque photo d'un drone couvre 120 m dans le sens du vol × 80 m en travers. Pour couvrir une bande de 800 m de long, calcule le nombre de photos nécessaires à 80 % de recouvrement longitudinal, puis à 40 %. Quel pourcentage de photos est économisé au recouvrement réduit, et quel risque déjà identifié ce gain fait-il courir ?",
        formula: {
          label: "Avancement utile entre deux photos successives",
          formula: "avancement = longueur de la photo × (1 − recouvrement)",
        },
        solutionText: "À 40 % de recouvrement, environ 65 % de photos en moins qu'à 80 % — mais c'est exactement la configuration qui risque de laisser des zones non vues sous deux angles, donc des trous dans la reconstruction 3D.",
        solutionItems: [
          "80 % : avancement = 120 × (1 − 0.8) = 24 m/photo → 800 / 24 ≈ 34 photos.",
          "40 % : avancement = 120 × (1 − 0.4) = 72 m/photo → 800 / 72 ≈ 12 photos.",
          "Économie : (34 − 12) / 34 ≈ 65 % de photos en moins.",
          "Ce gain de temps/batterie est exactement le compromis dangereux identifié en cours : sous 70-80 % de recouvrement, des zones risquent de n'être vues que sous un seul angle, donc impossibles à reconstruire en 3D.",
        ],
      },
      {
        level: "lycee",
        prompt:
          "Sur un même chantier, calcule le facteur d'amélioration de précision (combien de fois plus précis) apporté par l'ajout de 5 points d'appui au sol (GCP), en planimétrie et en altimétrie.",
        dataset: {
          headers: ["Configuration", "Erreur planimétrique moyenne (m)", "Erreur altimétrique moyenne (m)"],
          rows: [
            ["Sans GCP (SfM seule)", "3.8", "6.2"],
            ["Avec 5 GCP bien répartis", "0.04", "0.06"],
          ],
        },
        solutionText: "Les GCP améliorent la précision d'un facteur ≈ 95 en planimétrie et ≈ 103 en altimétrie.",
        solutionItems: [
          "Planimétrie : 3.8 / 0.04 = 95.",
          "Altimétrie : 6.2 / 0.06 ≈ 103.",
          "La SfM seule produit une géométrie cohérente en interne, mais son calage absolu en position/échelle réelle dépend presque entièrement des GCP.",
        ],
      },
      {
        level: "approfondissement",
        diagram: { name: "lidar-returns", caption: "Retours multiples d'un pulse LiDAR sous couvert dense : la part qui atteint encore le sol, contrairement à un pixel photo." },
        prompt:
          "À partir de ce tableau, en forêt dense, la photogrammétrie voit-elle encore le sol ? Que ça implique pour la fiabilité comparée du MNT photogrammétrique et du MNT LiDAR sous couvert dense ?",
        dataset: {
          headers: ["Type de couvert", "% pulses LiDAR atteignant le sol", "% pixels photo voyant directement le sol"],
          rows: [
            ["Prairie ouverte", "92 %", "95 %"],
            ["Forêt claire", "58 %", "10 %"],
            ["Forêt dense", "21 %", "0 %"],
          ],
        },
        solutionText: "En forêt dense, la photogrammétrie ne voit jamais directement le sol (0 %) alors que le LiDAR y parvient encore, quoique dégradé (21 %) : le MNT photogrammétrique y est purement estimé, le LiDAR reste seul réellement mesuré.",
      },
    ],
  },
  lidar: {
    title: "Exercices : Le LiDAR",
    intro: "Trois exercices avec un vrai calcul ou une vraie manipulation à faire, à partir d'un jeu de données.",
    exercises: [
      {
        level: "lycee",
        diagram: { name: "lidar-returns", caption: "Un pulse laser part, touche une surface, revient : le temps de vol aller-retour mesuré ici." },
        prompt: "Un pulse LiDAR aller-retour met 6,68 microsecondes à revenir au capteur. Calcule la distance mesurée (c ≈ 3×10⁸ m/s).",
        formula: {
          label: "Distance mesurée par temps de vol",
          formula: "d = (c × t) / 2",
        },
        solutionText: "d = (c × t) / 2 = (3×10⁸ × 6,68×10⁻⁶) / 2 = 2004 / 2 = 1002 m, soit environ 1000 m — une distance de vol aéroporté classique.",
      },
      {
        level: "superieur",
        prompt:
          "Un relevé LiDAR annonce une densité brute de 10 points/m² partout. Complète la densité de points classés \"sol\" pour chaque zone, à partir du pourcentage de pulses réellement classés sol. Le MNT reste-t-il exploitable en forêt dense avec cette densité ?",
        dataset: {
          headers: ["Zone", "Densité brute (pts/m²)", "% classés \"sol\"", "Densité sol effective (pts/m²)"],
          rows: [
            ["Prairie", "10", "85 %", "?"],
            ["Forêt claire", "10", "35 %", "?"],
            ["Forêt dense", "10", "9 %", "?"],
          ],
        },
        solutionText: "Densité sol effective : 8.5 (prairie), 3.5 (forêt claire), 0.9 (forêt dense) — sous 1 pt/m², le maillage d'interpolation manque régulièrement de points sol, ce qui explique un MNT lacunaire malgré une densité brute annoncée identique partout.",
        solutionItems: [
          "Prairie : 10 × 0.85 = 8.5 pts/m².",
          "Forêt claire : 10 × 0.35 = 3.5 pts/m².",
          "Forêt dense : 10 × 0.09 = 0.9 pt/m² — sous le seuil d'1 point par cellule typique d'une grille MNT à 0.5-1 m de pas.",
        ],
      },
      {
        level: "superieur",
        prompt:
          "Remets dans le bon ordre les 4 étapes du processus de génération d'une orthophoto colorée à partir d'un relevé LiDAR + caméra embarquée : \"texturation du nuage de points avec les photos\" / \"acquisition simultanée du nuage de points et des photos RVB géoréférencées\" / \"calibration relative caméra/LiDAR (bras de levier)\" / \"projection finale en orthophoto 2D\".",
        solutionText: "Ordre correct : calibration relative caméra/LiDAR → acquisition simultanée → texturation du nuage de points → projection finale en orthophoto 2D.",
        solutionItems: [
          "1. Calibration relative caméra/LiDAR (bras de levier) : sans elle, impossible de savoir quel pixel photo correspond à quel point du nuage.",
          "2. Acquisition simultanée du nuage de points et des photos RVB géoréférencées, en vol.",
          "3. Texturation du nuage de points avec les photos, une fois la calibration et l'acquisition faites.",
          "4. Projection finale en orthophoto 2D du nuage désormais coloré.",
        ],
      },
    ],
  },
  "bases-donnees-spatiales": {
    title: "Exercices : La Base",
    intro: "Trois exercices avec un vrai plan d'exécution ou un vrai jeu de données à lire.",
    exercises: [
      {
        level: "superieur",
        diagram: { name: "spatial-index-tree", caption: "Un index spatial GiST organise les géométries en arbre pour éviter le balayage complet — celui que l'EXPLAIN ANALYZE ci-dessous révèle absent." },
        prompt:
          "Voici un extrait résumé d'un EXPLAIN ANALYZE sur une requête ST_Intersects portant sur 3 millions de parcelles. L'index spatial GiST est-il utilisé ? Que faut-il vérifier ensuite ?",
        dataset: {
          headers: ["Plan d'exécution", "Lignes balayées", "Temps réel"],
          rows: [["Seq Scan on parcelles (Filter: st_intersects(geom, ...))", "3 000 000", "48 200 ms"]],
        },
        solutionText: "Non — \"Seq Scan\" signifie que PostgreSQL a balayé toute la table, l'index GiST n'a pas été utilisé ici (qu'il existe ou non).",
        solutionItems: [
          "\"Seq Scan\" = balayage séquentiel complet de la table : c'est l'opposé d'un \"Index Scan\", qui indiquerait l'usage réel de l'index.",
          "À vérifier ensuite : l'index GiST existe-t-il réellement sur la colonne géométrique (\\d sur la table) ; si oui, pourquoi le planificateur l'ignore (statistiques obsolètes → relancer ANALYZE, ou une expression dans la clause WHERE qui empêche son usage, cf. exercice suivant).",
        ],
      },
      {
        level: "superieur",
        prompt:
          "Une requête filtre `WHERE ST_Transform(a.geom, 2154) && b.geom`. Une deuxième version pré-calcule la reprojection dans une colonne dédiée (`a.geom_2154 && b.geom`). Calcule le facteur d'accélération obtenu.",
        dataset: {
          headers: ["Version de la requête", "Plan d'exécution", "Temps réel"],
          rows: [
            ["ST_Transform(a.geom, 2154) && b.geom", "Seq Scan", "48.2 s"],
            ["a.geom_2154 && b.geom (colonne pré-calculée)", "Index Scan using idx_geom", "0.09 s"],
          ],
        },
        solutionText: "48.2 / 0.09 ≈ 536 fois plus rapide : sortir la reprojection de la clause WHERE (la stocker en amont) laisse l'index spatial réellement utilisable.",
      },
      {
        level: "approfondissement",
        prompt:
          "Calcule le taux de chevauchement (%) pour chacun de ces deux exports Shapefile. Pourquoi le jeu PostGIS Topology affiche-t-il 0, et ce 0 est-il comparable aux deux autres taux ?",
        dataset: {
          headers: ["Source", "Nb parcelles", "Chevauchements détectés"],
          rows: [
            ["Shapefile export 2010", "45 000", "312"],
            ["Shapefile export 2020", "52 000", "89"],
            ["PostGIS Topology (actuel)", "58 000", "0 (bloqués à la saisie)"],
          ],
        },
        solutionText: "2010 : ≈ 0.69 % de chevauchement. 2020 : ≈ 0.17 %. Le 0 % de PostGIS Topology n'est pas comparable au même titre : ce n'est pas \"0 malgré tout\", c'est structurellement empêché à la saisie.",
        solutionItems: [
          "2010 : 312 / 45 000 ≈ 0.69 %.",
          "2020 : 89 / 52 000 ≈ 0.17 % — amélioration réelle, mais pas 0.",
          "Les deux taux Shapefile mesurent des erreurs découvertes après coup sur des fichiers qui ne vérifient structurellement rien à l'écriture. Le 0 % PostGIS Topology mesure l'absence de la classe même d'erreur, empêchée dès l'enregistrement — pas le même type de résultat, même si le chiffre est plus bas.",
        ],
      },
    ],
  },
  "etudes-de-cas-sectorielles": {
    title: "Exercices : Les Secteurs",
    intro: "Trois exercices : croiser un vrai jeu de données pour trancher un cas concret.",
    exercises: [
      {
        level: "superieur",
        diagram: { name: "ndvi-scale", caption: "Un NDVI quasi identique en surface peut cacher des causes très différentes — le tableau ci-dessous en fait la démonstration." },
        prompt:
          "Ces 4 parcelles ont un NDVI quasi identique (0.40-0.43) en plein été. D'après le rendement historique et l'analyse de sol, laquelle a probablement une vigueur faible pour une cause structurelle (le sol) plutôt que ponctuelle (stress hydrique ou maladie de la saison en cours) ?",
        dataset: {
          headers: ["Parcelle", "NDVI", "Rendement historique (t/ha)", "Analyse de sol (profondeur)"],
          rows: [
            ["1", "0.42", "3.1", "Faible (25 cm)"],
            ["2", "0.41", "7.8", "Bonne (90 cm)"],
            ["3", "0.43", "4.0", "Bonne (85 cm)"],
            ["4", "0.40", "7.5", "Bonne (95 cm)"],
          ],
        },
        solutionText: "La parcelle 1 : rendement historique nettement plus faible et sol peu profond, alors que son NDVI seul ne se distingue pas des 3 autres — cause structurelle, pas un stress ponctuel.",
        solutionItems: [
          "Rendement de la parcelle 1 (3.1 t/ha) très inférieur aux 3 autres (7-8 t/ha), et sol nettement moins profond (25 cm contre plus de 85 cm ailleurs).",
          "Or son NDVI (0.42) n'a rien d'anormal par rapport aux autres (0.40-0.43) : un NDVI unique de cette saison n'aurait jamais permis de la distinguer, seul le croisement avec le rendement historique et l'analyse de sol révèle la vraie cause, structurelle et non conjoncturelle.",
        ],
      },
      {
        level: "approfondissement",
        prompt:
          "Calcule le ΔNDBI brut entre 2010 et 2020 pour cette zone. Cette hausse est-elle fiable pour conclure à une artificialisation, vu les deux autres colonnes du tableau ?",
        dataset: {
          headers: ["Date", "Correction atmosphérique appliquée", "Indice d'humidité du sol", "NDBI moyen de la zone"],
          rows: [
            ["2010", "Non", "0.3", "0.12"],
            ["2020", "Oui", "0.7", "0.31"],
          ],
        },
        solutionText: "ΔNDBI = +0.19, mais ce chiffre n'est pas fiable tel quel : correction atmosphérique et humidité du sol diffèrent aussi fortement entre les deux dates, deux facteurs connus pour faire varier le NDBI indépendamment de tout changement réel du bâti.",
        solutionItems: [
          "ΔNDBI = 0.31 − 0.12 = +0.19.",
          "La correction atmosphérique n'a été appliquée qu'en 2020, et l'humidité du sol est très différente (0.3 vs 0.7) entre les deux dates.",
          "Sans harmoniser d'abord ces deux paramètres, le delta mesuré mélange artefact de traitement, effet d'humidité et vrai changement du bâti — impossible à démêler en l'état.",
        ],
      },
      {
        level: "approfondissement",
        diagram: { name: "risk-layers", caption: "Aléa × enjeux × vulnérabilité superposés : la même structure de pondération que ce tableau compare entre deux communes." },
        prompt:
          "Deux communes voisines pondèrent différemment aléa, enjeux et vulnérabilité pour leur priorisation du risque incendie, et obtiennent des cartes très différentes. À partir de ce tableau, la différence de pondération est-elle justifiable ? Que faudrait-il documenter pour l'auditer ?",
        dataset: {
          headers: ["Composante", "Poids — Commune A (habitat isolé en forêt)", "Poids — Commune B (urbain dense)"],
          rows: [
            ["Aléa", "30 %", "20 %"],
            ["Enjeux", "20 %", "50 %"],
            ["Vulnérabilité", "50 %", "30 %"],
          ],
        },
        solutionText: "Oui, potentiellement justifiable : chaque pondération est cohérente avec le contexte de sa commune — mais ce n'est vérifiable qu'en documentant explicitement le pourquoi de chaque poids.",
        solutionItems: [
          "Commune A pondère fortement la vulnérabilité (50 %), cohérent avec un habitat isolé en forêt, plus exposé et moins facile à évacuer.",
          "Commune B pondère fortement les enjeux (50 %), cohérent avec une forte densité d'enjeux urbains à protéger.",
          "À documenter pour auditer : la justification explicite de chaque poids (pourquoi 50 % et pas 40 %), la méthode utilisée pour les fixer (dire d'expert, AHP...), et idéalement une analyse de sensibilité montrant que le classement final ne dépend pas de façon fragile d'un choix de pondération arbitraire.",
        ],
      },
    ],
  },
}
