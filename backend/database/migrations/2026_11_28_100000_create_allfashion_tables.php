<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Ajouter le rôle aux utilisateurs s'il n'existe pas
        if (!Schema::hasColumn('users', 'role')) {
            Schema::table('users', function (Blueprint $table) {
                $table->string('role', 50)->default('admin')->after('password');
            });
        }

        // 2. Table categories (Boutique & Galerie)
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('type', 20)->default('shop'); // 'shop', 'lookbook'
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 3. Table products
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->nullable()->constrained('categories')->nullOnDelete();
            $table->string('name');
            $table->string('slug')->unique();
            $table->unsignedInteger('price'); // FCFA
            $table->string('badge', 100)->nullable();
            $table->text('description')->nullable();
            $table->json('details')->nullable();
            $table->json('sizes')->nullable();
            $table->string('main_image');
            $table->json('gallery')->nullable();
            $table->integer('stock')->default(10);
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 4. Table orders
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('reference', 50)->unique();
            $table->string('customer_name');
            $table->string('customer_phone', 50);
            $table->text('customer_address');
            $table->text('notes')->nullable();
            $table->unsignedInteger('total_amount')->default(0);
            $table->string('status', 50)->default('en_attente'); // 'en_attente', 'confirmee', 'en_preparation', 'livree', 'annulee'
            $table->timestamps();
        });

        // 5. Table order_items
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->cascadeOnDelete();
            $table->foreignId('product_id')->nullable()->constrained('products')->nullOnDelete();
            $table->string('product_name');
            $table->string('size', 50);
            $table->unsignedInteger('unit_price');
            $table->unsignedInteger('quantity')->default(1);
            $table->timestamps();
        });

        // 6. Table appointments (Sur-Mesure)
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->string('reference', 50)->unique();
            $table->string('client_name');
            $table->string('client_phone', 50);
            $table->string('location_type', 50)->default('domicile'); // 'atelier', 'domicile'
            $table->text('address')->nullable();
            $table->string('garment_type')->nullable();
            $table->string('preferred_date', 50)->nullable();
            $table->string('time_slot', 50)->nullable();
            $table->text('notes')->nullable();
            $table->json('measurements')->nullable();
            $table->string('status', 50)->default('en_attente'); // 'en_attente', 'confirme', 'effectue', 'annule'
            $table->timestamps();
        });

        // 7. Table flocking_requests (Flocage & Personnalisation)
        Schema::create('flocking_requests', function (Blueprint $table) {
            $table->id();
            $table->string('reference', 50)->unique();
            $table->string('client_name');
            $table->string('client_phone', 50);
            $table->string('garment_type', 150)->nullable();
            $table->string('position', 150)->nullable();
            $table->unsignedInteger('quantity')->default(1);
            $table->string('artwork_path')->nullable();
            $table->text('instructions')->nullable();
            $table->unsignedInteger('quoted_price')->nullable();
            $table->string('status', 50)->default('nouvelle'); // 'nouvelle', 'devis_envoye', 'en_production', 'terminee', 'annulee'
            $table->timestamps();
        });

        // 8. Table lookbook_items (Galerie d'Atelier)
        Schema::create('lookbook_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->nullable()->constrained('categories')->nullOnDelete();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('image_path');
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 9. Table contact_messages
        Schema::create('contact_messages', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('phone', 50);
            $table->string('subject');
            $table->text('message');
            $table->boolean('is_read')->default(false);
            $table->timestamps();
        });

        // 10. Table settings (Paramètres WhatsApp, adresse, horaires, etc.)
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('key', 100)->unique();
            $table->text('value')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
        Schema::dropIfExists('contact_messages');
        Schema::dropIfExists('lookbook_items');
        Schema::dropIfExists('flocking_requests');
        Schema::dropIfExists('appointments');
        Schema::dropIfExists('order_items');
        Schema::dropIfExists('orders');
        Schema::dropIfExists('products');
        Schema::dropIfExists('categories');

        if (Schema::hasColumn('users', 'role')) {
            Schema::table('users', function (Blueprint $table) {
                $table->dropColumn('role');
            });
        }
    }
};
