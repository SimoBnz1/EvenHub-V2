<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $fillable=[
        'client_id',
        'event_id',
        'rating',
        'comment'
    ];

    public function client()
    {
        return $this->belongsTo(User::class,'client_id');
    }

    public function event()
    {
        return $this->belongsTo(Event::class);
    }
    
}