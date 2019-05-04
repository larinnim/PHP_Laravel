<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OccupationUser extends Model
{
    protected $table = 'occupation_user';

    protected $fillable = ['occupation_id', 'user_id', 'created_at', 'updated_at', 'price'];
}
