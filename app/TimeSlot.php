<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TimeSlot extends Model
{
    protected $table = 'time_slot';
    // protected $fillable = ['availability_id'];
    protected $fillable = ['availability_id', '1', '2', '3', '4', '5', '6', '7', '8', '9',
     '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'];
}
