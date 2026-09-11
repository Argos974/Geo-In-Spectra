"""Genere les medaillons detoures pour les reperes "tableau vivant" du site
(src/data/artworkHotspots.ts) -- une entree par JOB/DUO_JOBS, une par oeuvre
et par personnage. Remplace scripts/generate-hero-cutouts.py (limite a
L'Ecole d'Athenes), desormais supprime.

Detourage reel (segmentation par le modele U^2-Net, Apache 2.0) via rembg
(MIT) -- local/hors-ligne, aucune cle API, aucun cout. Explicitement
`new_session("u2net")`, pas le modele par defaut de rembg (bria-rmbg-2.0,
licence BRIA payante pour usage commercial).

Deux corrections systematiques apres segmentation :
- `keep_largest_component` (OpenCV) : ne garde que le plus grand blob
  connexe du canal alpha -- ecarte les fragments d'un AUTRE personnage voisin
  captes par erreur dans un cadrage genereux (verifie sur Platon/Aristote :
  une figure assise au premier plan gonflait sourceBox bien au-dela du corps
  reel). Applique AVANT `boost_alpha`, jamais apres : booster en premier
  reliait parfois deux blobs par une trainee de bruit franchissant le seuil
  de binarisation une fois amplifiee.
- `boost_alpha` : repousse les contours incertains vers l'opaque.

`FOOT_PATCHES` (optionnel, par job) : sur les zones a faible contraste avec
un fond clair (pieds nus/sandales contre du marbre, dans L'Ecole d'Athenes),
meme apres ce qui precede le modele reste a zero, pas juste peu confiant --
une petite ellipse locale reprend alors les pixels source tels quels. Une
segmentation GrabCut amorcee avec le masque comme prior echoue aussi sur ce
cas precis (sans ancrage "certainement fond" proche, elle englobe toute la
colonne) -- ce n'est pas une segmentation de secours generale, juste une
rustine pour cette zone precise si elle se reproduit sur une autre oeuvre.

Remplace une premiere tentative avec @imgly/background-removal-node (Node,
meme principe mais sous licence AGPL) -- ce script n'a aucune dependance
Node ; c'est un outil de generation d'assets ponctuel, jamais execute au
build ni embarque dans le site livre aux visiteurs.

Prerequis (environnement Python isole recommande) :
    python -m venv .venv-rembg
    .venv-rembg/Scripts/pip install "rembg[cpu]" pillow opencv-python-headless numpy   (Windows)
    .venv-rembg/bin/pip install "rembg[cpu]" pillow opencv-python-headless numpy         (macOS/Linux)

Usage : python scripts/generate-hotspot-cutouts.py [job_name ...]
  Sans argument : tous les jobs. Avec un ou plusieurs noms (ex. "hero-plato"),
  ne regenere que ceux-la -- utile pour ajuster un recadrage sans repasser sur
  tout. Affiche a la fin le `sourceBox` de chaque medaillon (coordonnees dans
  l'image source) -- a reporter dans src/data/artworkHotspots.ts pour que le
  medaillon reste superpose exactement a sa position dans l'oeuvre (voir
  ArtworkHotspot.tsx::useObjectCoverBox).
"""

from __future__ import annotations

import sys
from pathlib import Path

import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from rembg import new_session, remove

ROOT = Path(__file__).resolve().parent.parent
GALLERY_DIR = ROOT / "public/images/gallery"
OUT_DIR = GALLERY_DIR / "cutouts"

# Chaque JOB "solo" decoupe UNE region de l'image source, la segmente, et
# ecrit UN medaillon. Deux figures ADJACENTES qui se touchent (ex.
# Platon/Aristote, dont les mains se frolent) doivent partager un recadrage
# genereux -- separees, le modele perd le contexte necessaire pour distinguer
# tissu clair et fond clair (verifie : le drape bleu d'Aristote se confondait
# avec le ciel une fois seul) -- d'ou DUO_JOBS ci-dessous, qui recadre une
# seule fois puis redecoupe le resultat en deux avec Pillow. Sur les deux
# nouvelles oeuvres, les figures retenues sont assez distinctes entre elles
# pour un recadrage individuel (verifie a l'oeil avant d'ecrire ce fichier).
DUO_JOBS = [
    {
        "names": ("hero-plato", "hero-aristotle"),
        "src": "hero-school-of-athens.jpg",
        "box": (888, 603, 888 + 180, 603 + 445),
        "split_x": 88,
        "foot_patches": {
            "hero-plato": (27, 281, 61, 311),
            "hero-aristotle": (52, 281, 90, 309),  # 140 - split_x
        },
    },
]

