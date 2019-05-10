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

        $user->save();
    }

    public function updateAvailability(Request $request, $token) 
    {
    \Log::alert($request->all());
        $timezoneOffset = $request['timezone'] / 60;
        $weekly = json_decode($request['weekly']);

        $user = User::where('token','=',$token)->first();

        foreach ($weekly as $key_day => $day) {
            foreach ($day as $key_time => $time) {

                if (is_numeric($time)) {
                    Availability::updateOrCreate(
                        ['ally_id' => $user->id, 'date' => $key_day],
                        ['ally_id' => $user->id, 'date' => $key_day]
                    );
                }
            }
        }

        foreach ($weekly as $key_day => $day) {
            
                $start = $day->start_time;
                $end = $day->end_time;
                $interval = (array) $day->interval;
                \Log::alert('HERE');
                \Log::alert($start);
                \Log::alert($end);
                \Log::alert($interval);

            if (is_numeric($start) || is_numeric($end) || is_numeric($interval['start_time']) || is_numeric($interval['end_time'])) {
                if(!is_numeric($start)){
                    $d = new DateTime($start, new DateTimeZone('UTC'));
                    $start = intval($d->format('H'));
                }
                if(!is_numeric($end)){
                    $d = new DateTime($end, new DateTimeZone('UTC'));
                    $end = intval($d->format('H'));
                }
                if(!is_numeric($interval['start_time'])){
                    $d = new DateTime($interval['start_time'], new DateTimeZone('UTC'));
                    $interval['start_time'] = intval($d->format('H'));
                }
                if(!is_numeric($interval['end_time'])){
                    $d = new DateTime($interval['end_time'], new DateTimeZone('UTC'));
                    $interval['end_time'] = intval($d->format('H'));
                }

                $available = Availability::where('date', $key_day)->first();

                $timeSlot = TimeSlot::where('availability_id', $available->id)->first();
                $time = TimeSlot::where('availability_id', $available->id);

                if(isset($timeSlot)){

                    $j=1;
                    while($j <= 24) {
                        $slot_name = 'slot_'.$j;
                        $time->update([$slot_name => 0]);
                        $j++;
                    }
                    $i = $start;
                    while($i < $end) {
                        \Log::alert('start:'.$i);
                        \Log::alert('end:'.$end);

                        $time_slot_name = (string)$i;
                        $slot_name = 'slot_'.$time_slot_name;
                        $time->update([$slot_name => 1]);
                        $i++;
                    } 
                    $z = $interval['start_time'];
                    while($z < $interval['end_time']) {
                        \Log::alert('Interval start:'.$z);
                        \Log::alert('Interval end:'.$interval['end_time']);
                        $time_slot_name = (string)$z;
                        $slot_name = 'slot_'.$time_slot_name;
                        $time->update([$slot_name => 0]);
                        $z++;
                    }
                }
                else {
                    $insertTime = new TimeSlot;
                    $insertTime->availability_id = $available->id;
                    $i = $start;
                    while($i < $end) {
                        $time_slot_name = (string)$i;
                        $slot_name = 'slot_'.$time_slot_name;
                        $insertTime->$slot_name = 1;
                        $i++;
                    } 
                    $insertTime->save();

                    $z = $interval['start_time'];
                    while($z < $interval['end_time']) {
                        $time_slot_name = (string)$z;
                        $slot_name = 'slot_'.$time_slot_name;
                        $insertTime->$slot_name = 0;
                        $i++;
                    }
                    $insertTime->save();
                }
            }
        }
    }

    public function getAvailability($token) 
    {
        $user = User::where('token','=',$token)->first();
        $available = Availability::where('ally_id', $user->id)->get();
        $dayObj = [];
        foreach ($available as $key_day => $day) {
            $time = TimeSlot::where('availability_id', $day->id)->get();
            $timeConverted = json_decode(json_encode($time), true)[0];
            $count = 0;
            unset($timeConverted['id']);
            unset($timeConverted['availability_id']);
            unset($timeConverted['created_at']);
            unset($timeConverted['updated_at']);
            // \Log::alert($timeConverted);

            $startTime = array_search(true, $timeConverted); // Gives the start
            $array_reversed = array_reverse($timeConverted);
            $endTime = array_search(true, $array_reversed); // Gives the start

            // \Log::alert('START'.$startTime);
            // \Log::alert('END'.$endTime);

            // \Log::alert('ARREY REVERSE'. array_reverse($timeConverted));
            // foreach ($timeConverted as $key => $slot) {
            //     \Log::alert($key);
                // for ($key = 1; $key <= 24; $key++) {
                    // if($key == 'slot_'.$count && $slot){
                //         $countSlot = $key;
                    // }
                // }
            //     $count++;
            // }
            // \Log::alert(['slot_1']);
            if(!empty($startTime) && !empty($endTime) ){
                $startTime = explode('_', $startTime);
                $endTime = explode('_', $endTime);
    
                \Log::alert($startTime);
                \Log::alert($endTime);
    
                $dayObj[$day['date']]['start_time'] = $startTime[1];
                $dayObj[$day['date']]['end_time'] = $endTime[1];
                $dayObj[$day['date']]['interval'] = '';
            }

            else {
                $dayObj[$day['date']]['start_time'] = 0;
                $dayObj[$day['date']]['end_time'] = 23;
                $dayObj[$day['date']]['interval'] = '';
            }

        }
        return response()->json([
            'days' => $dayObj,
        ]);
        \Log::alert($available);
        \Log::alert($dayObj);

    }
}
