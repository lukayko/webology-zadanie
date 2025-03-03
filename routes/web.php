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

Route::post('/upload-file', [FileUploadController::class, 'upload']);
Route::get('/user-files', [FileUploadController::class, 'getUserFiles'])->middleware('auth');
Route::delete('/delete-file/{id}', [FileUploadController::class, 'delete'])->middleware('auth');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
