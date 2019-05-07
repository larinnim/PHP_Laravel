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
        Schema::create('time_slot', function (Blueprint $table) {
            $table->bigIncrements('availability_id');
            $table->boolean('1');
            $table->boolean('2');	
            $table->boolean('3');	
            $table->boolean('4');	
            $table->boolean('5');	
            $table->boolean('6');	
            $table->boolean('7');	
            $table->boolean('8');	
            $table->boolean('9');	
            $table->boolean('10');	
            $table->boolean('11');	
            $table->boolean('12');	
            $table->boolean('13');	
            $table->boolean('14');	
            $table->boolean('15');	
            $table->boolean('16');	
            $table->boolean('17');	
            $table->boolean('18');	
            $table->boolean('19');	
            $table->boolean('20');	
            $table->boolean('21');	
            $table->boolean('22');	
            $table->boolean('23');	
            $table->boolean('24');	
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
