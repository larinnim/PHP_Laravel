<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Availability extends Model
{
    protected $table = 'availability';
    protected $fillable = ['ally_id', 'date', 'is_unavailable', 'created_at', 'updated_at'];

}
