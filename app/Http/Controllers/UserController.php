<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\OccupationUser;
use App\Occupation;
use Auth;
use DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Input;

class UserController extends Controller
{
    public function getUserInfo($token)
    {
        $user = User::where('token','=',$token)->first();
                // ->join('occupation_user', 'occupation_user.user_id', '=', $user->id)
                // ->get();

        $occupation_user = OccupationUser::where('user_id','=',$user->id)->get();
        \Log::alert(json_decode($occupation_user, true));

        $occu_price = json_decode($occupation_user, true);
        $occupation_arr = [];

        foreach ($occu_price as $key => $value) {
            $occupation = Occupation::where('id','=',$value['occupation_id'])->first();
            $occupation_arr[$occupation->occupation] = $value['price'];
            \Log::alert($value['occupation_id']);
            \Log::alert($value['price']);
        }
        \Log::alert($occupation_arr);

        // $user = DB::table('users')
        //     ->join('occupation_user', 'users.id', '=', 'occupation_user.user_id')
        //     ->get();

        \Log::alert($occupation_user);
            \Log::alert($user);
        return response()   
            ->json([
                'user' => $user,
                'hourly_price' => $occupation_arr
            ]);
    }

    public function updateProfile(Request $request, $token)
    {
        $occupation_user = new OccupationUser;
        $user = User::where('token','=',$token)->first();

        $arr_hourly_price = (array) json_decode($request['hourly_amount'],true);
        
        foreach ($arr_hourly_price as $key => $value) {
            $occupation = Occupation::where('occupation','=',$key)->first();
            if($value){
                OccupationUser::updateOrCreate([
                    'occupation_id' => $occupation->id,
                    'user_id'  => $user->id,
                    'price' => $value,
                ]);    
            }
        }
     
        $postal_code_var = str_replace("-", "", $request['cep']);

        $user->name = $request['name'];
        $user->email = $request['email'];
        $user->postal_code = $postal_code_var;
        $user->address = $request['address'];
        $user->city = $request['city'];
        $user->state = $request['state'];  
        $user->country = $request['country'];  
        $user->phone_number = $request['phone_number'];  

        $key = getenv('GOOGLE_API');
        $location = urlencode($postal_code_var);
        $geocode = file_get_contents("https://maps.googleapis.com/maps/api/geocode/json?address=".$postal_code_var."&key=".$key);
        $output= json_decode($geocode);
        $user->latitude = $output->results[0]->geometry->location->lat;
        $user->longitude  = $output->results[0]->geometry->location->lng;

        $user->save();

      

    }
}
