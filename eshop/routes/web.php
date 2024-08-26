<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductsController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
    
});
Route::get('/api/products',[ProductsController::class,'index']);
Route::delete('/api/products/{id}', [ProductsController::class, 'destroy']);
Route::post('/api/products', [ProductsController::class, 'store']);
Route::put('/api/products/{id}', [ProductsController::class,'update']);
