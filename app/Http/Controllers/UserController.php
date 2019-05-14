<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\OccupationUser;
use App\Occupation;
use App\Availability;
use App\TimeSlot;
use Auth;
use DB;
use DateTime;
use DateTimeZone;
use Carbon\Carbon;
use Illuminate\Support\Facades\Input;
use Illuminate\Database\Eloquent\SoftDeletes;

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
        \Log::alert( $occupation_arr);
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
        $registeredProfessions = $this->getUserInfo($token)->getData('hourly_price')['hourly_price'];
        $user = User::where('token','=',$token)->first();

        foreach($hourly_decoded as $key => $value) {
            if ($key % 2 == 0) {
                $hourlyArr[$value] = $hourly_decoded[$key+1];
            }
          }

        foreach ($hourlyArr as $key => $value) {
            \Log::alert($key);
            \Log::alert($value);
            \Log::alert('BLABLA'.array_key_exists($key, $registeredProfessions));
            $occupation = Occupation::where('occupation','=',$key)->first();

            if(array_key_exists($key, $registeredProfessions)){
                \Log::alert('IN ARRAYEXIST');

                if(empty($value)){
                    \Log::alert('IN SOFTDELETE');
                    OccupationUser::where('occupation_id', $occupation->id)
                                    ->where('user_id', $user->id)
                                    ->delete();
                }
                else {
                    \Log::alert('IN ELSE');
                    OccupationUser::updateOrCreate([
                                    'occupation_id' => $occupation->id,
                                    'user_id'  => $user->id,
                                    'price' => $value,
                                ]);    
                }
            }
            else {
                // $prevOccupation =  OccupationUser::where('occupation_id', $occupation->id)
                // ->where('user_id', $user->id)
                // ->first();
                $prevOccupation =  OccupationUser::withTrashed()
                                    ->where('occupation_id', $occupation->id)
                                    ->where('user_id', $user->id)
                                    ->first();
                \Log::alert($occupation->id);
                \Log::alert($user->id);

                \Log::alert('PREVVV'.$prevOccupation);

                if($prevOccupation){
                    \Log::alert('inPREVVVV');
                    OccupationUser::withTrashed()
                                    ->where('occupation_id', $occupation->id)
                                    ->where('user_id', $user->id)
                                    ->update([
                                        'price' => $value,
                                        'deleted_at' => null
                    ]);
    
                }  

                else {
                    if($value){
                        $occupation_user = new OccupationUser;
                        $occupation_user->occupation_id = $occupation->id;
                        $occupation_user->user_id = $user->id;
                        $occupation_user->price = $value;
                        $occupation_user->save();
                    }
                   
                }
            }
        }

       

          \Log::alert($hourlyArr);
          \Log::alert($this->getUserInfo($token)->getData('hourly_price')['hourly_price']);
       
        $result = array_diff($hourlyArr, $registeredProfessions);

          \Log::alert($result);
        // $occupation_user = new OccupationUser;

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

        $url_timezone = 'https://maps.googleapis.com/maps/api/timezone/json?location='.$user->latitude.','.$user->longitude.'&timestamp='.time().'&key='.$key;
        $response_timezone = file_get_contents($url);
        $timezone = json_decode($response_timezone, true)['timeZoneId'];
        $user->timezone = $timezone;

        $user->save();
    }

    public function updateAvailability(Request $request, $token) 
    {

    \Log::alert($request->all());
        $timezoneOffset = $request['timezone'] / 60;
        $weekly = json_decode($request['weekly']);

        $user = User::where('token','=',$token)->first();

        foreach ($weekly as $key_day => $day) {
            $arrDay = (array)$day;
            $arrKey = array_keys($arrDay);

            $availableDay = Availability::where('date', $key_day)->first();

            if($availableDay){
                $availableDay->update([
                    $arrKey[0] => $arrDay[$arrKey[0]],
                    $arrKey[1] => $arrDay[$arrKey[1]],
                    $arrKey[2] => $arrDay[$arrKey[2]],
                    $arrKey[3] => $arrDay[$arrKey[3]]
                ]);
            }

            else {
                $availableDay = new Availability;
                $availableDay->ally_id = $user->id;
                $availableDay->date = $key_day;

                $timezone = new DateTimeZone('UTC');
                $standard_date_start = new DateTime($arrDay[$arrKey[0]], $timezone);
                $standard_date_end = new DateTime($arrDay[$arrKey[1]], $timezone);
                $interval_date_start = new DateTime($arrDay[$arrKey[2]], $timezone);
                $interval_date_end = new DateTime($arrDay[$arrKey[3]], $timezone);

                $availableDay[$arrKey[0]] = $standard_date_start;
                $availableDay[$arrKey[1]] = $standard_date_end;
                $availableDay[$arrKey[2]] = $interval_date_start;
                $availableDay[$arrKey[3]] = $interval_date_end;
                
                $availableDay->save();
            }
        }
    }

    public function getAvailability($token) 
    {
        $user = User::where('token','=',$token)->first();
        $available = Availability::where('ally_id', $user->id)->get();
        $dayObj = [];
        foreach ($available as $key_day => $day) {
            \Log::alert('Key DAY'.$key_day);
            \Log::alert(' DAY'.$day);
            \Log::alert(' DAY'. $day->ally_id);

            $dayObj [$day->date]['standard_start_time'] = $day->standard_start_time;
            $dayObj [$day->date]['standard_end_time'] = $day->standard_end_time;
            $dayObj [$day->date]['interval_start_time'] = $day->interval_start_time;
            $dayObj [$day->date]['interval_end_time'] = $day->interval_end_time;

        }

        $key = getenv('GOOGLE_API');
        $url = 'https://maps.googleapis.com/maps/api/timezone/json?location='.$user->latitude.','.$user->longitude.'&timestamp='.time().'&key='.$key;
        $response_timezone = file_get_contents($url);
        $timezone = json_decode($response_timezone, true)['timeZoneId'];


        \Log::alert(' DAY OBJJJJ'.json_encode($dayObj));

        return response()->json([
            'days' => $dayObj,
            'timezone' => $timezone
        ]);
    }
}
