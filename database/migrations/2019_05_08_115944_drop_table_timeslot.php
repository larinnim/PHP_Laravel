<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DropTableTimeslot extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('timeslot');
        Schema::create('time_slot', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('availability_id')->nullable();
            $table->boolean('slot_1')->default(0);
            $table->boolean('slot_2')->default(0);
            $table->boolean('slot_3')->default(0);
            $table->boolean('slot_4')->default(0);
            $table->boolean('slot_5')->default(0);
            $table->boolean('slot_6')->default(0);
            $table->boolean('slot_7')->default(0);
            $table->boolean('slot_8')->default(0);
            $table->boolean('slot_9')->default(0);
            $table->boolean('slot_10')->default(0);
            $table->boolean('slot_11')->default(0);
            $table->boolean('slot_12')->default(0);
            $table->boolean('slot_13')->default(0);
            $table->boolean('slot_14')->default(0);
            $table->boolean('slot_15')->default(0);
            $table->boolean('slot_16')->default(0);
            $table->boolean('slot_17')->default(0);
            $table->boolean('slot_18')->default(0);
            $table->boolean('slot_19')->default(0);
            $table->boolean('slot_20')->default(0);
            $table->boolean('slot_21')->default(0);
            $table->boolean('slot_22')->default(0);
            $table->boolean('slot_23')->default(0);
            $table->boolean('slot_24')->default(0);
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
        Schema::dropIfExists('time_slot');
    }
}
