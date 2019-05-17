<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeBookingTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('booking', function($table) {
            $table->dropColumn('is_unavailable');
            $table->dropColumn('status');
            $table->dateTime('start_datetime')->nullable()->change();	
            $table->dateTime('end_datetime')->nullable()->change();
            $table->boolean('pending')->nullable();
            $table->boolean('finished')->nullable();
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
