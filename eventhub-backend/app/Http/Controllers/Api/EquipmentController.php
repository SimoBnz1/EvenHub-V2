<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Equipment;
use Illuminate\Http\Request;

class EquipmentController extends Controller
{
    public function index(Request $request)
    {
        if ($request->user()->role !== 'traiteur') {
            return response()->json([
                'message' => 'Accès interdit'
            ], 403);
        }

        $equipment = Equipment::where('user_id', $request->user()->id)
            ->latest()
            ->get();

        return response()->json($equipment);
    }


    public function store(Request $request)
    {
        if ($request->user()->role !== 'traiteur') {
            return response()->json([
                'message' => 'Accès interdit'
            ], 403);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'total_quantity' => 'required|integer|min:1'
        ]);

        $equipment = Equipment::create([
            'user_id' => $request->user()->id,
            'name' => $request->name,
            'total_quantity' => $request->total_quantity,
            'available_quantity' => $request->total_quantity
        ]);

        return response()->json([
            'message' => 'Équipement ajouté avec succès',
            'equipment' => $equipment
        ], 201);
    }


    public function show(Equipment $equipment)
    {
        return response()->json($equipment);
    }


    public function update(Request $request, Equipment $equipment)
    {
        if ($request->user()->role !== 'traiteur') {
            return response()->json([
                'message' => 'Accès interdit'
            ], 403);
        }

        if ($equipment->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Cet équipement ne vous appartient pas'
            ], 403);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'total_quantity' => 'required|integer|min:1'
        ]);

        $equipment->update([
            'name' => $request->name,
            'total_quantity' => $request->total_quantity,
            'available_quantity' => $request->total_quantity
        ]);

        return response()->json([
            'message' => 'Équipement modifié avec succès',
            'equipment' => $equipment
        ]);
    }


    public function destroy(Request $request, Equipment $equipment)
    {
        if ($request->user()->role !== 'traiteur') {
            return response()->json([
                'message' => 'Accès interdit'
            ], 403);
        }

        if ($equipment->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Cet équipement ne vous appartient pas'
            ], 403);
        }

        $equipment->delete();

        return response()->json([
            'message' => 'Équipement supprimé avec succès'
        ]);
    }
}