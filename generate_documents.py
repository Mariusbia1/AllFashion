"""
Génère le cahier des charges (PDF, Word, Markdown) à partir d'un contenu unique.
Mise en page sobre : noir et blanc, sans couleur.
Usage : python3 generate_documents.py
"""
from docx import Document
from docx.shared import Pt, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH

from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, Preformatted
)
from reportlab.pdfgen import canvas
from xml.sax.saxutils import escape

OUT_BASENAME = "CAHIER_DES_CHARGES"
DOC_TITLE = "CAHIER DES CHARGES"
DOC_SUBTITLE = "Plateforme web pour un styliste créateur"
DOC_SUBTITLE_2 = "Boutique en ligne avec commande WhatsApp, sur-mesure, flocage et galerie"

META = [
    ("Objet", "Conception et développement d'une plateforme web et de son back-office"),
    ("Stack", "Front-office React (Vite) — Back-end, API et back-office Laravel 11 — MySQL"),
    ("Version", "1.0"),
    ("Date", "Novembre 2026"),
]

# ---------------------------------------------------------------------------
# CONTENU
# Types de blocs : h1, h2, p, ul, ol, table, code, pagebreak
# ---------------------------------------------------------------------------
C = []
def h1(t): C.append(("h1", t))
def h2(t): C.append(("h2", t))
def p(t): C.append(("p", t))
def ul(*items): C.append(("ul", list(items)))
def ol(*items): C.append(("ol", list(items)))
def table(headers, rows, widths): C.append(("table", headers, rows, widths))
def code(t): C.append(("code", t))
def pagebreak(): C.append(("pagebreak",))

# 1 -------------------------------------------------------------------------
h1("1. Présentation du projet")
h2("1.1 Contexte")
p("Le client est un styliste créateur. Il exerce plusieurs activités complémentaires : la vente de vêtements "
  "de prêt-à-porter, la confection sur-mesure, le flocage et la personnalisation de vêtements, ainsi que la "
  "présentation de ses créations (portfolio).")
p("Le projet consiste à réaliser une plateforme web qui regroupe ces activités et un back-office qui permet au "
  "styliste de gérer son contenu et de suivre les demandes de ses clients.")

h2("1.2 Principe général")
p("Le site ne propose pas de paiement en ligne. Toutes les demandes des clients (commande, rendez-vous, devis de "
  "flocage, message) suivent le même principe :")
ol("Le client remplit un formulaire sur le site.",
   "La demande est envoyée à l'API Laravel, qui la valide et l'enregistre en base de données avec une référence unique.",
   "Le client est ensuite redirigé vers WhatsApp avec un message pré-rempli adressé au styliste, contenant la référence et le détail de sa demande.",
   "Le styliste finalise l'échange avec le client sur WhatsApp (confirmation, paiement, livraison) et met à jour le statut de la demande dans le back-office.")

h2("1.3 Objectifs")
ul("Présenter de manière professionnelle les créations et les services du styliste.",
   "Permettre aux clients de commander, réserver un rendez-vous ou demander un devis rapidement, depuis un smartphone.",
   "Centraliser toutes les demandes dans un back-office afin de ne perdre aucune information.",
   "Rendre le styliste autonome sur la gestion de son catalogue, de sa galerie et des informations du site.")

h2("1.4 Périmètre")
p("<b>Inclus :</b> le front-office public, l'API REST, le back-office d'administration, la base de données, "
  "la gestion des fichiers (images et visuels clients), le déploiement en production.")
p("<b>Exclus :</b> le paiement en ligne, les comptes clients (le client n'a pas besoin de créer de compte), "
  "l'envoi automatique de messages via l'API WhatsApp Business (le site utilise uniquement les liens wa.me), "
  "la création des contenus (photos, textes), fournis par le client.")
p("Le nom de la marque, le logo et le numéro WhatsApp seront fournis par le client. Dans ce document, "
  "le nom de la marque est noté [NOM DE LA MARQUE].")

# 2 -------------------------------------------------------------------------
h1("2. Architecture technique")
h2("2.1 Technologies retenues")
table(["Élément", "Technologie", "Rôle"], [
    ["Front-office", "React 18, Vite, React Router", "Site public consulté par les clients. Une maquette fonctionnelle existe déjà."],
    ["Back-end / API", "Laravel 11 (PHP 8.2 ou plus)", "API REST JSON, règles métier, validation, enregistrement des demandes."],
    ["Base de données", "MySQL 8", "Stockage des produits, commandes, rendez-vous, demandes de flocage, galerie, paramètres."],
    ["Fichiers", "Laravel Storage (disque public)", "Photos des produits et de la galerie, visuels envoyés par les clients."],
    ["Back-office", "Filament PHP (recommandé) ou Blade", "Interface d'administration réservée au styliste, accessible sur /admin."],
    ["WhatsApp", "Liens wa.me", "Ouverture de WhatsApp avec un message pré-rempli."],
], [32, 48, 94])

