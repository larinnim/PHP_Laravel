<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Occupation;
use Log;

class OccupationController extends Controller
{
    public function index()
      {
        $occupations = Occupation::all('occupation');
        Log::alert($occupations);
        return $occupations->toJson();
      }
}
