<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index()
{
    $events=Event::with('user')->latest()->get();
    return response()->json($events);
}

    public function myEvents(Request $request)
    {
        $events=Event::where('user_id',$request->user()->id)->latest()->get();
        return response()->json($events);
    }

    public function store(Request $request)
    {
        if($request->user()->role!=='traiteur'){
            return response()->json(['message'=>'Accès interdit'],403);
        }

        $request->validate([
            'title'=>'required|string|max:255',
            'type'=>'required|string|max:255',
            'city'=>'required|string|max:255',
            'capacity'=>'required|integer|min:1',
            'price'=>'required|numeric|min:0',
            'description'=>'nullable|string',
            'image'=>'nullable|image|max:2048',
            'equipment'=>'nullable|array',
            'equipment.*.id'=>'required|exists:equipment,id',
            'equipment.*.quantity'=>'required|integer|min:1'
        ]);

        $imagePath=null;

        if($request->hasFile('image')){
            $imagePath=$request->file('image')->store('events','public');
        }

        $event=Event::create([
            'user_id'=>$request->user()->id,
            'title'=>$request->title,
            'type'=>$request->type,
            'city'=>$request->city,
            'capacity'=>$request->capacity,
            'price'=>$request->price,
            'description'=>$request->description,
            'image'=>$imagePath
        ]);

        if($request->equipment){
            foreach($request->equipment as $item){
                $event->equipment()->attach($item['id'],['quantity'=>$item['quantity']]);
            }
        }

        return response()->json([
            'message'=>'Événement créé avec succès',
            'event'=>$event->load('equipment')
        ],201);
    }

    public function show(Event $event)
    {
        return response()->json($event->load('equipment'));
    }

    public function update(Request $request,Event $event)
    {
        if($request->user()->role!=='traiteur'){
            return response()->json(['message'=>'Accès interdit'],403);
        }

        if($event->user_id!==$request->user()->id){
            return response()->json(['message'=>'Cet événement ne vous appartient pas'],403);
        }

        $request->validate([
            'title'=>'required|string|max:255',
            'type'=>'required|string|max:255',
            'city'=>'required|string|max:255',
            'capacity'=>'required|integer|min:1',
            'price'=>'required|numeric|min:0',
            'description'=>'nullable|string',
            'image'=>'nullable|image|max:2048',
            'equipment'=>'nullable|array',
            'equipment.*.id'=>'required|exists:equipment,id',
            'equipment.*.quantity'=>'required|integer|min:1'
        ]);

        $imagePath=$event->image;

        if($request->hasFile('image')){
            $imagePath=$request->file('image')->store('events','public');
        }

        $event->update([
            'title'=>$request->title,
            'type'=>$request->type,
            'city'=>$request->city,
            'capacity'=>$request->capacity,
            'price'=>$request->price,
            'description'=>$request->description,
            'image'=>$imagePath
        ]);

        if($request->equipment){
            $event->equipment()->detach();

            foreach($request->equipment as $item){
                $event->equipment()->attach($item['id'],['quantity'=>$item['quantity']]);
            }
        }

        return response()->json([
            'message'=>'Événement modifié avec succès',
            'event'=>$event->load('equipment')
        ]);
    }

    public function destroy(Request $request,Event $event)
    {
        if($event->user_id!==$request->user()->id){
            return response()->json(['message'=>'Cet événement ne vous appartient pas'],403);
        }

        $event->delete();

        return response()->json(['message'=>'Événement supprimé avec succès']);
    }
}