<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TimeSlot extends Model
{
    protected $table = 'time_slot';

    protected $fillable = ['availability_id', 'slot_1', 'slot_2', 'slot_3', 'slot_4', 'slot_5', 'slot_6', 'slot_7', 'slot_8', 'slot_9',
     'slot_10', 'slot_11', 'slot_12', 'slot_13', 'slot_14', 'slot_15', 'slot_16', 'slot_17', 'slot_18', 'slot_19', 'slot_20', 'slot_21', 'slot_22', 'slot_23', 'slot_24'];
}