h2("2.2 Organisation")
ul("Le front-office React et le back-end Laravel sont deux applications séparées qui communiquent via l'API (préfixe /api/v1).",
   "Le back-office est servi directement par Laravel (aucun développement React nécessaire pour l'administration).",
   "Les données actuellement écrites en dur dans le front-office (produits, galerie, numéro WhatsApp) doivent être remplacées par des appels à l'API.",
   "Le code existant fait référence à Supabase : cette dépendance doit être supprimée et remplacée par Laravel.")

h2("2.3 Environnements")
ul("Développement : environnement local de chaque développeur.",
   "Production : hébergement compatible PHP 8.2 et MySQL 8, avec nom de domaine et certificat HTTPS.",
   "Les paramètres sensibles (base de données, URL de l'API) sont placés dans des fichiers .env, jamais dans le code.")

# 3 -------------------------------------------------------------------------
h1("3. Arborescence du site")
table(["Page", "URL", "Contenu"], [
    ["Accueil", "/", "Présentation, services, produits mis en avant, aperçu de la galerie."],
    ["Boutique", "/boutique", "Catalogue des vêtements de prêt-à-porter."],
    ["Fiche produit", "/produit/{slug}", "Détail d'un produit, choix de la taille, ajout au panier."],
    ["Sur-mesure", "/sur-mesure", "Présentation du service et formulaire de prise de rendez-vous."],
    ["Flocage", "/flocage", "Configurateur de personnalisation et demande de devis."],
    ["Galerie", "/lookbook", "Photos des créations, filtrables par catégorie."],
    ["À propos", "/atelier", "Présentation du styliste et de son savoir-faire."],
    ["Contact", "/contact", "Coordonnées, formulaire de contact, FAQ."],
    ["Administration", "/admin", "Back-office (accès protégé)."],
], [30, 34, 110])

# 4 -------------------------------------------------------------------------
h1("4. Spécifications fonctionnelles du front-office")

h2("4.1 Éléments communs à toutes les pages")
ul("<b>Écran d'introduction :</b> animation affichée à la première visite de la session, avec possibilité de la passer.",
   "<b>Menu de navigation :</b> liens vers toutes les pages, bouton d'accès au panier avec le nombre d'articles, menu adapté au mobile.",
   "<b>Bouton WhatsApp flottant :</b> visible sur toutes les pages, propose des sujets rapides (rendez-vous, commande, flocage, question) et ouvre WhatsApp avec un message adapté.",
   "<b>Pied de page :</b> liens utiles, coordonnées, horaires et réseaux sociaux (issus des paramètres du back-office).")

h2("4.2 Accueil")
ul("Bandeau principal avec accès direct à la boutique et à la prise de rendez-vous.",
   "Présentation des services : prêt-à-porter, sur-mesure, flocage.",
   "Sélection de produits mis en avant (produits marqués « mis en avant » dans le back-office).",
   "Aperçu de la galerie.")

h2("4.3 Boutique")
ul("Liste des produits disponibles sous forme de grille (photo, nom, catégorie, prix en FCFA, badge éventuel).",
   "Filtre par catégorie (catégories gérées dans le back-office).",
   "Recherche par mot-clé (nom et description).",
   "Tri : par défaut, prix croissant, prix décroissant.",
   "Message clair lorsqu'aucun produit ne correspond à la recherche.")

h2("4.4 Fiche produit")
ul("Photos du produit (photo principale et photos secondaires).",
   "Nom, catégorie, prix, description et caractéristiques (matière, coupe, entretien).",
   "Choix de la taille parmi les tailles disponibles et choix de la quantité.",
   "Bouton « Ajouter au panier » et bouton « Commander sur WhatsApp » (commande directe de ce produit seul).",
   "Produits similaires (même catégorie).",
   "Un produit en rupture de stock reste visible mais ne peut pas être commandé.")

h2("4.5 Panier et commande")
ul("Panier accessible depuis toutes les pages, sous forme de panneau latéral.",
   "Modification des quantités, suppression d'un article, calcul du total.",
   "Le panier est conservé dans le navigateur (localStorage) en cas de rechargement.",
   "Formulaire de validation : nom et prénom (obligatoire), numéro WhatsApp (obligatoire), adresse de livraison ou retrait sur place (obligatoire), remarques (facultatif).")
p("À la validation : envoi de la commande à l'API (POST /api/v1/orders). L'API recalcule le total à partir des "
  "prix en base, enregistre la commande et renvoie sa référence ainsi que le lien WhatsApp. Le site ouvre "
  "WhatsApp puis vide le panier. Exemple de message généré :")
