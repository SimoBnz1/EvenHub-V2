<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\ReservationController;
use App\Http\Controllers\Api\EquipmentController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\PrestataireController;
use App\Http\Controllers\Api\FavoriteController;
use App\Http\Controllers\Api\ProfileController;

Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);

Route::get('/events',[EventController::class,'index']);
Route::get('/events/{event}',[EventController::class,'show']);
Route::get('/events/{id}/reviews',[ReviewController::class,'eventReviews']);

Route::get('/prestataires/{id}',[PrestataireController::class,'show']);
Route::get('/top-prestataires',[PrestataireController::class,'top']);

Route::middleware('auth:sanctum')->group(function(){

    Route::post('/logout',[AuthController::class,'logout']);

    Route::get('/my-events',[EventController::class,'myEvents']);
    Route::apiResource('events',EventController::class)->except(['index','show']);

    Route::apiResource('reservations',ReservationController::class);

    Route::apiResource('equipment',EquipmentController::class);

    Route::apiResource('reviews',ReviewController::class);

    Route::apiResource('favorites',FavoriteController::class);

    Route::apiResource('profile',ProfileController::class);

});