BEGIN TRANSACTION;
CREATE TABLE admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "admins" VALUES(1,'admin','allfashion2026','superadmin','2026-11-28 08:12:14');
CREATE TABLE appointments (
    id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    whatsapp_number TEXT NOT NULL,
    location_type TEXT NOT NULL, -- domicile, bureau, atelier
    address TEXT NOT NULL,
    desired_date TEXT NOT NULL,
    garment_idea TEXT,
    status TEXT DEFAULT 'a_confirmer', -- a_confirmer, confirme, termine
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "appointments" VALUES('RDV-2026-089','Marius Biaou','+229 90 00 11 22','domicile','Akpakpa, Cotonou','2026-12-05','Costume sur-mesure pour gala de fin d''année','confirme','2026-11-28 08:12:14');
INSERT INTO "appointments" VALUES('RDV-2026-090','Diane Sossou','+229 95 44 33 22','bureau','Ganhi, Immeuble BOA','2026-12-08','Deux ensembles tailleurs féminins','a_confirmer','2026-11-28 08:12:14');
CREATE TABLE categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    image TEXT,
    count INTEGER DEFAULT 0,
    display_order INTEGER DEFAULT 0
);
INSERT INTO "categories" VALUES('HOMME','Collection Homme','/images/look-imprime-2.jpg',6,1);
INSERT INTO "categories" VALUES('FEMME','Collection Femme','/assets/img/creation-2.jpg',4,2);
INSERT INTO "categories" VALUES('SUR_MESURE','Ligne Sur-Mesure','/assets/img/creation-1.jpg',8,3);
INSERT INTO "categories" VALUES('STREETWEAR','Streetwear & Flocage','/assets/img/creation-4.jpg',3,4);
CREATE TABLE orders (
    id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    whatsapp_number TEXT NOT NULL,
    delivery_address TEXT NOT NULL,
    items TEXT NOT NULL, -- JSON
    total_amount INTEGER NOT NULL,
    status TEXT DEFAULT 'en_attente', -- en_attente, confirmee, livree, annulee
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "orders" VALUES('CMD-2026-1042','Koffi Mensah','+229 97 12 34 56','Haie Vive, Cotonou','[{"name": "Veste Crois\u00e9e Coupe Tailleur", "size": "L", "price": 95000, "quantity": 1}]',95000,'confirmee','Livraison en soirée après 18h','2026-11-28 08:12:14');
INSERT INTO "orders" VALUES('CMD-2026-1043','Amina Bello','+229 66 88 99 00','Cadjehoun, Cotonou','[{"name": "Gilet Artistique Imprim\u00e9 AllFashion", "size": "M", "price": 65000, "quantity": 1}]',65000,'en_attente','Contactée sur WhatsApp','2026-11-28 08:12:14');
CREATE TABLE products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price INTEGER NOT NULL,
    is_new BOOLEAN DEFAULT 0,
    is_bestseller BOOLEAN DEFAULT 0,
    in_stock BOOLEAN DEFAULT 1,
    description TEXT,
    image TEXT NOT NULL,
    images TEXT, -- JSON array
    sizes TEXT,  -- JSON array
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "products" VALUES('costume-3-pieces','Costume 3 Pièces Cérémonie','SUR_MESURE',185000,1,1,1,'Ensemble trois pièces raffiné comprenant veste croisée, gilet tailleur et pantalon droit. Idéal pour mariages et cérémonies d''exception.','/assets/img/creation-1.jpg','["/assets/img/creation-1.jpg"]','["Sur-Mesure", "M", "L", "XL"]','2026-11-28 08:12:14');
INSERT INTO "products" VALUES('robe-monochrome-sculpturale','Robe Sculpturale Haute Couture','FEMME',145000,1,0,1,'Robe monochrome au drapé architectural en crêpe noir et satin blanc. Conçue pour sublimer la silhouette lors de galas et réceptions privées.','/assets/img/creation-2.jpg','["/assets/img/creation-2.jpg"]','["Sur-Mesure", "S", "M", "L"]','2026-11-28 08:12:14');
INSERT INTO "products" VALUES('veste-croisee-atelier','Veste Croisée Coupe Tailleur','HOMME',95000,0,1,1,'Veste croisée droite à revers lancés en gabardine de laine. La pièce maîtresse du vestiaire AllFashion.','/assets/img/creation-3.jpg','["/assets/img/creation-3.jpg"]','["M", "L", "XL"]','2026-11-28 08:12:14');
INSERT INTO "products" VALUES('ensemble-streetwear-signature','Ensemble Streetwear Noir & Blanc','STREETWEAR',75000,1,1,1,'Ensemble décontracté et soigné, combinant style urbain et finitions d''atelier. Personnalisable avec votre nom ou numéro en flocage.','/assets/img/creation-4.jpg','["/assets/img/creation-4.jpg"]','["S", "M", "L", "XL"]','2026-11-28 08:12:14');
INSERT INTO "products" VALUES('chemise-col-officier-graphique','Chemise Col Officier Graphique','HOMME',45000,0,0,1,'Chemise en popeline de coton haute densité, boutonnage dissimulé et motifs géométriques sobres.','/assets/img/creation-5.jpg','["/assets/img/creation-5.jpg"]','["S", "M", "L", "XL"]','2026-11-28 08:12:14');
INSERT INTO "products" VALUES('pantalon-droit-noir','Pantalon Droit Coupe Nette','HOMME',40000,0,0,1,'Pantalon de costume élégant à pli franc, confectionné sur-mesure ou en prêt-à-porter.','/images/look-argent-1.jpg','["/images/look-argent-1.jpg"]','["M", "L", "XL"]','2026-11-28 08:12:14');
INSERT INTO "products" VALUES('gilet-sans-manche-imprime','Gilet Artistique Imprimé AllFashion','HOMME',65000,1,1,1,'La création signature portée par le styliste AllFashion. Gilet sans manche à col chemisier dans un imprimé exclusif.','/images/look-imprime-2.jpg','["/images/look-imprime-2.jpg"]','["Sur-Mesure", "M", "L", "XL"]','2026-11-28 08:12:14');
CREATE TABLE realisations (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    image TEXT NOT NULL,
    description TEXT,
    badge TEXT,
    is_featured BOOLEAN DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "realisations" VALUES('real-1','Costume Croisé 3 Pièces','Sur-Mesure Cérémonie','/assets/img/creation-1.jpg','Coupe droite élégante, veste structurée et finitions soignées pour mariage.','Cérémonie',1,'2026-11-28 08:12:14');
INSERT INTO "realisations" VALUES('real-2','Robe Sculpturale Monochrome','Haute Couture','/assets/img/creation-2.jpg','Jeu de contrastes noir et blanc fluide pour soirée de gala.','Édition Privée',1,'2026-11-28 08:12:14');
INSERT INTO "realisations" VALUES('real-3','Gilet Artistique Imprimé','Signature Styliste','/images/look-imprime-2.jpg','La création signature portée par le styliste créateur AllFashion.','Créateur',1,'2026-11-28 08:12:14');
DELETE FROM "sqlite_sequence";
INSERT INTO "sqlite_sequence" VALUES('admins',1);
COMMIT;