code("NOUVELLE COMMANDE - [NOM DE LA MARQUE]\n"
     "Référence : CMD-2026-0015\n"
     "Client : Jean DUPONT\n"
     "Téléphone : +229 XX XX XX XX\n"
     "Livraison : Cotonou, Haie Vive\n"
     "\n"
     "Articles :\n"
     "- 1 x Veste tailleur (Taille L) : 145 000 FCFA\n"
     "- 2 x T-shirt (Taille M) : 50 000 FCFA\n"
     "\n"
     "Total : 195 000 FCFA")
p("En cas d'erreur de l'API (serveur indisponible, champ invalide), un message d'erreur clair est affiché et "
  "WhatsApp n'est pas ouvert.")

h2("4.6 Sur-mesure et prise de rendez-vous")
ul("Présentation du déroulement en 4 étapes : consultation et choix des tissus, prise de mesures, confection, essayage et ajustements.",
   "Formulaire de rendez-vous :")
table(["Champ", "Type", "Règle"], [
    ["Lieu du rendez-vous", "Choix : à l'atelier / à domicile ou au bureau", "Obligatoire"],
    ["Adresse", "Texte", "Obligatoire si le rendez-vous est à domicile"],
    ["Type de tenue", "Liste (costume, robe, tenue traditionnelle...)", "Obligatoire, liste gérée dans le code"],
    ["Date souhaitée", "Date", "Obligatoire, date future"],
    ["Créneau", "Liste de créneaux horaires", "Obligatoire"],
    ["Nom et prénom", "Texte", "Obligatoire"],
    ["Numéro WhatsApp", "Téléphone", "Obligatoire"],
    ["Précisions", "Texte long", "Facultatif"],
], [38, 70, 66])
p("À la validation : enregistrement via POST /api/v1/appointments (référence RDV-AAAA-XXXX), puis ouverture de "
  "WhatsApp avec le récapitulatif. Le rendez-vous est une demande : il n'est confirmé qu'après validation du "
  "styliste.")

h2("4.7 Flocage et personnalisation")
ul("Aperçu visuel : le vêtement choisi est affiché et le visuel importé par le client apparaît à l'emplacement sélectionné.",
   "Choix du vêtement (t-shirt, sweat, hoodie, veste...).",
   "Choix de l'emplacement : dos, poitrine gauche, centre poitrine, manche.",
   "Import du visuel : formats PNG, JPG, WEBP, SVG ou PDF, 5 Mo maximum.",
   "Quantité, nom, numéro WhatsApp (obligatoires) et instructions (facultatif).",
   "Présentation des techniques proposées : flocage, sérigraphie, broderie.")
p("À la validation : envoi en multipart/form-data via POST /api/v1/flocking-requests. L'API enregistre la demande "
  "et le fichier, puis renvoie la référence (FLOC-AAAA-XXXX) et le lien public du visuel. Ce lien est inclus dans "
  "le message WhatsApp pour que le styliste puisse ouvrir le fichier.")

h2("4.8 Galerie")
ul("Grille de photos avec titre, catégorie et courte description.",
   "Filtre par catégorie.",
   "Affichage de la photo en grand au clic (visionneuse).",
   "Lien vers la prise de rendez-vous sur-mesure.")

h2("4.9 À propos")
ul("Présentation du styliste, de son parcours et de son savoir-faire. Contenu fourni par le client.")

h2("4.10 Contact")
ul("Coordonnées : adresse, téléphone, e-mail, horaires (issus des paramètres).",
   "Formulaire : nom, numéro WhatsApp, objet, message. Enregistrement via POST /api/v1/contacts puis ouverture de WhatsApp.",
   "Foire aux questions sous forme de questions dépliables.")

# 5 -------------------------------------------------------------------------
h1("5. Spécifications du back-office")
h2("5.1 Accès")
ul("Accès sur /admin, protégé par e-mail et mot de passe.",
   "Deux rôles : administrateur (accès complet, gestion des utilisateurs) et gestionnaire (tout sauf les utilisateurs et les paramètres).",
   "Fonction de réinitialisation du mot de passe.")

h2("5.2 Tableau de bord")
ul("Nombre de commandes du jour, de la semaine et du mois, et montant total estimé.",
   "Rendez-vous à venir (distinction atelier / domicile).",
   "Demandes de flocage et messages non traités.",
   "Liste des dernières commandes et des prochains rendez-vous.")

h2("5.3 Produits et catégories")
ul("Créer, modifier, supprimer, activer ou désactiver une catégorie ; définir l'ordre d'affichage.",
   "Créer, modifier, supprimer un produit : nom, slug (généré automatiquement), catégorie, prix, badge, description, caractéristiques, tailles disponibles, stock, photos (principale et secondaires), mise en avant sur l'accueil, visibilité.")

h2("5.4 Commandes")
ul("Liste des commandes avec recherche (référence, nom, téléphone) et filtre par statut et par date.",
   "Détail : client, adresse, articles, total, remarques.",
   "Bouton pour contacter le client sur WhatsApp.",
   "Modification du statut :")
