<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::all();

        return response()->json($events);
    }

    public function myEvents(Request $request)
    {
        $events = Event::where('user_id', $request->user()->id)->get();

        return response()->json($events);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|string|max:100',
            'city' => 'required|string|max:100',
            'capacity' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048'
        ]);

        $imagePath = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('events', 'public');
        }

        $event = Event::create([
            'user_id' => $request->user()->id,
            'title' => $request->title,
            'type' => $request->type,
            'city' => $request->city,
            'capacity' => $request->capacity,
            'price' => $request->price,
            'description' => $request->description,
            'image' => $imagePath
        ]);

        return response()->json([
            'message' => 'Événement créé avec succès',
            'event' => $event
        ], 201);
    }

    public function show(Event $event)
    {
        return response()->json($event);
    }


    public function update(Request $request, Event $event)
    {
        if ($event->user_id != $request->user()->id) {
            return response()->json([
                'message' => 'Vous ne pouvez pas modifier cet événement'
            ], 403);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|string|max:100',
            'city' => 'required|string|max:100',
            'capacity' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048'
        ]);

        $imagePath = $event->image;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('events', 'public');
        }

        $event->update([
            'title' => $request->title,
            'type' => $request->type,
            'city' => $request->city,
            'capacity' => $request->capacity,
            'price' => $request->price,
            'description' => $request->description,
            'image' => $imagePath
        ]);

        return response()->json([
            'message' => 'Événement modifié avec succès',
            'event' => $event
        ]);
    }

    public function destroy(Request $request, Event $event)
    {
        if ($event->user_id != $request->user()->id) {
            return response()->json([
                'message' => 'Vous ne pouvez pas supprimer cet événement'
            ], 403);
        }
        $event->delete();

        return response()->json([
            'message' => 'Événement supprimé avec succès'
        ]);
    }
}
