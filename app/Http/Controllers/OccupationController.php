<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Occupation;
use App\User;
use DB;

class OccupationController extends Controller
{
    public function index()
      {
        $occupations = Occupation::all('occupation');
        return $occupations->toJson();
      }

      public function agentOccupation(Request $request) 
        {
          $occupation = "$request->q";
          $user_searched_profession = Occupation::where('occupation', 'like', $occupation)->first();

          $users = DB::table('occupation_user')
            ->where('occupation_id', $user_searched_profession->id)
            ->join('users', 'users.id', '=', 'occupation_user.user_id')
            ->get();


          // \Log::alert('USERRRR'. $users);
          // $occupation_user = User::where('id', $occupation_user->user_id)->get();

          // \Log::alert('THISSSS'. $user_searched_profession);
          return $users->toJson();
        }
}
