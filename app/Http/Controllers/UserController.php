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

        $occupation_user = OccupationUser::where('user_id','=',$user->id)->get();

        $occu_price = json_decode($occupation_user, true);
        $occupation_arr = [];

        foreach ($occu_price as $key => $value) {
            $occupation = Occupation::where('id','=',$value['occupation_id'])->first();
            $occupation_arr[$occupation->occupation] = $value['price'];
        }

        return response()   
            ->json([
                'user' => $user,
                'hourly_price' => $occupation_arr
            ]);
    }

    public function updateProfile(Request $request, $token)
    {
        $hourly_decoded = json_decode($request['hourly_amount']);

        $hourlyArr= array();
        foreach($hourly_decoded as $key => $value) {
            if ($key % 2 == 0) {
                $hourlyArr[$value] = $hourly_decoded[$key+1];
            }
          }

          \Log::alert($hourlyArr);
          \Log::alert(json_decode($this->getUserInfo($token)['hourly_price']));
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