table(["Statut", "Signification"], [
    ["En attente", "Commande reçue, pas encore confirmée avec le client."],
    ["Confirmée", "Disponibilité et modalités validées avec le client."],
    ["En préparation", "Commande en cours de préparation ou de retouche."],
    ["Livrée", "Commande livrée ou retirée et payée."],
    ["Annulée", "Commande annulée."],
], [40, 134])

h2("5.5 Rendez-vous sur-mesure")
ul("Liste et vue calendrier des rendez-vous.",
   "Filtre par lieu (atelier / domicile) et par statut : en attente, confirmé, effectué, annulé.",
   "Détail du rendez-vous et bouton pour contacter le client sur WhatsApp.",
   "Saisie des mensurations du client après le rendez-vous (tour de poitrine, taille, hanches, épaules, longueur de manche, etc.).")

h2("5.6 Demandes de flocage")
ul("Liste des demandes avec filtre par statut : nouvelle, devis envoyé, en production, terminée, annulée.",
   "Détail de la demande et téléchargement du visuel envoyé par le client.",
   "Saisie du montant du devis.")

h2("5.7 Galerie")
ul("Ajouter, modifier, supprimer une photo : titre, catégorie, description, image, ordre d'affichage, visibilité.")

h2("5.8 Messages")
ul("Liste des messages reçus via le formulaire de contact, avec indicateur lu / non lu.")

h2("5.9 Paramètres du site")
ul("Numéro WhatsApp de réception des demandes.",
   "Adresse, e-mail, horaires d'ouverture.",
   "Liens des réseaux sociaux.",
   "Texte du bandeau d'information.")

# 6 -------------------------------------------------------------------------
pagebreak()
h1("6. Base de données")
p("Les tables sont créées via les migrations Laravel. Toutes les tables possèdent les colonnes created_at et "
  "updated_at. Les montants sont exprimés en FCFA, en nombres entiers.")

