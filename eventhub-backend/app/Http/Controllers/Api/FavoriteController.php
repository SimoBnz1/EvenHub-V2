<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Favorite;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function index(Request $request)
    {
        return Favorite::with('event')
            ->where('client_id',$request->user()->id)
            ->latest()
            ->get();
    }

    public function store(Request $request)
    {
        if($request->user()->role!='client'){
            return response()->json(['message'=>'Accès interdit'],403);
        }

        $request->validate([
            'event_id'=>'required|exists:events,id'
        ]);

        $favorite=Favorite::where('client_id',$request->user()->id)
            ->where('event_id',$request->event_id)
            ->first();

        if($favorite){
            return response()->json([
                'message'=>'Cet événement est déjà dans vos favoris.'
            ],422);
        }

        $favorite=Favorite::create([
            'client_id'=>$request->user()->id,
            'event_id'=>$request->event_id
        ]);

        return response()->json([
            'message'=>'Ajouté aux favoris',
            'favorite'=>$favorite
        ],201);
    }

    public function show(Favorite $favorite)
    {
        return $favorite->load('event');
    }

    public function update(Request $request,Favorite $favorite)
    {
        return response()->json([
            'message'=>'Modification non utilisée'
        ]);
    }

    public function destroy(Request $request,Favorite $favorite)
    {
        if($favorite->client_id!=$request->user()->id){
            return response()->json(['message'=>'Accès interdit'],403);
        }

        $favorite->delete();

        return response()->json([
            'message'=>'Favori supprimé'
        ]);
    }
}