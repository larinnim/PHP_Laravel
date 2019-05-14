<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeAvailabilityTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('availability', function($table) {
            $table->dateTimeTz('standard_start_time')->nullable();	
            $table->dateTimeTz('standard_end_time')->nullable();	
            $table->dateTimeTz('interval_start_time')->nullable();
            $table->dateTimeTz('interval_end_time')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('availability', function($table) {
            $table->dateTimeTz('standard_start_time');	
            $table->dateTimeTz('standard_end_time');	
            $table->dateTimeTz('interval_start_time');	
            $table->dateTimeTz('interval_end_time');
        });
    }
}
