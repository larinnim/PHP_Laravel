<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class OccupationUser extends Model
{
    use SoftDeletes;

    protected $table = 'occupation_user';

    protected $fillable = ['occupation_id', 'user_id', 'created_at', 'updated_at', 'price'];
}
