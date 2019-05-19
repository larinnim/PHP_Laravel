<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Occupation;
use App\User;
use App\OccupationUser;
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
          \Log::alert($request->q);

          $occupation = Occupation::where('occupation', $request->q)->first();
          \Log::alert('The occupation'.$occupation);

          // $user_searched_profession = OccupationUser::where('occupation_id', $occupation->id);
          $user_and_profession = DB::table('occupation_user')
            ->where('occupation_id', $occupation->id)
            ->whereNull('deleted_at')
            ->join('users', 'users.id', '=', 'occupation_user.user_id')
            ->select('users.name', 'users.email', 'occupation_user.price', 'occupation_user.user_id', 'users.hourly_rate', 'users.total_rating', 'users.member_since', 'users.avatar', 'users.rating')
            ->get();

          $profession_by_user = [];
          foreach ($user_and_profession as $user) {
            $user_id = $user->user_id;
            $profession_by_user[$user_id] = DB::table('occupation_user')
              ->where('user_id', $user_id)
              ->whereNull('deleted_at')
              ->join('occupations', 'occupations.id', '=', 'occupation_user.occupation_id')
              ->select('occupations.occupation')
              ->get();
          }
            \Log::alert('HEREE IN AGENTOCCUPATION'.$user_and_profession);
            \Log::alert('ARRAYY'.json_encode($profession_by_user));

          // $user_searched_profession = User::where('professions', 'like', "%\"{$request->q}\"%")->get();
          // return $user_and_profession->toJson();

          return response()->json([
            'professionByUser' => $profession_by_user,
            'user_and_profession' => $user_and_profession
          ]); 
        }
}
