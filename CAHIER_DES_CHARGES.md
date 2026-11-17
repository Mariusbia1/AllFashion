# CAHIER DES CHARGES
## Plateforme web pour un styliste créateur
Boutique en ligne avec commande WhatsApp, sur-mesure, flocage et galerie

| | |
| :--- | :--- |
| **Objet** | Conception et développement d'une plateforme web et de son back-office |
| **Stack** | Front-office React (Vite) — Back-end, API et back-office Laravel 11 — MySQL |
| **Version** | 1.0 |
| **Date** | Novembre 2026 |

---

## 1. Présentation du projet

### 1.1 Contexte

Le client est un styliste créateur. Il exerce plusieurs activités complémentaires : la vente de vêtements de prêt-à-porter, la confection sur-mesure, le flocage et la personnalisation de vêtements, ainsi que la présentation de ses créations (portfolio).

Le projet consiste à réaliser une plateforme web qui regroupe ces activités et un back-office qui permet au styliste de gérer son contenu et de suivre les demandes de ses clients.

### 1.2 Principe général

Le site ne propose pas de paiement en ligne. Toutes les demandes des clients (commande, rendez-vous, devis de flocage, message) suivent le même principe :

1. Le client remplit un formulaire sur le site.
2. La demande est envoyée à l'API Laravel, qui la valide et l'enregistre en base de données avec une référence unique.
3. Le client est ensuite redirigé vers WhatsApp avec un message pré-rempli adressé au styliste, contenant la référence et le détail de sa demande.
4. Le styliste finalise l'échange avec le client sur WhatsApp (confirmation, paiement, livraison) et met à jour le statut de la demande dans le back-office.

### 1.3 Objectifs

- Présenter de manière professionnelle les créations et les services du styliste.
- Permettre aux clients de commander, réserver un rendez-vous ou demander un devis rapidement, depuis un smartphone.
- Centraliser toutes les demandes dans un back-office afin de ne perdre aucune information.
- Rendre le styliste autonome sur la gestion de son catalogue, de sa galerie et des informations du site.

### 1.4 Périmètre

**Inclus :** le front-office public, l'API REST, le back-office d'administration, la base de données, la gestion des fichiers (images et visuels clients), le déploiement en production.

