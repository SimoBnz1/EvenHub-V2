<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function index(Request $request)
    {
        return $request->user()->load('category');
    }

    public function store(Request $request)
    {
        return response()->json([
            'message'=>'Non utilisé'
        ]);
    }

    public function show(string $id)
    {
        return response()->json([
            'message'=>'Non utilisé'
        ]);
    }

    public function update(Request $request,string $id)
    {
        $user=$request->user();

        if($user->role!='traiteur'){
            return response()->json([
                'message'=>'Accès interdit'
            ],403);
        }

        $request->validate([
            'name'=>'required|string|max:255',
            'city'=>'nullable|string|max:255',
            'bio'=>'nullable|string',
            'photo'=>'nullable|image|max:2048'
        ]);

        $user->name=$request->name;
        $user->city=$request->city;
        $user->bio=$request->bio;

        if($request->hasFile('photo')){
            $user->photo=$request->file('photo')->store('profiles','public');
        }

        $user->save();

        return response()->json([
            'message'=>'Profil modifié avec succès',
            'user'=>$user->load('category')
        ]);
    }

    public function destroy(string $id)
    {
        return response()->json([
            'message'=>'Non utilisé'
        ]);
    }
}