DB = [
    ("users — utilisateurs du back-office", [
        ["id", "bigint, clé primaire", ""],
        ["name", "varchar(255)", "Nom"],
        ["email", "varchar(255), unique", "Identifiant de connexion"],
        ["password", "varchar(255)", "Mot de passe chiffré"],
        ["role", "varchar(50)", "admin ou gestionnaire"],
    ]),
    ("categories — catégories de la boutique et de la galerie", [
        ["id", "bigint, clé primaire", ""],
        ["name", "varchar(255)", "Nom affiché"],
        ["slug", "varchar(255), unique", "Identifiant dans l'URL"],
        ["type", "enum(shop, lookbook)", "Boutique ou galerie"],
        ["sort_order", "int, défaut 0", "Ordre d'affichage"],
        ["is_active", "boolean, défaut true", "Visible ou non"],
    ]),
    ("products — produits", [
        ["id", "bigint, clé primaire", ""],
        ["category_id", "clé étrangère", "Catégorie du produit"],
        ["name", "varchar(255)", "Nom du produit"],
        ["slug", "varchar(255), unique", "Identifiant dans l'URL"],
        ["price", "unsigned int", "Prix en FCFA"],
        ["badge", "varchar(100), nullable", "Ex. : Nouveauté, Série limitée"],
        ["description", "text", "Description"],
        ["details", "json", "Liste des caractéristiques"],
        ["sizes", "json", "Tailles disponibles, ex. [\"S\",\"M\",\"L\"]"],
        ["main_image", "varchar(255)", "Photo principale"],
        ["gallery", "json, nullable", "Photos secondaires"],
        ["stock", "int, défaut 0", "Quantité disponible"],
        ["is_featured", "boolean, défaut false", "Mis en avant sur l'accueil"],
        ["is_active", "boolean, défaut true", "Visible sur le site"],
    ]),
    ("orders — commandes", [
        ["id", "bigint, clé primaire", ""],
        ["reference", "varchar(50), unique", "Ex. : CMD-2026-0001"],
        ["customer_name", "varchar(255)", "Nom du client"],
        ["customer_phone", "varchar(50)", "Numéro WhatsApp"],
        ["customer_address", "text", "Adresse de livraison ou retrait"],
        ["notes", "text, nullable", "Remarques du client"],
        ["total_amount", "unsigned int", "Total calculé par le serveur"],
        ["status", "enum", "en_attente, confirmee, en_preparation, livree, annulee"],
    ]),
    ("order_items — lignes de commande", [
        ["id", "bigint, clé primaire", ""],
        ["order_id", "clé étrangère, cascade", "Commande"],
        ["product_id", "clé étrangère, nullable", "Produit (null si supprimé)"],
        ["product_name", "varchar(255)", "Nom du produit au moment de la commande"],
        ["size", "varchar(50)", "Taille choisie"],
        ["unit_price", "unsigned int", "Prix unitaire au moment de la commande"],
        ["quantity", "unsigned int", "Quantité"],
    ]),
    ("appointments — rendez-vous sur-mesure", [
        ["id", "bigint, clé primaire", ""],
        ["reference", "varchar(50), unique", "Ex. : RDV-2026-0001"],
        ["client_name", "varchar(255)", "Nom du client"],
        ["client_phone", "varchar(50)", "Numéro WhatsApp"],
        ["location_type", "enum(atelier, domicile)", "Lieu du rendez-vous"],
        ["address", "text, nullable", "Obligatoire si domicile"],
        ["garment_type", "varchar(255)", "Type de tenue"],
        ["preferred_date", "date", "Date souhaitée"],
        ["time_slot", "varchar(50)", "Créneau, ex. 14:00-16:00"],
        ["notes", "text, nullable", "Précisions du client"],
        ["measurements", "json, nullable", "Mensurations saisies par le styliste"],
        ["status", "enum", "en_attente, confirme, effectue, annule"],
    ]),
    ("flocking_requests — demandes de flocage", [
        ["id", "bigint, clé primaire", ""],
        ["reference", "varchar(50), unique", "Ex. : FLOC-2026-0001"],
        ["client_name", "varchar(255)", "Nom du client"],
        ["client_phone", "varchar(50)", "Numéro WhatsApp"],
        ["garment_type", "varchar(150)", "Vêtement choisi"],
        ["position", "varchar(150)", "Emplacement du marquage"],
        ["quantity", "unsigned int", "Nombre de pièces"],
        ["artwork_path", "varchar(255), nullable", "Chemin du visuel envoyé"],
        ["instructions", "text, nullable", "Instructions du client"],
        ["quoted_price", "unsigned int, nullable", "Montant du devis"],
        ["status", "enum", "nouvelle, devis_envoye, en_production, terminee, annulee"],
    ]),
    ("lookbook_items — photos de la galerie", [
        ["id", "bigint, clé primaire", ""],
        ["category_id", "clé étrangère, nullable", "Catégorie"],
        ["title", "varchar(255)", "Titre"],
        ["description", "text, nullable", "Description courte"],
        ["image_path", "varchar(255)", "Chemin de l'image"],
        ["sort_order", "int, défaut 0", "Ordre d'affichage"],
        ["is_active", "boolean, défaut true", "Visible ou non"],
    ]),
    ("contact_messages — messages de contact", [
        ["id", "bigint, clé primaire", ""],
        ["name", "varchar(255)", "Nom"],
        ["phone", "varchar(50)", "Numéro WhatsApp"],
        ["subject", "varchar(255)", "Objet"],
        ["message", "text", "Message"],
        ["is_read", "boolean, défaut false", "Lu ou non"],
    ]),
    ("settings — paramètres du site", [
        ["id", "bigint, clé primaire", ""],
        ["key", "varchar(100), unique", "Ex. : whatsapp_number, address, opening_hours"],
        ["value", "text, nullable", "Valeur"],
    ]),
]
for i, (title, rows) in enumerate(DB, start=1):
    h2(f"6.{i} {title}")
    table(["Colonne", "Type", "Description"], rows, [40, 52, 82])

h2(f"6.{len(DB) + 1} Références")
p("Les références sont générées par le serveur au format PRÉFIXE-ANNÉE-NUMÉRO sur 4 chiffres "
  "(CMD-2026-0001, RDV-2026-0001, FLOC-2026-0001). La numérotation repart à 0001 chaque année.")

# 7 -------------------------------------------------------------------------
h1("7. API REST")
p("Toutes les routes sont préfixées par /api/v1 et renvoient du JSON.")
table(["Méthode", "Route", "Description"], [
    ["GET", "/settings", "Paramètres publics : numéro WhatsApp, coordonnées, horaires, réseaux sociaux."],
    ["GET", "/categories", "Catégories actives (filtre ?type=shop ou ?type=lookbook)."],
    ["GET", "/products", "Produits actifs. Filtres : ?category=, ?search=, ?sort=, ?featured=1. Paginé."],
    ["GET", "/products/{slug}", "Détail d'un produit et produits similaires."],
    ["GET", "/lookbook", "Photos actives de la galerie (filtre ?category=)."],
    ["POST", "/orders", "Création d'une commande. Renvoie reference, total et whatsapp_url."],
    ["POST", "/appointments", "Création d'une demande de rendez-vous. Renvoie reference et whatsapp_url."],
    ["POST", "/flocking-requests", "Création d'une demande de flocage avec fichier. Renvoie reference, artwork_url et whatsapp_url."],
    ["POST", "/contacts", "Enregistrement d'un message. Renvoie whatsapp_url."],
], [20, 42, 112])