JOBS = [
    # Vanitas (Edwaert Collier, 1662) : objets du decor plutot que personnages
    # -- remplace l'Orrery de Wright (repere par posture, correspondance faible
    # sur Progression/Revision, voir git history). Choisie sans crane (seule
    # version des vanites de Collier a en manquer un -- demande explicite).
    {
        # Le globe (haut de l'image) sort de la bande visible en object-cover
        # sur un bandeau large et court (70vh) -- verifie a l'ecran, voir la
        # meme mise en garde plus bas pour methodologie-scolaire. L'atlas
        # ouvert reste dans la bande sure et vaut mieux thematiquement de
        # toute facon (une vraie carte du monde, pas juste un globe).
        "name": "discipulus-hub-cours",
        "src": "discipulus-collier-vanitas.jpg",
        "box": (380, 460, 950, 1130),  # atlas ouvert (carte du monde)
    },
    {
        "name": "discipulus-hub-methodes",
        "src": "discipulus-collier-vanitas.jpg",
        "box": (990, 600, 1240, 1120),  # plume + encrier
    },
    {
        # Le sceau de cire (plus bas dans l'image) sort lui aussi de la bande
        # visible -- ce medaillon-montre reste dans la bande sure.
        "name": "discipulus-hub-progression",
        "src": "discipulus-collier-vanitas.jpg",
        "box": (820, 920, 1000, 1090),  # montre/medaillon a gousset
    },
    {
        "name": "discipulus-hub-revision",
        "src": "discipulus-collier-vanitas.jpg",
        "box": (1670, 400, 1910, 700),  # sablier
    },
    # Le vieux maitre d'ecole (d'apres Gerrit Dou, copie anonyme XIXe s. --
    # l'original de 1671, Gemaldegalerie Dresde, n'est pas librement
    # diffusable, voir la note en tete sur discipulus-hub) : des objets de
    # decor plutot que des personnages reperes par posture (remplace L'Ecole
    # de village de Steen, dont le seul Atelier tombait dans une zone trop
    # sombre pour la segmentation -- voir git history). Portrait (754x1000),
    # meme contrainte que l'ancienne oeuvre : bande sure verifiee ~y 350-650.
    {
        "name": "magister-hub-atelier",
        "src": "magister-dou-schoolmaster.jpg",
        "box": (150, 490, 360, 630),  # les mains + la plume + le canif
    },
    {
        "name": "magister-hub-pedagogie",
        "src": "magister-dou-schoolmaster.jpg",
        "box": (280, 370, 480, 560),  # le visage, le regard qui guide
    },
    {
        "name": "magister-hub-classe",
        "src": "magister-dou-schoolmaster.jpg",
        "box": (40, 430, 270, 560),  # le groupe d'eleves au fond
    },
    {
        # Sort partiellement de la bande sure (sablier ~y 635-720) -- le choix
        # le moins bien place du lot, faute d'un objet "Programme" mieux situe
        # dans cette moitie basse de l'image. A verifier a l'ecran.
        "name": "magister-hub-programme",
        "src": "magister-dou-schoolmaster.jpg",
        "box": (90, 600, 250, 740),  # le sablier
    },
    {
        # Sort de la bande sure (~y 690-770) -- meme reserve que ci-dessus,
        # aucun autre objet ne portait "Evaluation" dans la zone visible.
        "name": "magister-hub-evaluation",
        "src": "magister-dou-schoolmaster.jpg",
        "box": (130, 560, 280, 640),  # le livre ouvert pres de la main
    },
]


def boost_alpha(img: Image.Image, factor: float = 2.2, floor: int = 40) -> Image.Image:
    """Repousse les valeurs alpha intermediaires (contours incertains) vers
    l'opaque ; coupe le bruit proche de zero (`floor`) pour ne pas faire
    apparaitre de fond."""
    r, g, b, a = img.split()
    a = a.point(lambda v: 0 if v < floor else min(255, int(v * factor)))
    return Image.merge("RGBA", (r, g, b, a))


