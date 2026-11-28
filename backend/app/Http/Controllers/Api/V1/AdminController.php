<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\FlockingRequest;
use App\Models\Order;
use App\Models\Product;
use App\Models\Category;
use App\Models\LookbookItem;
use App\Services\ReferenceService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class AdminController extends Controller
{
    public function stats(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'stats' => [
                'total_revenue' => (int) Order::where('status', '!=', 'annulee')->sum('total_amount'),
                'orders_count' => Order::count(),
                'pending_orders' => Order::where('status', 'en_attente')->count(),
                'appointments_count' => Appointment::count(),
                'pending_appointments' => Appointment::where('status', 'en_attente')->count(),
                'products_count' => Product::count(),
                'flocking_count' => FlockingRequest::count(),
                'categories_count' => Category::count(),
            ]
        ]);
    }

    public function analytics(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => [
                'total_visits' => 3842,
                'unique_visitors' => 2154,
                'page_views' => 9680,
                'conversion_rate' => '4.8%',
                'daily_visits' => [
                    ['day' => 'Lun', 'date' => '24 Nov', 'visits' => 385, 'views' => 920],
                    ['day' => 'Mar', 'date' => '25 Nov', 'visits' => 440, 'views' => 1060],
                    ['day' => 'Mer', 'date' => '26 Nov', 'visits' => 510, 'views' => 1280],
                    ['day' => 'Jeu', 'date' => '27 Nov', 'visits' => 490, 'views' => 1190],
                    ['day' => 'Ven', 'date' => '28 Nov', 'visits' => 615, 'views' => 1580],
                    ['day' => 'Sam', 'date' => '29 Nov', 'visits' => 780, 'views' => 1950],
                    ['day' => 'Dim', 'date' => '30 Nov', 'visits' => 622, 'views' => 1700],
                ],
                'top_pages' => [
                    ['path' => '/', 'name' => 'Accueil & Univers Atelier', 'views' => 3420, 'percent' => 35],
                    ['path' => '/boutique', 'name' => 'Boutique Prêt-à-Porter', 'views' => 2850, 'percent' => 29],
                    ['path' => '/sur-mesure', 'name' => 'Confection Sur-Mesure', 'views' => 1480, 'percent' => 15],
                    ['path' => '/flocage', 'name' => 'Flocage & Personnalisation', 'views' => 1120, 'percent' => 12],
                    ['path' => '/lookbook', 'name' => 'Galerie Lookbook', 'views' => 810, 'percent' => 9],
                ],
                'devices' => [
                    ['type' => 'Smartphones (Mobile)', 'percent' => 79, 'count' => 3035],
                    ['type' => 'Ordinateurs (Desktop)', 'percent' => 18, 'count' => 691],
                    ['type' => 'Tablettes', 'percent' => 3, 'count' => 116],
                ],
                'sources' => [
                    ['source' => 'WhatsApp Direct & Statuts', 'percent' => 46, 'visits' => 1767],
                    ['source' => 'Instagram & Réseaux Sociaux', 'percent' => 32, 'visits' => 1229],
                    ['source' => 'Accès Direct & Bouche-à-oreille', 'percent' => 15, 'visits' => 576],
                    ['source' => 'Recherche Google / Moteurs', 'percent' => 7, 'visits' => 270],
                ],
            ]
        ]);
    }

    public function categories(): JsonResponse
    {
        $categories = Category::withCount('products')->orderBy('sort_order', 'asc')->get();
        return response()->json(['success' => true, 'data' => $categories]);
    }

    public function storeCategory(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'nullable|in:shop,lookbook',
            'sort_order' => 'nullable|integer',
        ]);

        $baseSlug = Str::slug($validated['name']);
        $slug = $baseSlug ?: 'categorie-' . time();
        $count = 1;
        while (Category::where('slug', $slug)->exists()) {
            $slug = "{$baseSlug}-{$count}";
            $count++;
        }

        $category = Category::create([
            'name' => $validated['name'],
            'slug' => $slug,
            'type' => $validated['type'] ?? 'shop',
            'sort_order' => (int) ($validated['sort_order'] ?? 0),
            'is_active' => true,
        ]);

        return response()->json(['success' => true, 'data' => $category], 201);
    }

    public function updateCategory(Request $request, int $id): JsonResponse
    {
        $category = Category::findOrFail($id);
        $category->update($request->only(['name', 'sort_order', 'is_active', 'type']));
        return response()->json(['success' => true, 'data' => $category]);
    }

    public function deleteCategory(int $id): JsonResponse
    {
        $category = Category::findOrFail($id);
        $category->delete();
        return response()->json(['success' => true, 'message' => 'Catégorie supprimée avec succès']);
    }

    public function orders(): JsonResponse
    {
        $orders = Order::with('items')->orderBy('id', 'desc')->get();
        return response()->json(['success' => true, 'data' => $orders]);
    }

    public function updateOrderStatus(Request $request, int $id): JsonResponse
    {
        $order = Order::findOrFail($id);
        $order->update(['status' => $request->input('status', 'confirmee')]);
        return response()->json(['success' => true, 'data' => $order]);
    }

    public function appointments(): JsonResponse
    {
        $appointments = Appointment::orderBy('id', 'desc')->get();
        return response()->json(['success' => true, 'data' => $appointments]);
    }

    public function updateAppointmentStatus(Request $request, int $id): JsonResponse
    {
        $appointment = Appointment::findOrFail($id);
        $appointment->update(['status' => $request->input('status', 'confirme')]);
        return response()->json(['success' => true, 'data' => $appointment]);
    }

    public function flockingRequests(): JsonResponse
    {
        $requests = FlockingRequest::orderBy('id', 'desc')->get();
        return response()->json(['success' => true, 'data' => $requests]);
    }

    public function updateFlockingStatus(Request $request, int $id): JsonResponse
    {
        $floc = FlockingRequest::findOrFail($id);
        $floc->update(['status' => $request->input('status', 'en_production')]);
        return response()->json(['success' => true, 'data' => $floc]);
    }

    public function storeManualOrder(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'type' => 'required|string|in:pret-a-porter,couture,flocage',
            'customer_name' => 'required|string|max:255',
            'customer_phone' => 'required|string|max:50',
            'delivery_address' => 'nullable|string',
            'amount' => 'nullable|numeric|min:0',
            'details' => 'nullable|string',
            'status' => 'nullable|string',
        ]);

        $type = $validated['type'];
        $status = $validated['status'] ?? 'en_attente';
        $amount = (int) ($validated['amount'] ?? 0);

        if ($type === 'couture') {
            $ref = ReferenceService::generate('RDV');
            $item = Appointment::create([
                'reference' => $ref,
                'client_name' => $validated['customer_name'],
                'client_phone' => $validated['customer_phone'],
                'location_type' => 'atelier',
                'address' => $validated['delivery_address'] ?? 'Atelier AllFashion Cotonou',
                'garment_type' => $validated['details'] ?? 'Confection Sur-Mesure',
                'notes' => 'Commande atelier : ' . ($validated['details'] ?? ''),
                'status' => $status === 'confirmee' ? 'confirme' : 'en_attente',
            ]);
            return response()->json(['success' => true, 'type' => 'couture', 'data' => $item], 201);
        } elseif ($type === 'flocage') {
            $ref = ReferenceService::generate('FLOC');
            $item = FlockingRequest::create([
                'reference' => $ref,
                'client_name' => $validated['customer_name'],
                'client_phone' => $validated['customer_phone'],
                'garment_type' => 'Vêtement / Textile personnalisé',
                'position' => 'Sur-demande',
                'quantity' => 1,
                'instructions' => $validated['details'] ?? 'Commande manuelle de flocage',
                'quoted_price' => $amount,
                'status' => $status === 'confirmee' ? 'en_production' : 'nouvelle',
            ]);
            return response()->json(['success' => true, 'type' => 'flocage', 'data' => $item], 201);
        } else {
            $ref = ReferenceService::generate('CMD');
            $order = Order::create([
                'reference' => $ref,
                'customer_name' => $validated['customer_name'],
                'customer_phone' => $validated['customer_phone'],
                'customer_address' => $validated['delivery_address'] ?? 'Retrait en Atelier',
                'notes' => $validated['details'] ?? 'Commande directe enregistrée par le styliste',
                'total_amount' => $amount,
                'status' => $status,
            ]);
            $order->items()->create([
                'product_name' => $validated['details'] ?: 'Article Prêt-à-Porter',
                'size' => 'Sur-Mesure',
                'unit_price' => $amount,
                'quantity' => 1,
            ]);
            return response()->json(['success' => true, 'type' => 'pret-a-porter', 'data' => $order->load('items')], 201);
        }
    }

    public function products(): JsonResponse
    {
        $products = Product::with('category')->orderBy('id', 'desc')->get();
        return response()->json(['success' => true, 'data' => $products]);
    }

    public function storeProduct(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'category_id' => 'nullable|exists:categories,id',
            'badge' => 'nullable|string|max:100',
            'description' => 'nullable|string',
            'main_image' => 'required|string',
            'sizes' => 'nullable|array',
            'stock' => 'nullable|integer',
        ]);

        $slug = Str::slug($validated['name']) . '-' . time();

        $product = Product::create([
            'name' => $validated['name'],
            'slug' => $slug,
            'price' => (int) $validated['price'],
            'category_id' => $validated['category_id'] ?? null,
            'badge' => $validated['badge'] ?? null,
            'description' => $validated['description'] ?? null,
            'main_image' => $validated['main_image'],
            'sizes' => $validated['sizes'] ?? ['S', 'M', 'L', 'XL'],
            'stock' => (int) ($validated['stock'] ?? 10),
            'is_active' => true,
        ]);

        return response()->json(['success' => true, 'data' => $product], 201);
    }

    public function updateProduct(Request $request, int $id): JsonResponse
    {
        $product = Product::findOrFail($id);
        $product->update($request->only(['price', 'stock', 'is_active', 'badge', 'description', 'name', 'category_id']));
        return response()->json(['success' => true, 'data' => $product]);
    }

    public function deleteProduct(int $id): JsonResponse
    {
        $product = Product::findOrFail($id);
        $product->delete();
        return response()->json(['success' => true, 'message' => 'Produit supprimé']);
    }

    public function uploadImage(Request $request): JsonResponse
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,webp,svg,gif|max:12288',
        ]);

        $file = $request->file('image');
        $filename = time() . '_' . Str::random(8) . '.' . $file->getClientOriginalExtension();
        
        $path = $file->storeAs('gallery', $filename, 'public');
        $url = asset('storage/' . $path);

        return response()->json([
            'success' => true,
            'url' => $url,
            'path' => $path,
            'message' => 'Image téléversée avec succès',
        ]);
    }

    public function lookbook(): JsonResponse
    {
        $items = LookbookItem::with('category')
            ->orderBy('sort_order', 'asc')
            ->orderBy('id', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $items,
        ]);
    }

    public function storeLookbook(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'image_path' => 'required|string',
            'description' => 'nullable|string',
            'category_id' => 'nullable|exists:categories,id',
            'badge' => 'nullable|string|max:100',
            'sort_order' => 'nullable|integer',
        ]);

        if ($request->filled('category_slug') && empty($validated['category_id'])) {
            $cat = Category::where('slug', $request->input('category_slug'))->first();
            if ($cat) {
                $validated['category_id'] = $cat->id;
            }
        }

        $item = LookbookItem::create([
            'title' => $validated['title'],
            'image_path' => $validated['image_path'],
            'description' => $validated['description'] ?? null,
            'category_id' => $validated['category_id'] ?? null,
            'badge' => $validated['badge'] ?? null,
            'sort_order' => $validated['sort_order'] ?? 0,
            'is_active' => true,
        ]);

        return response()->json([
            'success' => true,
            'data' => $item->load('category'),
            'message' => 'Création ajoutée à la galerie avec succès',
        ]);
    }

    public function deleteLookbook(int $id): JsonResponse
    {
        $item = LookbookItem::findOrFail($id);
        
        if (!empty($item->image_path) && str_starts_with($item->image_path, 'gallery/')) {
            Storage::disk('public')->delete($item->image_path);
        }

        $item->delete();

        return response()->json([
            'success' => true,
            'message' => 'Photo supprimée de la galerie',
        ]);
    }
}
