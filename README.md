# Atelier Raphaël — Plateforme Digitale (Front-Office React & Backend Laravel 11)

Plateforme web officielle de la maison de couture et de stylisme **Atelier Raphaël** (Cotonou, Bénin), combinant :
1. **Boutique Prêt-à-Porter (WhatsApp Commerce)** : Catalogue, filtres, fiches produits, panier interactif et validation de commande sur WhatsApp après enregistrement en base de données.
2. **Service Sur-Mesure & Prise de Rendez-vous** : Réservation en ligne avec choix entre **Rendez-vous à l'Atelier** ou **Déplacement VIP à Domicile / Bureau**.
3. **Studio de Flocage & Personnalisation Textile** : Configurateur interactif avec aperçu en direct du logo sur le vêtement et demande de devis.
4. **Galerie Lookbook & Univers de l'Atelier** : Vitrine photographique haute définition avec visionneuse plein écran (Lightbox).

---

## Documents du Cahier des Charges

Toute l'architecture fonctionnelle et technique (pages Front-Office, Back-Office Administrateur Laravel, schéma complet des 10 tables MySQL / Migrations Laravel et routes API REST `/api/v1/...`) est détaillée dans :

- **Version PDF** : [`CAHIER_DES_CHARGES_ATELIER_RAPHAEL.pdf`](./CAHIER_DES_CHARGES_ATELIER_RAPHAEL.pdf)
- **Version Word (`.docx`)** : [`CAHIER_DES_CHARGES_ATELIER_RAPHAEL.docx`](./CAHIER_DES_CHARGES_ATELIER_RAPHAEL.docx)
- **Version Markdown (`.md`)** : [`CAHIER_DES_CHARGES.md`](./CAHIER_DES_CHARGES.md)

---

## Stack Technique

- **Front-Office (présent dans ce dépôt)** : React 18, Vite, React Router DOM v6, Lucide Icons, CSS Custom.
- **Backend & API REST (à connecter)** : Laravel 11 (PHP 8.2+), MySQL 8+, Laravel Storage, Back-Office Laravel (Filament PHP ou Blade/Inertia).

---

## Démarrage du Front-Office (Développement)

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement Vite
npm run dev

# 3. Compiler pour la production
npm run build
```
