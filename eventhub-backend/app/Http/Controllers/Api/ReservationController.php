<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Reservation;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->role === 'client') {

            $reservations = Reservation::with('event')
                ->where('client_id', $user->id)
                ->latest()
                ->get();

            return response()->json($reservations);
        }

        if ($user->role === 'traiteur') {

            $reservations = Reservation::with(['event', 'client'])
                ->whereHas('event', function ($query) use ($user) {
                    $query->where('user_id', $user->id);
                })
                ->latest()
                ->get();

            return response()->json($reservations);
        }

        return response()->json([
            'message' => 'Accès interdit'
        ], 403);
    }

    public function store(Request $request)
    {
        if ($request->user()->role !== 'client') {
            return response()->json([
                'message' => 'Accès interdit'
            ], 403);
        }

        $request->validate([
            'event_id' => 'required|exists:events,id',
            'event_date' => 'required|date|after_or_equal:today',
            'location' => 'required|string|max:255',
            'guest_count' => 'required|integer|min:1',
        ]);

        $event = Event::find($request->event_id);

        if ($request->guest_count > $event->capacity) {
            return response()->json([
                'message' => 'Le nombre de personnes dépasse la capacité de cet événement'
            ], 422);
        }

        $reservation = Reservation::create([
            'client_id' => $request->user()->id,
            'event_id' => $event->id,
            'event_date' => $request->event_date,
            'location' => $request->location,
            'guest_count' => $request->guest_count,
            'total_amount' => $event->price,
            'status' => 'pending',
        ]);

        return response()->json([
            'message' => 'Réservation envoyée avec succès',
            'reservation' => $reservation
        ], 201);
    }

    public function show(Reservation $reservation)
    {
        //
    }

    public function update(Request $request, Reservation $reservation)
    {
        if ($request->user()->role !== 'traiteur') {
            return response()->json([
                'message' => 'Accès interdit'
            ], 403);
        }

        if ($reservation->event->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Cette réservation ne vous appartient pas'
            ], 403);
        }

        $request->validate([
            'status' => 'required|in:accepted,rejected'
        ]);

        $reservation->update([
            'status' => $request->status
        ]);

        return response()->json([
            'message' => 'Statut de la réservation modifié',
            'reservation' => $reservation
        ]);
    }

    public function destroy(Reservation $reservation)
    {
        //
    }
}
