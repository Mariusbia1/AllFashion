-- Base de données MySQL AllFashion pour TablePlus / Herd
CREATE DATABASE IF NOT EXISTS `allfashion` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `allfashion`;

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations` (`id` integer primary key autoincrement not null, `migration` varchar not null, `batch` integer not null);

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
  (1, '0001_01_01_000000_create_users_table', 1),
  (2, '0001_01_01_000001_create_cache_table', 1),
  (3, '0001_01_01_000002_create_jobs_table', 1),
  (4, '2026_11_28_090650_create_personal_access_tokens_table', 1),
  (5, '2026_11_28_100000_create_allfashion_tables', 2);

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (`id` integer primary key autoincrement not null, `name` varchar not null, `email` varchar not null, `email_verified_at` datetime, `password` varchar not null, `remember_token` varchar, `created_at` datetime, `updated_at` datetime, `role` varchar not null default 'admin');

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `role`) VALUES
  (1, 'Styliste Créateur AllFashion', 'admin@allfashion.com', NULL, '$2y$12$o3Tq5tIcOZ32HPjUMNZs6OHXGL3wNPfnt98SllVQWjYqVO8o0OKjy', NULL, '2026-11-28 09:10:17', '2026-11-28 09:10:17', 'admin');

DROP TABLE IF EXISTS `password_reset_tokens`;
CREATE TABLE `password_reset_tokens` (`email` varchar not null, `token` varchar not null, `created_at` datetime, primary key (`email`));

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions` (`id` varchar not null, `user_id` integer, `ip_address` varchar, `user_agent` text, `payload` text not null, `last_activity` integer not null, primary key (`id`));

DROP TABLE IF EXISTS `cache`;
CREATE TABLE `cache` (`key` varchar not null, `value` text not null, `expiration` integer not null, primary key (`key`));

DROP TABLE IF EXISTS `cache_locks`;
CREATE TABLE `cache_locks` (`key` varchar not null, `owner` varchar not null, `expiration` integer not null, primary key (`key`));

DROP TABLE IF EXISTS `jobs`;
CREATE TABLE `jobs` (`id` integer primary key autoincrement not null, `queue` varchar not null, `payload` text not null, `attempts` integer not null, `reserved_at` integer, `available_at` integer not null, `created_at` integer not null);

DROP TABLE IF EXISTS `job_batches`;
CREATE TABLE `job_batches` (`id` varchar not null, `name` varchar not null, `total_jobs` integer not null, `pending_jobs` integer not null, `failed_jobs` integer not null, `failed_job_ids` text not null, `options` text, `cancelled_at` integer, `created_at` integer not null, `finished_at` integer, primary key (`id`));

DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE `failed_jobs` (`id` integer primary key autoincrement not null, `uuid` varchar not null, `connection` text not null, `queue` text not null, `payload` text not null, `exception` text not null, `failed_at` datetime not null default CURRENT_TIMESTAMP);

DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE `personal_access_tokens` (`id` integer primary key autoincrement not null, `tokenable_type` varchar not null, `tokenable_id` integer not null, `name` text not null, `token` varchar not null, `abilities` text, `last_used_at` datetime, `expires_at` datetime, `created_at` datetime, `updated_at` datetime);

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (`id` integer primary key autoincrement not null, `name` varchar not null, `slug` varchar not null, `type` varchar not null default 'shop', `sort_order` integer not null default '0', `is_active` tinyint(1) not null default '1', `created_at` datetime, `updated_at` datetime);

INSERT INTO `categories` (`id`, `name`, `slug`, `type`, `sort_order`, `is_active`, `created_at`, `updated_at`) VALUES
  (1, 'Homme', 'HOMME', 'shop', 1, 1, '2026-11-28 09:10:17', '2026-11-28 09:10:17'),
  (2, 'Femme', 'FEMME', 'shop', 2, 1, '2026-11-28 09:10:17', '2026-11-28 09:10:17'),
  (3, 'Enfant', 'ENFANT', 'shop', 3, 1, '2026-11-28 09:10:17', '2026-11-28 09:10:17'),
  (4, 'Cérémonie & Sur-Mesure', 'CEREMONIE', 'shop', 4, 1, '2026-11-28 09:10:17', '2026-11-28 09:10:17'),
  (5, 'Accessoires', 'ACCESSOIRES', 'shop', 5, 1, '2026-11-28 09:10:17', '2026-11-28 09:10:17'),
  (6, 'Galerie Atelier', 'ATELIER', 'lookbook', 6, 1, '2026-11-28 09:10:17', '2026-11-28 09:10:17');

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (`id` integer primary key autoincrement not null, `category_id` integer, `name` varchar not null, `slug` varchar not null, `price` integer not null, `badge` varchar, `description` text, `details` text, `sizes` text, `main_image` varchar not null, `gallery` text, `stock` integer not null default '10', `is_featured` tinyint(1) not null default '0', `is_active` tinyint(1) not null default '1', `created_at` datetime, `updated_at` datetime, foreign key(`category_id`) references `categories`(`id`) on delete set null);