h2("7.1 Exemple : création d'une commande")
p("Requête envoyée par le front-office :")
code('POST /api/v1/orders\n'
     '{\n'
     '  "customer_name": "Jean DUPONT",\n'
     '  "customer_phone": "+229XXXXXXXX",\n'
     '  "customer_address": "Cotonou, Haie Vive",\n'
     '  "notes": "Livraison le matin",\n'
     '  "items": [\n'
     '    { "product_id": 12, "size": "L", "quantity": 1 },\n'
     '    { "product_id": 4,  "size": "M", "quantity": 2 }\n'
     '  ]\n'
     '}')
p("Réponse (201) :")
code('{\n'
     '  "reference": "CMD-2026-0015",\n'
     '  "total_amount": 195000,\n'
     '  "whatsapp_url": "https://wa.me/229XXXXXXXX?text=..."\n'
     '}')

h2("7.2 Règles communes")
ul("Le prix envoyé par le front-office n'est jamais utilisé : le serveur recalcule toujours le total à partir de la base.",
   "Le serveur vérifie que le produit existe, est actif, que la taille est disponible et que le stock est suffisant.",
   "Le message WhatsApp est construit côté serveur à partir des données enregistrées.",
   "Erreurs de validation : code 422 avec la liste des champs en erreur. Erreur serveur : code 500 avec un message générique.")

# 8 -------------------------------------------------------------------------
h1("8. Exigences techniques")
h2("8.1 Sécurité")
ul("Validation de toutes les données côté serveur (Form Requests Laravel).",
   "Fichiers importés : contrôle du type et de la taille, renommage automatique.",
   "Limitation du nombre de requêtes sur les formulaires publics (anti-spam).",
   "CORS limité au domaine du front-office.",
   "HTTPS obligatoire en production, mots de passe chiffrés.")
h2("8.2 Performance")
ul("Images compressées et redimensionnées à l'import.",
   "Chargement différé des images dans les listes.",
   "Pagination des listes de produits.")
h2("8.3 Compatibilité et ergonomie")
ul("Site entièrement responsive : la majorité des clients utilisent un smartphone.",
   "Compatibilité avec les versions récentes de Chrome, Safari, Firefox et Edge.",
   "Formulaires simples, messages d'erreur compréhensibles.")
h2("8.4 Référencement")
ul("Titre et description propres à chaque page et à chaque produit.",
   "URL lisibles (slugs), balises alt sur les images, fichier sitemap.")

# 9 -------------------------------------------------------------------------
h1("9. Livrables")
ul("Code source du front-office et du back-end, versionné sur un dépôt Git.",
   "Base de données avec migrations et données de démonstration (seeders).",
   "Site et back-office déployés en production.",
   "Documentation technique : installation, configuration, déploiement, liste des routes de l'API.",
   "Guide d'utilisation simple du back-office pour le styliste.",
   "Accès administrateur remis au client.")

# 10 ------------------------------------------------------------------------
h1("10. Déroulement du projet")
table(["Phase", "Contenu"], [
    ["1. Mise en place", "Installation de Laravel, base de données, migrations, modèles, données de démonstration."],
    ["2. Back-office", "Authentification, tableau de bord et gestion de toutes les entités."],
    ["3. API", "Développement des routes de l'API, validation, génération des messages WhatsApp."],
    ["4. Intégration", "Connexion du front-office React à l'API, suppression des données en dur et de Supabase."],
    ["5. Tests et recette", "Tests des parcours sur mobile et ordinateur, corrections."],
    ["6. Mise en production", "Déploiement, configuration du domaine et du HTTPS, prise en main par le styliste."],
], [40, 134])

# 11 ------------------------------------------------------------------------
h1("11. Recette")
p("Le projet est considéré comme terminé lorsque les points suivants sont validés :")
ul("Une commande passée depuis le panier apparaît dans le back-office avec le bon total, et le message WhatsApp reçu est correct.",
   "Une demande de rendez-vous (atelier et domicile) est enregistrée et transmise sur WhatsApp.",
   "Une demande de flocage avec visuel est enregistrée, et le visuel est accessible depuis le message WhatsApp et le back-office.",
   "Un produit, une catégorie ou une photo ajouté dans le back-office apparaît sur le site.",
   "La modification du numéro WhatsApp dans les paramètres est prise en compte sur tout le site.",
   "Le site s'affiche correctement sur smartphone, tablette et ordinateur.")


# ---------------------------------------------------------------------------
# RENDU PDF
# ---------------------------------------------------------------------------
BLACK = colors.black
GREY = colors.HexColor("#555555")
LINE = colors.HexColor("#999999")