**Exclus :** le paiement en ligne, les comptes clients (le client n'a pas besoin de créer de compte), l'envoi automatique de messages via l'API WhatsApp Business (le site utilise uniquement les liens wa.me), la création des contenus (photos, textes), fournis par le client.

Le nom de la marque, le logo et le numéro WhatsApp seront fournis par le client. Dans ce document, le nom de la marque est noté [NOM DE LA MARQUE].

## 2. Architecture technique

### 2.1 Technologies retenues

| Élément | Technologie | Rôle |
| :--- | :--- | :--- |
| Front-office | React 18, Vite, React Router | Site public consulté par les clients. Une maquette fonctionnelle existe déjà. |
| Back-end / API | Laravel 11 (PHP 8.2 ou plus) | API REST JSON, règles métier, validation, enregistrement des demandes. |
| Base de données | MySQL 8 | Stockage des produits, commandes, rendez-vous, demandes de flocage, galerie, paramètres. |
| Fichiers | Laravel Storage (disque public) | Photos des produits et de la galerie, visuels envoyés par les clients. |
| Back-office | Filament PHP (recommandé) ou Blade | Interface d'administration réservée au styliste, accessible sur /admin. |
| WhatsApp | Liens wa.me | Ouverture de WhatsApp avec un message pré-rempli. |

### 2.2 Organisation

- Le front-office React et le back-end Laravel sont deux applications séparées qui communiquent via l'API (préfixe /api/v1).
- Le back-office est servi directement par Laravel (aucun développement React nécessaire pour l'administration).
- Les données actuellement écrites en dur dans le front-office (produits, galerie, numéro WhatsApp) doivent être remplacées par des appels à l'API.
- Le code existant fait référence à Supabase : cette dépendance doit être supprimée et remplacée par Laravel.

### 2.3 Environnements

- Développement : environnement local de chaque développeur.
- Production : hébergement compatible PHP 8.2 et MySQL 8, avec nom de domaine et certificat HTTPS.
- Les paramètres sensibles (base de données, URL de l'API) sont placés dans des fichiers .env, jamais dans le code.

## 3. Arborescence du site

| Page | URL | Contenu |
| :--- | :--- | :--- |
| Accueil | / | Présentation, services, produits mis en avant, aperçu de la galerie. |
| Boutique | /boutique | Catalogue des vêtements de prêt-à-porter. |
| Fiche produit | /produit/{slug} | Détail d'un produit, choix de la taille, ajout au panier. |
| Sur-mesure | /sur-mesure | Présentation du service et formulaire de prise de rendez-vous. |
| Flocage | /flocage | Configurateur de personnalisation et demande de devis. |
| Galerie | /lookbook | Photos des créations, filtrables par catégorie. |
| À propos | /atelier | Présentation du styliste et de son savoir-faire. |
| Contact | /contact | Coordonnées, formulaire de contact, FAQ. |
| Administration | /admin | Back-office (accès protégé). |

## 4. Spécifications fonctionnelles du front-office

### 4.1 Éléments communs à toutes les pages

- **Écran d'introduction :** animation affichée à la première visite de la session, avec possibilité de la passer.
- **Menu de navigation :** liens vers toutes les pages, bouton d'accès au panier avec le nombre d'articles, menu adapté au mobile.
- **Bouton WhatsApp flottant :** visible sur toutes les pages, propose des sujets rapides (rendez-vous, commande, flocage, question) et ouvre WhatsApp avec un message adapté.
- **Pied de page :** liens utiles, coordonnées, horaires et réseaux sociaux (issus des paramètres du back-office).

### 4.2 Accueil

- Bandeau principal avec accès direct à la boutique et à la prise de rendez-vous.
- Présentation des services : prêt-à-porter, sur-mesure, flocage.
- Sélection de produits mis en avant (produits marqués « mis en avant » dans le back-office).
- Aperçu de la galerie.

### 4.3 Boutique

- Liste des produits disponibles sous forme de grille (photo, nom, catégorie, prix en FCFA, badge éventuel).
- Filtre par catégorie (catégories gérées dans le back-office).
- Recherche par mot-clé (nom et description).
- Tri : par défaut, prix croissant, prix décroissant.
- Message clair lorsqu'aucun produit ne correspond à la recherche.

### 4.4 Fiche produit

- Photos du produit (photo principale et photos secondaires).
- Nom, catégorie, prix, description et caractéristiques (matière, coupe, entretien).
- Choix de la taille parmi les tailles disponibles et choix de la quantité.
- Bouton « Ajouter au panier » et bouton « Commander sur WhatsApp » (commande directe de ce produit seul).
- Produits similaires (même catégorie).
- Un produit en rupture de stock reste visible mais ne peut pas être commandé.

### 4.5 Panier et commande

- Panier accessible depuis toutes les pages, sous forme de panneau latéral.
- Modification des quantités, suppression d'un article, calcul du total.
- Le panier est conservé dans le navigateur (localStorage) en cas de rechargement.
- Formulaire de validation : nom et prénom (obligatoire), numéro WhatsApp (obligatoire), adresse de livraison ou retrait sur place (obligatoire), remarques (facultatif).

À la validation : envoi de la commande à l'API (POST /api/v1/orders). L'API recalcule le total à partir des prix en base, enregistre la commande et renvoie sa référence ainsi que le lien WhatsApp. Le site ouvre WhatsApp puis vide le panier. Exemple de message généré :

```text
NOUVELLE COMMANDE - [NOM DE LA MARQUE]
Référence : CMD-2026-0015
Client : Jean DUPONT
Téléphone : +229 XX XX XX XX
Livraison : Cotonou, Haie Vive

Articles :
- 1 x Veste tailleur (Taille L) : 145 000 FCFA
- 2 x T-shirt (Taille M) : 50 000 FCFA

Total : 195 000 FCFA
```

En cas d'erreur de l'API (serveur indisponible, champ invalide), un message d'erreur clair est affiché et WhatsApp n'est pas ouvert.

### 4.6 Sur-mesure et prise de rendez-vous

- Présentation du déroulement en 4 étapes : consultation et choix des tissus, prise de mesures, confection, essayage et ajustements.
- Formulaire de rendez-vous :

| Champ | Type | Règle |
| :--- | :--- | :--- |
| Lieu du rendez-vous | Choix : à l'atelier / à domicile ou au bureau | Obligatoire |
| Adresse | Texte | Obligatoire si le rendez-vous est à domicile |
| Type de tenue | Liste (costume, robe, tenue traditionnelle...) | Obligatoire, liste gérée dans le code |
| Date souhaitée | Date | Obligatoire, date future |
| Créneau | Liste de créneaux horaires | Obligatoire |
| Nom et prénom | Texte | Obligatoire |
| Numéro WhatsApp | Téléphone | Obligatoire |
| Précisions | Texte long | Facultatif |

À la validation : enregistrement via POST /api/v1/appointments (référence RDV-AAAA-XXXX), puis ouverture de WhatsApp avec le récapitulatif. Le rendez-vous est une demande : il n'est confirmé qu'après validation du styliste.

### 4.7 Flocage et personnalisation

- Aperçu visuel : le vêtement choisi est affiché et le visuel importé par le client apparaît à l'emplacement sélectionné.
- Choix du vêtement (t-shirt, sweat, hoodie, veste...).
- Choix de l'emplacement : dos, poitrine gauche, centre poitrine, manche.
- Import du visuel : formats PNG, JPG, WEBP, SVG ou PDF, 5 Mo maximum.
- Quantité, nom, numéro WhatsApp (obligatoires) et instructions (facultatif).
- Présentation des techniques proposées : flocage, sérigraphie, broderie.

À la validation : envoi en multipart/form-data via POST /api/v1/flocking-requests. L'API enregistre la demande et le fichier, puis renvoie la référence (FLOC-AAAA-XXXX) et le lien public du visuel. Ce lien est inclus dans le message WhatsApp pour que le styliste puisse ouvrir le fichier.

### 4.8 Galerie

- Grille de photos avec titre, catégorie et courte description.
- Filtre par catégorie.
- Affichage de la photo en grand au clic (visionneuse).
- Lien vers la prise de rendez-vous sur-mesure.

### 4.9 À propos

- Présentation du styliste, de son parcours et de son savoir-faire. Contenu fourni par le client.

### 4.10 Contact

- Coordonnées : adresse, téléphone, e-mail, horaires (issus des paramètres).
- Formulaire : nom, numéro WhatsApp, objet, message. Enregistrement via POST /api/v1/contacts puis ouverture de WhatsApp.
- Foire aux questions sous forme de questions dépliables.

## 5. Spécifications du back-office

### 5.1 Accès

- Accès sur /admin, protégé par e-mail et mot de passe.
- Deux rôles : administrateur (accès complet, gestion des utilisateurs) et gestionnaire (tout sauf les utilisateurs et les paramètres).
- Fonction de réinitialisation du mot de passe.

### 5.2 Tableau de bord

- Nombre de commandes du jour, de la semaine et du mois, et montant total estimé.
- Rendez-vous à venir (distinction atelier / domicile).
- Demandes de flocage et messages non traités.
- Liste des dernières commandes et des prochains rendez-vous.

### 5.3 Produits et catégories

- Créer, modifier, supprimer, activer ou désactiver une catégorie ; définir l'ordre d'affichage.
- Créer, modifier, supprimer un produit : nom, slug (généré automatiquement), catégorie, prix, badge, description, caractéristiques, tailles disponibles, stock, photos (principale et secondaires), mise en avant sur l'accueil, visibilité.

### 5.4 Commandes

- Liste des commandes avec recherche (référence, nom, téléphone) et filtre par statut et par date.
- Détail : client, adresse, articles, total, remarques.
- Bouton pour contacter le client sur WhatsApp.
- Modification du statut :

| Statut | Signification |
| :--- | :--- |
| En attente | Commande reçue, pas encore confirmée avec le client. |
| Confirmée | Disponibilité et modalités validées avec le client. |
| En préparation | Commande en cours de préparation ou de retouche. |
| Livrée | Commande livrée ou retirée et payée. |
| Annulée | Commande annulée. |

### 5.5 Rendez-vous sur-mesure

- Liste et vue calendrier des rendez-vous.
- Filtre par lieu (atelier / domicile) et par statut : en attente, confirmé, effectué, annulé.
- Détail du rendez-vous et bouton pour contacter le client sur WhatsApp.
- Saisie des mensurations du client après le rendez-vous (tour de poitrine, taille, hanches, épaules, longueur de manche, etc.).

### 5.6 Demandes de flocage

- Liste des demandes avec filtre par statut : nouvelle, devis envoyé, en production, terminée, annulée.
- Détail de la demande et téléchargement du visuel envoyé par le client.
- Saisie du montant du devis.

### 5.7 Galerie

- Ajouter, modifier, supprimer une photo : titre, catégorie, description, image, ordre d'affichage, visibilité.

### 5.8 Messages

- Liste des messages reçus via le formulaire de contact, avec indicateur lu / non lu.

### 5.9 Paramètres du site

- Numéro WhatsApp de réception des demandes.
- Adresse, e-mail, horaires d'ouverture.
- Liens des réseaux sociaux.
- Texte du bandeau d'information.

## 6. Base de données

Les tables sont créées via les migrations Laravel. Toutes les tables possèdent les colonnes created_at et updated_at. Les montants sont exprimés en FCFA, en nombres entiers.

### 6.1 users — utilisateurs du back-office

| Colonne | Type | Description |
| :--- | :--- | :--- |
| id | bigint, clé primaire |  |
| name | varchar(255) | Nom |
| email | varchar(255), unique | Identifiant de connexion |
| password | varchar(255) | Mot de passe chiffré |
| role | varchar(50) | admin ou gestionnaire |

### 6.2 categories — catégories de la boutique et de la galerie

| Colonne | Type | Description |
| :--- | :--- | :--- |
| id | bigint, clé primaire |  |
| name | varchar(255) | Nom affiché |
| slug | varchar(255), unique | Identifiant dans l'URL |
| type | enum(shop, lookbook) | Boutique ou galerie |
| sort_order | int, défaut 0 | Ordre d'affichage |
| is_active | boolean, défaut true | Visible ou non |

### 6.3 products — produits

| Colonne | Type | Description |
| :--- | :--- | :--- |
| id | bigint, clé primaire |  |
| category_id | clé étrangère | Catégorie du produit |
| name | varchar(255) | Nom du produit |
| slug | varchar(255), unique | Identifiant dans l'URL |
| price | unsigned int | Prix en FCFA |
| badge | varchar(100), nullable | Ex. : Nouveauté, Série limitée |
| description | text | Description |
| details | json | Liste des caractéristiques |
| sizes | json | Tailles disponibles, ex. ["S","M","L"] |
| main_image | varchar(255) | Photo principale |
| gallery | json, nullable | Photos secondaires |
| stock | int, défaut 0 | Quantité disponible |
| is_featured | boolean, défaut false | Mis en avant sur l'accueil |
| is_active | boolean, défaut true | Visible sur le site |

### 6.4 orders — commandes

| Colonne | Type | Description |
| :--- | :--- | :--- |
| id | bigint, clé primaire |  |
| reference | varchar(50), unique | Ex. : CMD-2026-0001 |
| customer_name | varchar(255) | Nom du client |
| customer_phone | varchar(50) | Numéro WhatsApp |
| customer_address | text | Adresse de livraison ou retrait |
| notes | text, nullable | Remarques du client |
| total_amount | unsigned int | Total calculé par le serveur |
| status | enum | en_attente, confirmee, en_preparation, livree, annulee |

### 6.5 order_items — lignes de commande

| Colonne | Type | Description |
| :--- | :--- | :--- |
| id | bigint, clé primaire |  |
| order_id | clé étrangère, cascade | Commande |
| product_id | clé étrangère, nullable | Produit (null si supprimé) |
| product_name | varchar(255) | Nom du produit au moment de la commande |
| size | varchar(50) | Taille choisie |
| unit_price | unsigned int | Prix unitaire au moment de la commande |
| quantity | unsigned int | Quantité |

### 6.6 appointments — rendez-vous sur-mesure

| Colonne | Type | Description |
| :--- | :--- | :--- |
| id | bigint, clé primaire |  |
| reference | varchar(50), unique | Ex. : RDV-2026-0001 |
| client_name | varchar(255) | Nom du client |
| client_phone | varchar(50) | Numéro WhatsApp |
| location_type | enum(atelier, domicile) | Lieu du rendez-vous |
| address | text, nullable | Obligatoire si domicile |
| garment_type | varchar(255) | Type de tenue |
| preferred_date | date | Date souhaitée |
| time_slot | varchar(50) | Créneau, ex. 14:00-16:00 |
| notes | text, nullable | Précisions du client |
| measurements | json, nullable | Mensurations saisies par le styliste |
| status | enum | en_attente, confirme, effectue, annule |

### 6.7 flocking_requests — demandes de flocage

| Colonne | Type | Description |
| :--- | :--- | :--- |
| id | bigint, clé primaire |  |
| reference | varchar(50), unique | Ex. : FLOC-2026-0001 |
| client_name | varchar(255) | Nom du client |
| client_phone | varchar(50) | Numéro WhatsApp |
| garment_type | varchar(150) | Vêtement choisi |
| position | varchar(150) | Emplacement du marquage |
| quantity | unsigned int | Nombre de pièces |
| artwork_path | varchar(255), nullable | Chemin du visuel envoyé |
| instructions | text, nullable | Instructions du client |
| quoted_price | unsigned int, nullable | Montant du devis |
| status | enum | nouvelle, devis_envoye, en_production, terminee, annulee |

### 6.8 lookbook_items — photos de la galerie

| Colonne | Type | Description |
| :--- | :--- | :--- |
| id | bigint, clé primaire |  |
| category_id | clé étrangère, nullable | Catégorie |
| title | varchar(255) | Titre |
| description | text, nullable | Description courte |
| image_path | varchar(255) | Chemin de l'image |
| sort_order | int, défaut 0 | Ordre d'affichage |
| is_active | boolean, défaut true | Visible ou non |

### 6.9 contact_messages — messages de contact

| Colonne | Type | Description |
| :--- | :--- | :--- |
| id | bigint, clé primaire |  |
| name | varchar(255) | Nom |
| phone | varchar(50) | Numéro WhatsApp |
| subject | varchar(255) | Objet |
| message | text | Message |
| is_read | boolean, défaut false | Lu ou non |

### 6.10 settings — paramètres du site

| Colonne | Type | Description |
| :--- | :--- | :--- |
| id | bigint, clé primaire |  |
| key | varchar(100), unique | Ex. : whatsapp_number, address, opening_hours |
| value | text, nullable | Valeur |

### 6.11 Références

Les références sont générées par le serveur au format PRÉFIXE-ANNÉE-NUMÉRO sur 4 chiffres (CMD-2026-0001, RDV-2026-0001, FLOC-2026-0001). La numérotation repart à 0001 chaque année.

## 7. API REST

Toutes les routes sont préfixées par /api/v1 et renvoient du JSON.

| Méthode | Route | Description |
| :--- | :--- | :--- |
| GET | /settings | Paramètres publics : numéro WhatsApp, coordonnées, horaires, réseaux sociaux. |
| GET | /categories | Catégories actives (filtre ?type=shop ou ?type=lookbook). |
| GET | /products | Produits actifs. Filtres : ?category=, ?search=, ?sort=, ?featured=1. Paginé. |
| GET | /products/{slug} | Détail d'un produit et produits similaires. |
| GET | /lookbook | Photos actives de la galerie (filtre ?category=). |
| POST | /orders | Création d'une commande. Renvoie reference, total et whatsapp_url. |
| POST | /appointments | Création d'une demande de rendez-vous. Renvoie reference et whatsapp_url. |
| POST | /flocking-requests | Création d'une demande de flocage avec fichier. Renvoie reference, artwork_url et whatsapp_url. |
| POST | /contacts | Enregistrement d'un message. Renvoie whatsapp_url. |

### 7.1 Exemple : création d'une commande

Requête envoyée par le front-office :

```text
POST /api/v1/orders
{
  "customer_name": "Jean DUPONT",
  "customer_phone": "+229XXXXXXXX",
  "customer_address": "Cotonou, Haie Vive",
  "notes": "Livraison le matin",
  "items": [
    { "product_id": 12, "size": "L", "quantity": 1 },
    { "product_id": 4,  "size": "M", "quantity": 2 }
  ]
}
```

Réponse (201) :

```text
{
  "reference": "CMD-2026-0015",
  "total_amount": 195000,
  "whatsapp_url": "https://wa.me/229XXXXXXXX?text=..."
}
```

### 7.2 Règles communes

- Le prix envoyé par le front-office n'est jamais utilisé : le serveur recalcule toujours le total à partir de la base.
- Le serveur vérifie que le produit existe, est actif, que la taille est disponible et que le stock est suffisant.
- Le message WhatsApp est construit côté serveur à partir des données enregistrées.
- Erreurs de validation : code 422 avec la liste des champs en erreur. Erreur serveur : code 500 avec un message générique.

## 8. Exigences techniques

### 8.1 Sécurité

- Validation de toutes les données côté serveur (Form Requests Laravel).
- Fichiers importés : contrôle du type et de la taille, renommage automatique.
- Limitation du nombre de requêtes sur les formulaires publics (anti-spam).
- CORS limité au domaine du front-office.
- HTTPS obligatoire en production, mots de passe chiffrés.

### 8.2 Performance

- Images compressées et redimensionnées à l'import.
- Chargement différé des images dans les listes.
- Pagination des listes de produits.

### 8.3 Compatibilité et ergonomie

- Site entièrement responsive : la majorité des clients utilisent un smartphone.
- Compatibilité avec les versions récentes de Chrome, Safari, Firefox et Edge.
- Formulaires simples, messages d'erreur compréhensibles.

### 8.4 Référencement

- Titre et description propres à chaque page et à chaque produit.
- URL lisibles (slugs), balises alt sur les images, fichier sitemap.

## 9. Livrables

- Code source du front-office et du back-end, versionné sur un dépôt Git.
- Base de données avec migrations et données de démonstration (seeders).
- Site et back-office déployés en production.
- Documentation technique : installation, configuration, déploiement, liste des routes de l'API.
- Guide d'utilisation simple du back-office pour le styliste.
- Accès administrateur remis au client.

## 10. Déroulement du projet

| Phase | Contenu |
| :--- | :--- |
| 1. Mise en place | Installation de Laravel, base de données, migrations, modèles, données de démonstration. |
| 2. Back-office | Authentification, tableau de bord et gestion de toutes les entités. |
| 3. API | Développement des routes de l'API, validation, génération des messages WhatsApp. |
| 4. Intégration | Connexion du front-office React à l'API, suppression des données en dur et de Supabase. |
| 5. Tests et recette | Tests des parcours sur mobile et ordinateur, corrections. |
| 6. Mise en production | Déploiement, configuration du domaine et du HTTPS, prise en main par le styliste. |

## 11. Recette

Le projet est considéré comme terminé lorsque les points suivants sont validés :

- Une commande passée depuis le panier apparaît dans le back-office avec le bon total, et le message WhatsApp reçu est correct.
- Une demande de rendez-vous (atelier et domicile) est enregistrée et transmise sur WhatsApp.
- Une demande de flocage avec visuel est enregistrée, et le visuel est accessible depuis le message WhatsApp et le back-office.
- Un produit, une catégorie ou une photo ajouté dans le back-office apparaît sur le site.
- La modification du numéro WhatsApp dans les paramètres est prise en compte sur tout le site.
- Le site s'affiche correctement sur smartphone, tablette et ordinateur.