INSERT INTO `products` (`id`, `category_id`, `name`, `slug`, `price`, `badge`, `description`, `details`, `sizes`, `main_image`, `gallery`, `stock`, `is_featured`, `is_active`, `created_at`, `updated_at`) VALUES
  (1, 1, 'Veste Croisée Coupe Tailleur', 'veste-croisee-tailleur', 95000, 'Signature Atelier', 'Veste croisée noire structurée avec double boutonnage et finitions cousues main.', '["Laine froide & soie","Doublure satin\u00e9e respirante","Poches passepoil\u00e9es"]', '["S","M","L","XL","Sur-Mesure"]', '/assets/img/creation-1.jpg', NULL, 8, 1, 1, '2026-11-28 09:10:17', '2026-11-28 09:10:17'),
  (2, 2, 'Robe Noire Sculpturale Asymétrique', 'robe-sculpturale-monochrome', 110000, 'Édition Privée', 'Coupe asymétrique fluide en crêpe lourd de soie pour soirées de gala et réceptions.', '["Cr\u00eape lourd & taffetas","Fermeture invisible au dos","Fente lat\u00e9rale mesur\u00e9e"]', '["XS","S","M","L","Sur-Mesure"]', '/assets/img/creation-2.jpg', NULL, 5, 1, 1, '2026-11-28 09:10:17', '2026-11-28 09:10:17'),
  (3, 1, 'Gilet Artistique Imprimé AllFashion', 'gilet-imprime-signature', 65000, 'Créateur', 'La pièce maîtresse créée et portée par le styliste AllFashion. Motifs graphiques contemporains.', '["Coton textur\u00e9 exclusif","Col tailleur moderne","Boutons mat"]', '["S","M","L","XL"]', '/images/look-imprime-2.jpg', NULL, 12, 1, 1, '2026-11-28 09:10:17', '2026-11-28 09:10:17'),
  (4, 4, 'Ensemble Cérémonie 3 Pièces', 'ensemble-ceremonie-3-pieces', 185000, 'Sur-Mesure', 'Ensemble complet comprenant veste, gilet et pantalon cintré pour mariages et cérémonies officielles.', '["Laine peign\u00e9e haut de gamme","Boutonnage nacr\u00e9","Ajustement morphologique complet"]', '["S","M","L","XL","Sur-Mesure"]', '/assets/img/creation-4.jpg', NULL, 6, 0, 1, '2026-11-28 09:10:17', '2026-11-28 09:10:17'),
  (5, 1, 'T-shirt Épuré Coton Égyptien', 'tshirt-epure-coton-egyptien', 25000, 'Essentiel', 'Coton 280g/m² au tombé dense et structuré. Parfait pour le flocage personnalisé.', '["100% coton peign\u00e9 lourd","Col renforc\u00e9 ind\u00e9formable","Compatible flocage personnalisable"]', '["S","M","L","XL","XXL"]', '/assets/img/creation-3.jpg', NULL, 25, 0, 1, '2026-11-28 09:10:17', '2026-11-28 09:10:17'),
  (6, 3, 'Costume Junior Cérémonie', 'costume-junior-ceremonie', 55000, 'Junior', 'Coupe raffinée adaptée aux enfants pour cortèges, baptêmes et mariages.', '["Tissu souple et confortable","Taille ajustable","Finitions soign\u00e9es"]', '["4-6 ans","8-10 ans","12-14 ans","Sur-Mesure"]', '/assets/img/creation-5.jpg', NULL, 10, 0, 1, '2026-11-28 09:10:17', '2026-11-28 09:10:17');

DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (`id` integer primary key autoincrement not null, `reference` varchar not null, `customer_name` varchar not null, `customer_phone` varchar not null, `customer_address` text not null, `notes` text, `total_amount` integer not null default '0', `status` varchar not null default 'en_attente', `created_at` datetime, `updated_at` datetime);

INSERT INTO `orders` (`id`, `reference`, `customer_name`, `customer_phone`, `customer_address`, `notes`, `total_amount`, `status`, `created_at`, `updated_at`) VALUES
  (1, 'CMD-2026-0001', 'Koffi Mensah', '+229 97 12 34 56', 'Haie Vive, Cotonou', 'Livraison souhaitée en soirée après 18h', 95000, 'confirmee', '2026-11-28 09:10:17', '2026-11-28 09:10:17');

DROP TABLE IF EXISTS `order_items`;
CREATE TABLE `order_items` (`id` integer primary key autoincrement not null, `order_id` integer not null, `product_id` integer, `product_name` varchar not null, `size` varchar not null, `unit_price` integer not null, `quantity` integer not null default '1', `created_at` datetime, `updated_at` datetime, foreign key(`order_id`) references `orders`(`id`) on delete cascade, foreign key(`product_id`) references `products`(`id`) on delete set null);

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `product_name`, `size`, `unit_price`, `quantity`, `created_at`, `updated_at`) VALUES
  (1, 1, NULL, 'Veste Croisée Coupe Tailleur', 'L', 95000, 1, '2026-11-28 09:10:17', '2026-11-28 09:10:17');

