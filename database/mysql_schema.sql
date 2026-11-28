-- ========================================================
-- BASE DE DONNÉES ALLFASHION POUR TABLEPLUS (MySQL / MariaDB)
-- Host: 127.0.0.1 | Port: 3306 | User: root | Password: (aucun)
-- ========================================================

CREATE DATABASE IF NOT EXISTS allfashion CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE allfashion;

DROP TABLE IF EXISTS appointments;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS realisations;
DROP TABLE IF EXISTS admins;

CREATE TABLE categories (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    image TEXT,
    count INT DEFAULT 0,
    display_order INT DEFAULT 0
) ENGINE=InnoDB;

CREATE TABLE products (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    category VARCHAR(50) NOT NULL,
    price INT NOT NULL,
    is_new TINYINT(1) DEFAULT 0,
    is_bestseller TINYINT(1) DEFAULT 0,
    in_stock TINYINT(1) DEFAULT 1,
    description TEXT,
    image TEXT NOT NULL,
    images JSON,
    sizes JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE orders (
    id VARCHAR(50) PRIMARY KEY,
    customer_name VARCHAR(120) NOT NULL,
    whatsapp_number VARCHAR(30) NOT NULL,
    delivery_address TEXT NOT NULL,
    items JSON NOT NULL,
    total_amount INT NOT NULL,
    status ENUM('en_attente', 'confirmee', 'livree', 'annulee') DEFAULT 'en_attente',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE appointments (
    id VARCHAR(50) PRIMARY KEY,
    customer_name VARCHAR(120) NOT NULL,
    whatsapp_number VARCHAR(30) NOT NULL,
    location_type ENUM('domicile', 'bureau', 'atelier') NOT NULL,
    address TEXT NOT NULL,
    desired_date DATE NOT NULL,
    garment_idea TEXT,
    status ENUM('a_confirmer', 'confirme', 'termine') DEFAULT 'a_confirmer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE realisations (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    category VARCHAR(100) NOT NULL,
    image TEXT NOT NULL,
    description TEXT,
    badge VARCHAR(50),
    is_featured TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Données initiales
INSERT INTO admins (username, password, role) VALUES ('admin', 'allfashion2026', 'superadmin');

INSERT INTO categories (id, name, image, count, display_order) VALUES
('HOMME', 'Collection Homme', '/images/look-imprime-2.jpg', 6, 1),
('FEMME', 'Collection Femme', '/assets/img/creation-2.jpg', 4, 2),
('SUR_MESURE', 'Ligne Sur-Mesure', '/assets/img/creation-1.jpg', 8, 3),
('STREETWEAR', 'Streetwear & Flocage', '/assets/img/creation-4.jpg', 3, 4);

INSERT INTO products (id, name, category, price, is_new, is_bestseller, in_stock, description, image, images, sizes) VALUES
('costume-3-pieces', 'Costume 3 Pièces Cérémonie', 'SUR_MESURE', 185000, 1, 1, 1, 'Ensemble trois pièces raffiné comprenant veste croisée, gilet tailleur et pantalon droit. Idéal pour mariages et cérémonies d'exception.', '/assets/img/creation-1.jpg', '["/assets/img/creation-1.jpg"]', '["Sur-Mesure", "M", "L", "XL"]'),
('robe-monochrome-sculpturale', 'Robe Sculpturale Haute Couture', 'FEMME', 145000, 1, 0, 1, 'Robe monochrome au drapé architectural en crêpe noir et satin blanc. Conçue pour sublimer la silhouette lors de galas et réceptions privées.', '/assets/img/creation-2.jpg', '["/assets/img/creation-2.jpg"]', '["Sur-Mesure", "S", "M", "L"]'),
('veste-croisee-atelier', 'Veste Croisée Coupe Tailleur', 'HOMME', 95000, 0, 1, 1, 'Veste croisée droite à revers lancés en gabardine de laine. La pièce maîtresse du vestiaire AllFashion.', '/assets/img/creation-3.jpg', '["/assets/img/creation-3.jpg"]', '["M", "L", "XL"]'),
('ensemble-streetwear-signature', 'Ensemble Streetwear Noir & Blanc', 'STREETWEAR', 75000, 1, 1, 1, 'Ensemble décontracté et soigné, combinant style urbain et finitions d'atelier. Personnalisable avec votre nom ou numéro en flocage.', '/assets/img/creation-4.jpg', '["/assets/img/creation-4.jpg"]', '["S", "M", "L", "XL"]'),
('chemise-col-officier-graphique', 'Chemise Col Officier Graphique', 'HOMME', 45000, 0, 0, 1, 'Chemise en popeline de coton haute densité, boutonnage dissimulé et motifs géométriques sobres.', '/assets/img/creation-5.jpg', '["/assets/img/creation-5.jpg"]', '["S", "M", "L", "XL"]'),
('pantalon-droit-noir', 'Pantalon Droit Coupe Nette', 'HOMME', 40000, 0, 0, 1, 'Pantalon de costume élégant à pli franc, confectionné sur-mesure ou en prêt-à-porter.', '/images/look-argent-1.jpg', '["/images/look-argent-1.jpg"]', '["M", "L", "XL"]'),
('gilet-sans-manche-imprime', 'Gilet Artistique Imprimé AllFashion', 'HOMME', 65000, 1, 1, 1, 'La création signature portée par le styliste AllFashion. Gilet sans manche à col chemisier dans un imprimé exclusif.', '/images/look-imprime-2.jpg', '["/images/look-imprime-2.jpg"]', '["Sur-Mesure", "M", "L", "XL"]');

INSERT INTO realisations (id, title, category, image, description, badge, is_featured) VALUES
('real-1', 'Costume Croisé 3 Pièces', 'Sur-Mesure Cérémonie', '/assets/img/creation-1.jpg', 'Coupe droite élégante, veste structurée et finitions soignées pour mariage.', 'Cérémonie', 1),
('real-2', 'Robe Sculpturale Monochrome', 'Haute Couture', '/assets/img/creation-2.jpg', 'Jeu de contrastes noir et blanc fluide pour soirée de gala.', 'Édition Privée', 1),
('real-3', 'Gilet Artistique Imprimé', 'Signature Styliste', '/images/look-imprime-2.jpg', 'La création signature portée par le styliste créateur AllFashion.', 'Créateur', 1);

INSERT INTO orders (id, customer_name, whatsapp_number, delivery_address, items, total_amount, status, notes) VALUES
('CMD-2026-1042', 'Koffi Mensah', '+229 97 12 34 56', 'Haie Vive, Cotonou', '[{"name": "Veste Croisée Coupe Tailleur", "size": "L", "price": 95000, "quantity": 1}]', 95000, 'confirmee', 'Livraison en soirée après 18h'),
('CMD-2026-1043', 'Amina Bello', '+229 66 88 99 00', 'Cadjehoun, Cotonou', '[{"name": "Gilet Artistique Imprimé AllFashion", "size": "M", "price": 65000, "quantity": 1}]', 65000, 'en_attente', 'Contactée sur WhatsApp');

INSERT INTO appointments (id, customer_name, whatsapp_number, location_type, address, desired_date, garment_idea, status) VALUES
('RDV-2026-089', 'Marius Biaou', '+229 90 00 11 22', 'domicile', 'Akpakpa, Cotonou', '2026-12-05', 'Costume sur-mesure pour gala de fin d'année', 'confirme'),
('RDV-2026-090', 'Diane Sossou', '+229 95 44 33 22', 'bureau', 'Ganhi, Immeuble BOA', '2026-12-08', 'Deux ensembles tailleurs féminins', 'a_confirmer');
