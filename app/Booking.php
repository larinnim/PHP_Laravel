<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
        protected $table = 'booking';
        protected $fillable = ['ally_id', 'postjob_id', 'start_datetime', 'end_datetime', 'status', 'created_at', 'updated_at'];
}
