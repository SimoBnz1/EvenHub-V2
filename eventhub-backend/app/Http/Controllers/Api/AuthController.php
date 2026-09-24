<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|confirmed|min:6',
            'role' => 'required|in:client,traiteur',
            'category_id' => 'nullable|exists:categories,id'
        ]);

        if ($request->role == 'traiteur' && !$request->category_id) {
            return response()->json([
                'message' => 'Veuillez choisir une catégorie'
            ], 422);
        }

        $categoryId = null;

        if ($request->role == 'traiteur') {
            $categoryId = $request->category_id;
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'category_id' => $categoryId
        ]);

        $token = $user->createToken('eventhub_token')->plainTextToken;

        return response()->json([
            'message' => 'Compte créé avec succès',
            'user' => $user,
            'token' => $token
        ], 201);
    }


    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);
        $user = User::where('email', $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'messg' => 'Email ou Mot De Pass incorrect'
            ], 401);
        };
        $user->tokens()->delete();
        $token = $user->createToken('eventhub-token')->plainTextToken;
        return response()->json([
            'user' => $user,
            'messg' => 'Connexion reussie',
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'messg' => 'Deconnexion reussie'
        ]);
    }
}
