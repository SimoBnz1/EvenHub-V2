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
        $user=$request->user();

        if($user->role=='client'){
            return Reservation::with('event')->where('client_id',$user->id)->latest()->get();
        }

        if($user->role=='traiteur'){
            $all=Reservation::with(['event','client'])->latest()->get();
            $reservations=[];

            foreach($all as $reservation){
                if($reservation->event->user_id==$user->id){
                    $reservations[]=$reservation;
                }
            }

            return $reservations;
        }

        return response()->json(['message'=>'Accès interdit'],403);
    }

    public function store(Request $request)
    {
        if($request->user()->role!='client'){
            return response()->json(['message'=>'Accès interdit'],403);
        }

        $request->validate([
            'event_id'=>'required|exists:events,id',
            'event_date'=>'required|date|after_or_equal:today',
            'location'=>'required|string|max:255',
            'guest_count'=>'required|integer|min:1'
        ]);

        $event=Event::find($request->event_id);
        $prestataire=$event->user;

        if($request->guest_count>$event->capacity){
            return response()->json(['message'=>'Le nombre de personnes dépasse la capacité'],422);
        }

        $reservations=Reservation::where('event_date',$request->event_date)
            ->where('status','!=','rejected')
            ->get();

        if($prestataire->category_id!=1){
            foreach($reservations as $ancienneReservation){
                if($ancienneReservation->event->user_id==$prestataire->id){
                    return response()->json([
                        'message'=>'Ce prestataire est déjà réservé le '.$request->event_date.'. Choisissez une autre date.'
                    ],422);
                }
            }
        }

        if($prestataire->category_id==1){
            $chaises=0;
            $tables=0;

            foreach($prestataire->equipment as $item){
                if($item->name=='chaise'){
                    $chaises=$item->total_quantity;
                }

                if($item->name=='tables'){
                    $tables=$item->total_quantity;
                }
            }

            $chaisesUtilisees=0;
            $tablesUtilisees=0;

            foreach($reservations as $ancienneReservation){
                if($ancienneReservation->event->user_id==$prestataire->id){
                    $chaisesUtilisees=$chaisesUtilisees+$ancienneReservation->guest_count;
                    $tablesUtilisees=$tablesUtilisees+ceil($ancienneReservation->guest_count/10);
                }
            }

            $chaisesDisponibles=$chaises-$chaisesUtilisees;
            $tablesDisponibles=$tables-$tablesUtilisees;

            if($request->guest_count>$chaisesDisponibles){
                return response()->json([
                    'message'=>'Pas assez de chaises disponibles. Choisissez une autre date.'
                ],422);
            }

            if(ceil($request->guest_count/10)>$tablesDisponibles){
                return response()->json([
                    'message'=>'Pas assez de tables disponibles. Choisissez une autre date.'
                ],422);
            }
        }

        $reservation=Reservation::create([
            'client_id'=>$request->user()->id,
            'event_id'=>$event->id,
            'event_date'=>$request->event_date,
            'location'=>$request->location,
            'guest_count'=>$request->guest_count,
            'total_amount'=>$event->price,
            'status'=>'pending'
        ]);

        return response()->json([
            'message'=>'Réservation envoyée avec succès',
            'reservation'=>$reservation
        ],201);
    }

    public function show(Reservation $reservation)
    {
        return $reservation;
    }

    public function update(Request $request,Reservation $reservation)
    {
        if($request->user()->role!='traiteur'){
            return response()->json(['message'=>'Accès interdit'],403);
        }

        if($reservation->event->user_id!=$request->user()->id){
            return response()->json(['message'=>'Cette réservation ne vous appartient pas'],403);
        }

        $request->validate([
            'status'=>'required|in:accepted,rejected'
        ]);

        $reservation->update([
            'status'=>$request->status
        ]);

        return response()->json([
            'message'=>'Statut modifié avec succès',
            'reservation'=>$reservation
        ]);
    }

    public function destroy(Reservation $reservation)
    {
    }
}