DROP TABLE IF EXISTS `appointments`;
CREATE TABLE `appointments` (`id` integer primary key autoincrement not null, `reference` varchar not null, `client_name` varchar not null, `client_phone` varchar not null, `location_type` varchar not null default 'domicile', `address` text, `garment_type` varchar, `preferred_date` varchar, `time_slot` varchar, `notes` text, `measurements` text, `status` varchar not null default 'en_attente', `created_at` datetime, `updated_at` datetime);

INSERT INTO `appointments` (`id`, `reference`, `client_name`, `client_phone`, `location_type`, `address`, `garment_type`, `preferred_date`, `time_slot`, `notes`, `measurements`, `status`, `created_at`, `updated_at`) VALUES
  (1, 'RDV-2026-0001', 'Patrice Talon', '+229 66 55 44 33', 'domicile', 'Quartier Les Cocotiers, Cotonou', 'Costume 3 pièces Cérémonie sur-mesure', '2026-12-05', '15:00 - 17:00', 'Appel avant de se déplacer', NULL, 'confirme', '2026-11-28 09:10:17', '2026-11-28 09:10:17');

DROP TABLE IF EXISTS `flocking_requests`;
CREATE TABLE `flocking_requests` (`id` integer primary key autoincrement not null, `reference` varchar not null, `client_name` varchar not null, `client_phone` varchar not null, `garment_type` varchar, `position` varchar, `quantity` integer not null default '1', `artwork_path` varchar, `instructions` text, `quoted_price` integer, `status` varchar not null default 'nouvelle', `created_at` datetime, `updated_at` datetime);

DROP TABLE IF EXISTS `lookbook_items`;
CREATE TABLE `lookbook_items` (`id` integer primary key autoincrement not null, `category_id` integer, `title` varchar not null, `description` text, `image_path` varchar not null, `sort_order` integer not null default '0', `is_active` tinyint(1) not null default '1', `created_at` datetime, `updated_at` datetime, foreign key(`category_id`) references `categories`(`id`) on delete set null);

INSERT INTO `lookbook_items` (`id`, `category_id`, `title`, `description`, `image_path`, `sort_order`, `is_active`, `created_at`, `updated_at`) VALUES
  (1, NULL, 'Costume Croisé 3 Pièces Cérémonie', NULL, '/assets/img/creation-1.jpg', 1, 1, '2026-11-28 09:10:17', '2026-11-28 09:10:17'),
  (2, NULL, 'Robe Sculpturale Noire', NULL, '/assets/img/creation-2.jpg', 2, 1, '2026-11-28 09:10:17', '2026-11-28 09:10:17'),
  (3, NULL, 'Gilet Styliste AllFashion', NULL, '/images/look-imprime-2.jpg', 3, 1, '2026-11-28 09:10:17', '2026-11-28 09:10:17'),
  (4, NULL, 'Smoking Nuit Atelier', NULL, '/assets/img/creation-4.jpg', 4, 1, '2026-11-28 09:10:17', '2026-11-28 09:10:17'),
  (5, NULL, 'Manteau Déstructuré Tailleur', NULL, '/assets/img/creation-5.jpg', 5, 1, '2026-11-28 09:10:17', '2026-11-28 09:10:17');

DROP TABLE IF EXISTS `contact_messages`;
CREATE TABLE `contact_messages` (`id` integer primary key autoincrement not null, `name` varchar not null, `phone` varchar not null, `subject` varchar not null, `message` text not null, `is_read` tinyint(1) not null default '0', `created_at` datetime, `updated_at` datetime);

DROP TABLE IF EXISTS `settings`;
CREATE TABLE `settings` (`id` integer primary key autoincrement not null, `key` varchar not null, `value` text, `created_at` datetime, `updated_at` datetime);

INSERT INTO `settings` (`id`, `key`, `value`, `created_at`, `updated_at`) VALUES
  (1, 'whatsapp_number', '22997000000', '2026-11-28 09:10:17', '2026-11-28 09:10:17'),
  (2, 'phone', '+229 97 00 00 00', '2026-11-28 09:10:17', '2026-11-28 09:10:17'),
  (3, 'email', 'contact@allfashion.com', '2026-11-28 09:10:17', '2026-11-28 09:10:17'),
  (4, 'address', 'Atelier AllFashion, Haie Vive, Cotonou, Bénin', '2026-11-28 09:10:17', '2026-11-28 09:10:17'),
  (5, 'opening_hours', 'Lun - Sam : 09h00 - 19h30', '2026-11-28 09:10:17', '2026-11-28 09:10:17'),
  (6, 'announcement_banner', 'Atelier de Haute Confection & Sur-Mesure • Cotonou, Bénin', '2026-11-28 09:10:17', '2026-11-28 09:10:17'),
  (7, 'instagram', 'https://instagram.com/allfashion', '2026-11-28 09:10:17', '2026-11-28 09:10:17'),
  (8, 'facebook', 'https://facebook.com/allfashion', '2026-11-28 09:10:17', '2026-11-28 09:10:17');

SET FOREIGN_KEY_CHECKS = 1;
