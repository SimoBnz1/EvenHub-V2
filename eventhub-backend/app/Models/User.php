<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable=[
    'name',
    'email',
    'password',
    'role',
    'category_id',
];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function events()
{
    return $this->hasMany(Event::class);
}

public function reservations()
{
    return $this->hasMany(Reservation::class, 'client_id');
}

public function equipment()
{
    return $this->hasMany(Equipment::class);
}
public function category()
{
    return $this->belongsTo(Category::class);
}
}