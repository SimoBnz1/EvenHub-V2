<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Review;
use App\Models\Event;
use App\Models\Reservation;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index()
    {
        return Review::with(['client','event'])->latest()->get();
    }

    public function store(Request $request)
    {
        if($request->user()->role!='client'){
            return response()->json(['message'=>'Accès interdit'],403);
        }

        $request->validate([
            'event_id'=>'required|exists:events,id',
            'rating'=>'required|integer|min:1|max:5',
            'comment'=>'nullable|string|max:1000'
        ]);

        $reservation=Reservation::where('client_id',$request->user()->id)
            ->where('event_id',$request->event_id)
            ->where('status','accepted')
            ->first();

        if(!$reservation){
            return response()->json([
                'message'=>'Vous devez avoir une réservation acceptée pour donner un avis.'
            ],422);
        }

        $oldReview=Review::where('client_id',$request->user()->id)
            ->where('event_id',$request->event_id)
            ->first();

        if($oldReview){
            return response()->json([
                'message'=>'Vous avez déjà donné un avis pour cet événement.'
            ],422);
        }

        $review=Review::create([
            'client_id'=>$request->user()->id,
            'event_id'=>$request->event_id,
            'rating'=>$request->rating,
            'comment'=>$request->comment
        ]);

        return response()->json([
            'message'=>'Avis ajouté avec succès',
            'review'=>$review
        ],201);
    }

    public function show(Review $review)
    {
        return $review->load(['client','event']);
    }

    public function update(Request $request,Review $review)
    {
        if($review->client_id!=$request->user()->id){
            return response()->json(['message'=>'Accès interdit'],403);
        }

        $request->validate([
            'rating'=>'required|integer|min:1|max:5',
            'comment'=>'nullable|string|max:1000'
        ]);

        $review->update([
            'rating'=>$request->rating,
            'comment'=>$request->comment
        ]);

        return response()->json([
            'message'=>'Avis modifié avec succès',
            'review'=>$review
        ]);
    }

    public function destroy(Request $request,Review $review)
    {
        if($review->client_id!=$request->user()->id){
            return response()->json(['message'=>'Accès interdit'],403);
        }

        $review->delete();

        return response()->json([
            'message'=>'Avis supprimé avec succès'
        ]);
    }
}