class NumberedCanvas(canvas.Canvas):
    def __init__(self, *a, **k):
        super().__init__(*a, **k)
        self._pages = []

    def showPage(self):
        self._pages.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        n = len(self._pages)
        for st in self._pages:
            self.__dict__.update(st)
            self._decorate(n)
            canvas.Canvas.showPage(self)
        canvas.Canvas.save(self)

    def _decorate(self, n):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(GREY)
        self.setStrokeColor(LINE)
        self.setLineWidth(0.4)
        if self._pageNumber > 1:
            self.drawString(20 * mm, 284 * mm, f"{DOC_TITLE} — {DOC_SUBTITLE}")
            self.line(20 * mm, 282 * mm, 190 * mm, 282 * mm)
        self.line(20 * mm, 15 * mm, 190 * mm, 15 * mm)
        self.drawRightString(190 * mm, 10 * mm, f"Page {self._pageNumber} / {n}")
        self.restoreState()


def build_pdf(path):
    doc = SimpleDocTemplate(path, pagesize=A4, leftMargin=20 * mm, rightMargin=20 * mm,
                            topMargin=22 * mm, bottomMargin=22 * mm,
                            title=DOC_TITLE, author="")
    base = dict(fontName="Helvetica", textColor=BLACK)
    s_title = ParagraphStyle("t", fontName="Helvetica-Bold", fontSize=22, leading=26, alignment=1, spaceAfter=10)
    s_sub = ParagraphStyle("s", fontName="Helvetica", fontSize=13, leading=17, alignment=1, spaceAfter=4)
    s_sub2 = ParagraphStyle("s2", fontName="Helvetica", fontSize=10.5, leading=14, alignment=1, textColor=GREY)
    s_h1 = ParagraphStyle("h1", fontName="Helvetica-Bold", fontSize=13, leading=17, spaceBefore=14, spaceAfter=6, keepWithNext=True)
    s_h2 = ParagraphStyle("h2", fontName="Helvetica-Bold", fontSize=10.5, leading=14, spaceBefore=9, spaceAfter=4, keepWithNext=True)
    s_p = ParagraphStyle("p", fontSize=9.5, leading=13.5, spaceAfter=5, **base)
    s_li = ParagraphStyle("li", fontSize=9.5, leading=13.5, leftIndent=14, bulletIndent=4, spaceAfter=2.5, **base)
    s_td = ParagraphStyle("td", fontSize=8.8, leading=11.5, **base)
    s_th = ParagraphStyle("th", fontName="Helvetica-Bold", fontSize=8.8, leading=11.5)
    s_code = ParagraphStyle("code", fontName="Courier", fontSize=8.5, leading=11, leftIndent=8)

    def tbl(data, widths):
        t = Table(data, colWidths=[w * mm for w in widths], repeatRows=1)
        t.setStyle(TableStyle([
            ("GRID", (0, 0), (-1, -1), 0.4, LINE),
            ("LINEBELOW", (0, 0), (-1, 0), 0.9, BLACK),
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("TOPPADDING", (0, 0), (-1, -1), 3.5),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 3.5),
            ("LEFTPADDING", (0, 0), (-1, -1), 5),
            ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ]))
        return t

    story = [Spacer(1, 70 * mm),
             Paragraph(DOC_TITLE, s_title),
             Paragraph(DOC_SUBTITLE, s_sub),
             Paragraph(DOC_SUBTITLE_2, s_sub2),
             Spacer(1, 30 * mm)]
    meta = [[Paragraph(f"<b>{k}</b>", s_td), Paragraph(v, s_td)] for k, v in META]
    mt = Table(meta, colWidths=[30 * mm, 120 * mm])
    mt.setStyle(TableStyle([
        ("GRID", (0, 0), (-1, -1), 0.4, LINE),
        ("TOPPADDING", (0, 0), (-1, -1), 5), ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
    ]))
    story += [mt, PageBreak()]

    # Sommaire
    story.append(Paragraph("Sommaire", s_h1))
    for b in C:
        if b[0] == "h1":
            story.append(Paragraph(b[1], s_li))
    story.append(PageBreak())

    for b in C:
        kind = b[0]
        if kind == "h1":
            story.append(Paragraph(b[1], s_h1))
        elif kind == "h2":
            story.append(Paragraph(b[1], s_h2))
        elif kind == "p":
            story.append(Paragraph(b[1], s_p))
        elif kind == "ul":
            for it in b[1]:
                story.append(Paragraph(it, s_li, bulletText="•"))
        elif kind == "ol":
            for i, it in enumerate(b[1], 1):
                story.append(Paragraph(it, s_li, bulletText=f"{i}."))
        elif kind == "table":
            _, headers, rows, widths = b
            data = [[Paragraph(h, s_th) for h in headers]]
            data += [[Paragraph(escape(str(c)), s_td) for c in r] for r in rows]
            story.append(Spacer(1, 2))
            story.append(tbl(data, widths))
            story.append(Spacer(1, 5))
        elif kind == "code":
            story.append(Spacer(1, 2))
            story.append(Preformatted(b[1], s_code))
            story.append(Spacer(1, 6))
        elif kind == "pagebreak":
            story.append(PageBreak())

    doc.build(story, canvasmaker=NumberedCanvas)


