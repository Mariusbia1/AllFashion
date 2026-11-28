<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Product;
use App\Models\Order;
use App\Models\Appointment;
use App\Models\LookbookItem;
use App\Models\Setting;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Administrateur
        User::updateOrCreate(
            ['email' => 'admin@allfashion.com'],
            [
                'name' => 'Styliste Créateur AllFashion',
                'password' => Hash::make('allfashion2026'),
                'role' => 'admin',
            ]
        );

        // 2. Paramètres du site
        $settings = [
            'whatsapp_number' => '22997000000',
            'phone' => '+229 97 00 00 00',
            'email' => 'contact@allfashion.com',
            'address' => 'Atelier AllFashion, Haie Vive, Cotonou, Bénin',
            'opening_hours' => 'Lun - Sam : 09h00 - 19h30',
            'announcement_banner' => 'Atelier de Haute Confection & Sur-Mesure • Cotonou, Bénin',
            'instagram' => 'https://instagram.com/allfashion',
            'facebook' => 'https://facebook.com/allfashion',
        ];

        foreach ($settings as $key => $val) {
            Setting::updateOrCreate(['key' => $key], ['value' => $val]);
        }

        // 3. Catégories
        $categoriesData = [
            ['name' => 'Homme', 'slug' => 'HOMME', 'type' => 'shop', 'sort_order' => 1],
            ['name' => 'Femme', 'slug' => 'FEMME', 'type' => 'shop', 'sort_order' => 2],
            ['name' => 'Enfant', 'slug' => 'ENFANT', 'type' => 'shop', 'sort_order' => 3],
            ['name' => 'Cérémonie & Sur-Mesure', 'slug' => 'CEREMONIE', 'type' => 'shop', 'sort_order' => 4],
            ['name' => 'Accessoires', 'slug' => 'ACCESSOIRES', 'type' => 'shop', 'sort_order' => 5],
            ['name' => 'Galerie Atelier', 'slug' => 'ATELIER', 'type' => 'lookbook', 'sort_order' => 6],
        ];

        $categoriesMap = [];
        foreach ($categoriesData as $c) {
            $cat = Category::updateOrCreate(['slug' => $c['slug']], $c);
            $categoriesMap[$c['slug']] = $cat->id;
        }

        // 4. Produits initiaux
        $products = [
            [
                'name' => 'Veste Croisée Coupe Tailleur',
                'slug' => 'veste-croisee-tailleur',
                'price' => 95000,
                'category_id' => $categoriesMap['HOMME'] ?? null,
                'badge' => 'Signature Atelier',
                'description' => 'Veste croisée noire structurée avec double boutonnage et finitions cousues main.',
                'details' => ['Laine froide & soie', 'Doublure satinée respirante', 'Poches passepoilées'],
                'sizes' => ['S', 'M', 'L', 'XL', 'Sur-Mesure'],
                'main_image' => '/assets/img/creation-1.jpg',
                'stock' => 8,
                'is_featured' => true,
            ],
            [
                'name' => 'Robe Noire Sculpturale Asymétrique',
                'slug' => 'robe-sculpturale-monochrome',
                'price' => 110000,
                'category_id' => $categoriesMap['FEMME'] ?? null,
                'badge' => 'Édition Privée',
                'description' => 'Coupe asymétrique fluide en crêpe lourd de soie pour soirées de gala et réceptions.',
                'details' => ['Crêpe lourd & taffetas', 'Fermeture invisible au dos', 'Fente latérale mesurée'],
                'sizes' => ['XS', 'S', 'M', 'L', 'Sur-Mesure'],
                'main_image' => '/assets/img/creation-2.jpg',
                'stock' => 5,
                'is_featured' => true,
            ],
            [
                'name' => 'Gilet Artistique Imprimé AllFashion',
                'slug' => 'gilet-imprime-signature',
                'price' => 65000,
                'category_id' => $categoriesMap['HOMME'] ?? null,
                'badge' => 'Créateur',
                'description' => 'La pièce maîtresse créée et portée par le styliste AllFashion. Motifs graphiques contemporains.',
                'details' => ['Coton texturé exclusif', 'Col tailleur moderne', 'Boutons mat'],
                'sizes' => ['S', 'M', 'L', 'XL'],
                'main_image' => '/images/look-imprime-2.jpg',
                'stock' => 12,
                'is_featured' => true,
            ],
            [
                'name' => 'Ensemble Cérémonie 3 Pièces',
                'slug' => 'ensemble-ceremonie-3-pieces',
                'price' => 185000,
                'category_id' => $categoriesMap['CEREMONIE'] ?? null,
                'badge' => 'Sur-Mesure',
                'description' => 'Ensemble complet comprenant veste, gilet et pantalon cintré pour mariages et cérémonies officielles.',
                'details' => ['Laine peignée haut de gamme', 'Boutonnage nacré', 'Ajustement morphologique complet'],
                'sizes' => ['S', 'M', 'L', 'XL', 'Sur-Mesure'],
                'main_image' => '/assets/img/creation-4.jpg',
                'stock' => 6,
                'is_featured' => false,
            ],
            [
                'name' => 'T-shirt Épuré Coton Égyptien',
                'slug' => 'tshirt-epure-coton-egyptien',
                'price' => 25000,
                'category_id' => $categoriesMap['HOMME'] ?? null,
                'badge' => 'Essentiel',
                'description' => 'Coton 280g/m² au tombé dense et structuré. Parfait pour le flocage personnalisé.',
                'details' => ['100% coton peigné lourd', 'Col renforcé indéformable', 'Compatible flocage personnalisable'],
                'sizes' => ['S', 'M', 'L', 'XL', 'XXL'],
                'main_image' => '/assets/img/creation-3.jpg',
                'stock' => 25,
                'is_featured' => false,
            ],
            [
                'name' => 'Costume Junior Cérémonie',
                'slug' => 'costume-junior-ceremonie',
                'price' => 55000,
                'category_id' => $categoriesMap['ENFANT'] ?? null,
                'badge' => 'Junior',
                'description' => 'Coupe raffinée adaptée aux enfants pour cortèges, baptêmes et mariages.',
                'details' => ['Tissu souple et confortable', 'Taille ajustable', 'Finitions soignées'],
                'sizes' => ['4-6 ans', '8-10 ans', '12-14 ans', 'Sur-Mesure'],
                'main_image' => '/assets/img/creation-5.jpg',
                'stock' => 10,
                'is_featured' => false,
            ],
        ];

        foreach ($products as $p) {
            Product::updateOrCreate(['slug' => $p['slug']], $p);
        }

        // 5. Lookbook Items
        $lookbook = [
            ['title' => 'Costume Croisé 3 Pièces Cérémonie', 'image_path' => '/assets/img/creation-1.jpg', 'sort_order' => 1],
            ['title' => 'Robe Sculpturale Noire', 'image_path' => '/assets/img/creation-2.jpg', 'sort_order' => 2],
            ['title' => 'Gilet Styliste AllFashion', 'image_path' => '/images/look-imprime-2.jpg', 'sort_order' => 3],
            ['title' => 'Smoking Nuit Atelier', 'image_path' => '/assets/img/creation-4.jpg', 'sort_order' => 4],
            ['title' => 'Manteau Déstructuré Tailleur', 'image_path' => '/assets/img/creation-5.jpg', 'sort_order' => 5],
        ];

        foreach ($lookbook as $item) {
            LookbookItem::updateOrCreate(['title' => $item['title']], $item);
        }

        // 6. Commande de démonstration
        $order = Order::updateOrCreate(
            ['reference' => 'CMD-2026-0001'],
            [
                'customer_name' => 'Koffi Mensah',
                'customer_phone' => '+229 97 12 34 56',
                'customer_address' => 'Haie Vive, Cotonou',
                'notes' => 'Livraison souhaitée en soirée après 18h',
                'total_amount' => 95000,
                'status' => 'confirmee',
            ]
        );

        $order->items()->firstOrCreate([
            'product_name' => 'Veste Croisée Coupe Tailleur',
            'size' => 'L',
            'unit_price' => 95000,
            'quantity' => 1,
        ]);

        // 7. Rendez-vous de démonstration
        Appointment::updateOrCreate(
            ['reference' => 'RDV-2026-0001'],
            [
                'client_name' => 'Patrice Talon',
                'client_phone' => '+229 66 55 44 33',
                'location_type' => 'domicile',
                'address' => 'Quartier Les Cocotiers, Cotonou',
                'garment_type' => 'Costume 3 pièces Cérémonie sur-mesure',
                'preferred_date' => '2026-12-05',
                'time_slot' => '15:00 - 17:00',
                'notes' => 'Appel avant de se déplacer',
                'status' => 'confirme',
            ]
        );
    }
}
