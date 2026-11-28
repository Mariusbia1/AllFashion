<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\SettingsController;
use App\Http\Controllers\Api\V1\CategoryController;
use App\Http\Controllers\Api\V1\ProductController;
use App\Http\Controllers\Api\V1\LookbookController;
use App\Http\Controllers\Api\V1\OrderController;
use App\Http\Controllers\Api\V1\AppointmentController;
use App\Http\Controllers\Api\V1\FlockingController;
use App\Http\Controllers\Api\V1\ContactController;
use App\Http\Controllers\Api\V1\AdminController;

Route::prefix('v1')->group(function () {
    // Routes publiques conformes au cahier des charges
    Route::get('/settings', [SettingsController::class, 'index']);
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/{slug}', [ProductController::class, 'show']);
    Route::get('/lookbook', [LookbookController::class, 'index']);

    // Demandes clients avec redirection WhatsApp & références uniques
    Route::post('/orders', [OrderController::class, 'store']);
    Route::post('/appointments', [AppointmentController::class, 'store']);
    Route::post('/flocking-requests', [FlockingController::class, 'store']);
    Route::post('/contacts', [ContactController::class, 'store']);

    // Routes Back-Office / Admin
    Route::prefix('admin')->group(function () {
        Route::get('/stats', [AdminController::class, 'stats']);
        Route::get('/orders', [AdminController::class, 'orders']);
        Route::put('/orders/{id}/status', [AdminController::class, 'updateOrderStatus']);
        Route::get('/appointments', [AdminController::class, 'appointments']);
        Route::put('/appointments/{id}/status', [AdminController::class, 'updateAppointmentStatus']);
        Route::get('/products', [AdminController::class, 'products']);
        Route::post('/products', [AdminController::class, 'storeProduct']);
        Route::put('/products/{id}', [AdminController::class, 'updateProduct']);
        Route::delete('/products/{id}', [AdminController::class, 'deleteProduct']);
    });
});
