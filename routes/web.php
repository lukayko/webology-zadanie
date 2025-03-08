<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\FileUploadController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::post('/upload-document', [FileUploadController::class, 'upload'])->middleware('auth');
Route::get('/documents', [FileUploadController::class, 'getUserFiles'])->middleware('auth');
Route::delete('/delete-document/{id}', [FileUploadController::class, 'delete'])->middleware('auth');
Route::put('/edit-document/{id}', [FileUploadController::class, 'edit'])->middleware('auth');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