# ---------------------------------------------------------------------------
# RENDU WORD
# ---------------------------------------------------------------------------
import re

def _runs(par, html, size=10):
    # gère uniquement <b>...</b>
    for i, part in enumerate(re.split(r"</?b>", html)):
        if not part:
            continue
        r = par.add_run(part)
        r.bold = (i % 2 == 1)
        r.font.size = Pt(size)
        r.font.color.rgb = RGBColor(0, 0, 0)


def build_docx(path):
    d = Document()
    st = d.styles["Normal"]
    st.font.name = "Arial"
    st.font.size = Pt(10)
    for s in d.sections:
        s.left_margin = s.right_margin = Cm(2)
        s.top_margin = s.bottom_margin = Cm(2)
    for name in ("Heading 1", "Heading 2", "Title"):
        hs = d.styles[name]
        hs.font.name = "Arial"
        hs.font.color.rgb = RGBColor(0, 0, 0)

    for _ in range(8):
        d.add_paragraph()
    t = d.add_paragraph(); t.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = t.add_run(DOC_TITLE); r.bold = True; r.font.size = Pt(24)
    t = d.add_paragraph(); t.alignment = WD_ALIGN_PARAGRAPH.CENTER
    t.add_run(DOC_SUBTITLE).font.size = Pt(14)
    t = d.add_paragraph(); t.alignment = WD_ALIGN_PARAGRAPH.CENTER
    t.add_run(DOC_SUBTITLE_2).font.size = Pt(11)
    d.add_paragraph()
    mt = d.add_table(rows=0, cols=2); mt.style = "Table Grid"
    for k, v in META:
        cells = mt.add_row().cells
        cells[0].text = ""; _runs(cells[0].paragraphs[0], f"<b>{k}</b>", 10)
        cells[1].text = v
    d.add_page_break()

    for b in C:
        kind = b[0]
        if kind == "h1":
            d.add_heading(b[1], level=1)
        elif kind == "h2":
            d.add_heading(b[1], level=2)
        elif kind == "p":
            _runs(d.add_paragraph(), b[1])
        elif kind in ("ul", "ol"):
            style = "List Bullet" if kind == "ul" else "List Number"
            for it in b[1]:
                _runs(d.add_paragraph(style=style), it)
        elif kind == "table":
            _, headers, rows, widths = b
            tb = d.add_table(rows=1, cols=len(headers)); tb.style = "Table Grid"
            for i, h in enumerate(headers):
                tb.rows[0].cells[i].text = ""
                _runs(tb.rows[0].cells[i].paragraphs[0], f"<b>{h}</b>", 9)
            for row in rows:
                cells = tb.add_row().cells
                for i, c in enumerate(row):
                    cells[i].text = ""
                    _runs(cells[i].paragraphs[0], str(c), 9)
            for row in tb.rows:
                for i, w in enumerate(widths):
                    row.cells[i].width = Cm(w / 10)
            d.add_paragraph()
        elif kind == "code":
            par = d.add_paragraph()
            r = par.add_run(b[1]); r.font.name = "Courier New"; r.font.size = Pt(9)
        elif kind == "pagebreak":
            d.add_page_break()
    d.save(path)


# ---------------------------------------------------------------------------
# RENDU MARKDOWN
# ---------------------------------------------------------------------------
def build_md(path):
    md = lambda s: s.replace("<b>", "**").replace("</b>", "**")
    out = [f"# {DOC_TITLE}", f"## {DOC_SUBTITLE}", DOC_SUBTITLE_2, ""]
    out += ["| | |", "| :--- | :--- |"] + [f"| **{k}** | {v} |" for k, v in META] + ["", "---", ""]
    for b in C:
        kind = b[0]
        if kind == "h1":
            out += [f"## {b[1]}", ""]
        elif kind == "h2":
            out += [f"### {b[1]}", ""]
        elif kind == "p":
            out += [md(b[1]), ""]
        elif kind == "ul":
            out += [f"- {md(it)}" for it in b[1]] + [""]
        elif kind == "ol":
            out += [f"{i}. {md(it)}" for i, it in enumerate(b[1], 1)] + [""]
        elif kind == "table":
            _, headers, rows, _w = b
            out.append("| " + " | ".join(headers) + " |")
            out.append("|" + " :--- |" * len(headers))
            out += ["| " + " | ".join(str(c).replace("|", "\\|") for c in r) + " |" for r in rows]
            out.append("")
        elif kind == "code":
            out += ["```text", b[1], "```", ""]
    with open(path, "w", encoding="utf-8") as f:
        f.write("\n".join(out))


if __name__ == "__main__":
    build_pdf(f"{OUT_BASENAME}.pdf")
    build_docx(f"{OUT_BASENAME}.docx")
    build_md(f"{OUT_BASENAME}.md")
    print(f"[OK] {OUT_BASENAME}.pdf / .docx / .md générés")