def keep_largest_component(img: Image.Image) -> Image.Image:
    """Ne garde que le plus grand blob connexe du canal alpha -- voir la note
    en tete de fichier (fragments d'un autre personnage voisin)."""
    r, g, b, a = img.split()
    alpha = np.array(a)
    binary = (alpha > 20).astype(np.uint8)
    num_labels, labels, stats, _ = cv2.connectedComponentsWithStats(binary, connectivity=8)
    if num_labels <= 1:
        return img
    areas = stats[1:, cv2.CC_STAT_AREA]
    largest_label = 1 + int(np.argmax(areas))
    new_alpha = np.where(labels == largest_label, alpha, 0).astype(np.uint8)
    return Image.merge("RGBA", (r, g, b, Image.fromarray(new_alpha)))


def apply_foot_patch(cutout: Image.Image, source_rgb: Image.Image, box: tuple[int, int, int, int]) -> Image.Image:
    """Force la zone `box` (repere local au job) a reprendre les pixels
    source (opaques), bord adouci. Voir la note en tete de fichier."""
    patch_mask = Image.new("L", cutout.size, 0)
    ImageDraw.Draw(patch_mask).ellipse(box, fill=255)
    patch_mask = patch_mask.filter(ImageFilter.GaussianBlur(2))
    return Image.composite(source_rgb.convert("RGBA"), cutout, patch_mask)


def run_job(job: dict, session) -> None:
    name = job["name"]
    src_path = GALLERY_DIR / job["src"]
    crop_box = job["box"]

    print(f"-> {name} : recadrage + segmentation...")
    crop = Image.open(src_path).convert("RGB").crop(crop_box)
    cutout = boost_alpha(keep_largest_component(remove(crop, session=session)))

    if "foot_patch" in job:
        cutout = apply_foot_patch(cutout, crop, job["foot_patch"])

    bbox = cutout.getbbox()
    trimmed = cutout.crop(bbox) if bbox else cutout
    trimmed.save(OUT_DIR / f"{name}.png")
    report_source_box(name, bbox, (crop_box[0], crop_box[1]))


def report_source_box(name: str, bbox: tuple[int, int, int, int] | None, origin: tuple[int, int]) -> None:
    if not bbox:
        print(f"   !! {name} : aucun contenu detoure -- verifier le recadrage")
        return
    left, top, right, bottom = bbox
    ox, oy = origin
    print(f"   {name}: sourceBox = {{ left: {ox + left}, top: {oy + top}, right: {ox + right}, bottom: {oy + bottom} }}")


def run_duo_job(job: dict, session) -> None:
    src_path = GALLERY_DIR / job["src"]
    crop_box = job["box"]
    split_x = job["split_x"]
    left_name, right_name = job["names"]
    foot_patches = job.get("foot_patches", {})

    print(f"-> {left_name} / {right_name} : recadrage + segmentation du duo...")
    duo = Image.open(src_path).convert("RGB").crop(crop_box)
    raw = remove(duo, session=session)
    width, height = raw.size

    for name, (x0, x1) in [(left_name, (0, split_x)), (right_name, (split_x, width))]:
        sub_source = duo.crop((x0, 0, x1, height))
        cutout = boost_alpha(keep_largest_component(raw.crop((x0, 0, x1, height))))
        if name in foot_patches:
            cutout = apply_foot_patch(cutout, sub_source, foot_patches[name])
        bbox = cutout.getbbox()
        trimmed = cutout.crop(bbox) if bbox else cutout
        trimmed.save(OUT_DIR / f"{name}.png")
        report_source_box(name, bbox, (crop_box[0] + x0, crop_box[1]))


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    requested = set(sys.argv[1:])
    duo_jobs = [j for j in DUO_JOBS if not requested or requested & set(j["names"])]
    jobs = [j for j in JOBS if not requested or j["name"] in requested]
    if not jobs and not duo_jobs:
        print("Aucun job ne correspond aux noms donnes.")
        return

    print("-> chargement du modele u2net (Apache 2.0)...")
    session = new_session("u2net")

    for job in duo_jobs:
        run_duo_job(job, session)
    for job in jobs:
        run_job(job, session)

    total = len(jobs) + 2 * len(duo_jobs)
    print(f"OK -- {total} medaillon(s) ecrit(s) dans {OUT_DIR.relative_to(ROOT)}/")


if __name__ == "__main__":
    main()
