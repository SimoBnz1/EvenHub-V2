<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Equipment extends Model
{
    protected $table = 'equipment';

    protected $fillable = [
        'user_id',
        'name',
        'total_quantity',
        'available_quantity',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function events()
{
    return $this->belongsToMany(
        Event::class,
        'event_equipment',
        'equipment_id',
        'event_id'
    )->withPivot('quantity');
}
}