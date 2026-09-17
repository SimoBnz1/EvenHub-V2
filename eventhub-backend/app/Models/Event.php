<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Equipment;
class Event extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'type',
        'city',
        'capacity',
        'price',
        'description',
        'image'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }

    public function equipment()
    {
        return $this->belongsToMany(
            Equipment::class,
            'event_equipment',
            'event_id',
            'equipment_id'
        )->withPivot('quantity');
    }
    public function reviews()
{
    return $this->hasMany(Review::class);
}
}
