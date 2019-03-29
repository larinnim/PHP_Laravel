<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Occupation;
use App\User;

use Log;

class OccupationController extends Controller
{
    public function index()
      {
        $occupations = Occupation::all('occupation');
        return $occupations->toJson();
      }

      public function agentOccupation(Request $request) 
        {
          $professions = User::where('professions', 'like', "%\"{$request->q}\"%")->get();
          Log::alert($professions);
        }
}
