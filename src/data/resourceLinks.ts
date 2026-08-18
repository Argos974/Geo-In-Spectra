export interface ResourceLink {
  to: string
  label: string
  description: string
}

/**
 * Onglet mutualisé (visible depuis Discipulus ET Magister) : ces six ressources
 * servent aussi bien à réviser qu'à préparer un cours — pas de raison de les
 * dupliquer ou de les réserver à un seul profil. Parcours conseillés et Bilan de
 * progression n'en font pas partie : ce sont des outils Discipulus (guide de
 * lecture, suivi personnel), pas des ressources de référence.
 */
export const RESOURCE_LINKS: ResourceLink[] = [
  { to: "/glossaire", label: "Glossaire", description: "Tout terme technique employé dans le site, avec un renvoi vers le chapitre qui l'introduit." },
  { to: "/references", label: "Références", description: "Bibliographie et sources citées à travers les cours." },
  { to: "/formulaire", label: "Formulaire", description: "Formules et indices, condensés pour révision ou usage rapide en cours." },
  { to: "/jeux-de-donnees", label: "Jeux de données", description: "Données réelles (Vitrolles) pour les exercices, l'Atelier et vos propres séances." },
  { to: "/pieges-frequents", label: "Pièges fréquents", description: "Erreurs récurrentes constatées, par thème, utile pour réviser comme pour anticiper en classe." },
  { to: "/annales", label: "Annales de concours", description: "Sujets travaillés, pour s'entraîner ou construire une évaluation." },
]
