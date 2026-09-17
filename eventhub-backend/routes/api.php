<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\ReservationController;
use App\Http\Controllers\Api\EquipmentController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\PrestataireController;

Route::get('/top-prestataires',[PrestataireController::class,'top']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/events', [EventController::class, 'index']);
Route::get('/events/{event}', [EventController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::apiResource('events', EventController::class)->except([
        'index',
        'show'
    ]);
    Route::get('/my-events', [EventController::class, 'myEvents']);
    Route::apiResource('reservations', ReservationController::class);
    Route::apiResource('equipment', EquipmentController::class);
    Route::apiResource('reviews',ReviewController::class);

});