<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DeleteCalendarDatabaseAddOhterDatabase extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('calendar');
        Schema::create('availability', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('ally_id');
            $table->date('date');
            $table->boolean('is_unavailable');	
            $table->timestamps();
        });
        Schema::create('booking', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('ally_id');
            $table->integer('postjob_id');
            $table->date('start_datetime');
            $table->date('end_datetime');
            $table->string('status', 100);	
            $table->float('payment_amount', 8, 2);	
            $table->boolean('is_unavailable');	
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
