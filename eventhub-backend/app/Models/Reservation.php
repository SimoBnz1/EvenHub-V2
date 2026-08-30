<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $fillable = [
        'client_id',
        'event_id',
        'event_date',
        'location',
        'guest_count',
        'total_amount',
        'status',
    ];

    public function client()
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    public function event()
    {
        return $this->belongsTo(Event::class);
    }
}