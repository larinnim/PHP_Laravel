<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\OccupationUser;
use App\Occupation;
use App\Availability;
use App\TimeSlot;
use App\Booking;
use Auth;
use DB;
use DateTime;
use DateTimeZone;
use DatePeriod;
use DateInterval;
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
                'hourly_price' => $occupation_arr,
            ]);
    }

    public function updateProfile(Request $request, $token)
    {
        $hourly_decoded = json_decode($request['hourly_amount']);
        \Log::alert('VALUE HOUR'.json_encode($hourly_decoded));

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
            \Log::alert('THE VALUE'.$value);
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

                if($prevOccupation){
                    \Log::alert('VALUE PRICEE:'. $value);
                    if($value){
                        OccupationUser::withTrashed()
                        ->where('occupation_id', $occupation->id)
                        ->where('user_id', $user->id)
                        ->update([
                            'price' => $value,
                            'deleted_at' => null
                        ]);
                    }
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
       
        $result = array_diff($hourlyArr, $registeredProfessions);

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
        $response_timezone = file_get_contents($url_timezone);
        $timezone = json_decode($response_timezone, true)['timeZoneId'];
        $user->timezone = $timezone;

        $user->save();
    }

    public function updateAvailability(Request $request, $token) 
    {
        $weekly = json_decode($request['weekly']);

        $user = User::where('token','=',$token)->first();
        User::where('token','=',$token)
                ->update(['timezone' => $request->timezone]);
        $timezone = new DateTimeZone('UTC');

        foreach ($weekly as $key_day => $day) {
            $arrDay = (array)$day;
            $arrKey = array_keys($arrDay);

            $availableDay = Availability::where('date', $key_day)->first();

            if($availableDay){
                $available = Availability::where('date', $key_day);
                $available->update([
                    $arrKey[0] => new DateTime($arrDay[$arrKey[0]], $timezone),
                    $arrKey[1] => new DateTime($arrDay[$arrKey[1]], $timezone),
                    $arrKey[2] => new DateTime($arrDay[$arrKey[2]], $timezone),
                    $arrKey[3] => new DateTime($arrDay[$arrKey[3]], $timezone)
                ]);
            }

            else {
                $availableDay = new Availability;
                $availableDay->ally_id = $user->id;
                $availableDay->date = $key_day;

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
        $timezoneStrg = $user->timezone;
        $timezone = new DateTimeZone($timezoneStrg);

        $dayObj = [];
        foreach ($available as $key_day => $day) {
            $dayObj [$day->date]['standard_start_time'] = (new \DateTime($day->standard_start_time))->setTimezone($timezone); 
            $dayObj [$day->date]['standard_end_time'] = (new \DateTime($day->standard_end_time))->setTimezone($timezone); 
            $dayObj [$day->date]['interval_start_time'] = (new \DateTime($day->interval_start_time))->setTimezone($timezone); 
            $dayObj [$day->date]['interval_end_time'] = (new \DateTime($day->interval_end_time))->setTimezone($timezone); 

        }
        return response()->json([
            'days' => $dayObj
        ]);
    }

    public function updateAvailabilitySpecific(Request $request, $token)
    {
        \Log::alert($request->all());
        $user = User::where('token','=',$token)->first();

        User::where('token','=',$token)
            ->update(['timezone' => $request->timezone]);
        // \Log::alert($request->specific_start_date);
        $timezone = new DateTimeZone('UTC');
        // $date_time_start = new DateTime($request->specific_start_date, $timezone);

        // $date_time_start = new \DateTime(trim($request->specific_start_date, '"'));
        $date_time_start = new DateTime($request->specific_start_date, $timezone);
        $date_time_end = new DateTime($request->specific_end_date, $timezone);

        \Log::alert('REQUEST'.$request->specific_end_date);

        $range = $this->get_dates_through_range($request->specific_start_date, $request->specific_end_date);
        \Log::alert($range);
        $range_only_date=array();
        foreach($range as $key => $date) {
            \Log::alert('DATE'.$date);

            $dateTime = new DateTime($date, $timezone);
            $range_only_date[] = $dateTime->format('Y-m-d');
        }
        if($range_only_date[count($range_only_date)-1] == $range_only_date[count($range_only_date)-2]){
            $repeted = true;
        }
        foreach ($range as $key_day => $day) {
            $dateConst = new DateTime($day, $timezone);
            $availableFormatted = $dateConst->format('Y-m-d');
            $available_data = Availability::where('date', $availableFormatted)->first();

            \Log::alert('DAY FORMATED:'.$availableFormatted);

            if($available_data){
                $available = Availability::where('date', $availableFormatted);
                
                //Handle the last value is duplicated
                if($repeted && $availableFormatted == $range_only_date[count($range_only_date)-1]){
                    $available->update([
                        'standard_start_time' => new DateTime($range_only_date[count($range_only_date)-2], $timezone),
                        'standard_end_time' => new DateTime($day, $timezone),
                        'interval_start_time' => new DateTime($day, $timezone),
                        'interval_end_time' => new DateTime($day, $timezone)
                    ]);
                }
                else{
                    $available->update([
                        'standard_start_time' => new DateTime($day, $timezone),
                        'standard_end_time' => new DateTime($day, $timezone),
                        'interval_start_time' => new DateTime($day, $timezone),
                        'interval_end_time' => new DateTime($day, $timezone)
                    ]);
                }
            }
            else {
                \Log::alert('HERE');
                $availableDay = new Availability;
                $availableDay->ally_id = $user->id;
                $availableDay->date = $dateConst->format('Y-m-d');

                $availableDay->standard_start_time = new DateTime($day, $timezone);
                $availableDay->standard_end_time = new DateTime($day, $timezone);
                $availableDay->interval_start_time = new DateTime($day, $timezone);
                $availableDay->interval_end_time = new DateTime($day, $timezone);
                $availableDay->save();
            }

        }
        // $available = Availability::where('date', $key_day);

        // \Log::alert($date_time_start);
        // \Log::alert($date_time_end);
        // $availableDay = Availability::where('date', $key_day)->first();

    }


    private function get_dates_through_range($start, $end, $format = 'Y-m-d\TH:i:s.Z\Z')
    {
        $range = array();
        $interval = new DateInterval('P1D');

        $range_end = new DateTime($end);
        // $range_end->add($interval);

        $period = new DatePeriod(new DateTime($start), $interval, $range_end);

        foreach($period as $key => $date) {
            $range[] = $date->format($format);
        }
        $range[count($range)] = $range_end->format($format);
        return $range;
    }

    public function getJobAlly($token){
        $user = User::where('token','=',$token)->first();
        // DB::table('booking')
        // ->join('users', function ($join, $user) {
        //     $join->on('booking.postjob_id', '=', 'users.id')
        //         ->where('ally_id', $user->id);
        // })
        // ->get();
        $jobsByAlly = Booking::where('ally_id', $user->id)
                        // ->leftJoin('users', 'booking.postjob_id', '=', 'posts.user_id')
                        ->join('users', function ($join) {
                        $join->on('booking.postjob_id', '=', 'users.id');
                        // ->select('users.member_since', 'users.name', 'users.rating', 'users.total_rating', 'users.avatar');
                        })
                        ->get(array('users.member_since', 'users.name', 'users.rating', 'users.total_rating', 'users.avatar',
                        'booking.start_datetime', 'booking.end_datetime', 'booking.finished', 'booking.pending', 'booking.payment_amount'));
        \Log::alert(json_encode($jobsByAlly));
        return $jobsByAlly;
    }

    public function updatePostJobOrMate(Request $request, $token){
        $post_job = $request['post_job'];
        $mate = $request['mate'];

        $user = User::where('token','=',$token)
                ->update([
                    'post_job' => $post_job,
                    'mate' => $mate,
                ]);

        return response()->json([
            'post_job' => $post_job,
            'mate' => $mate,
        ]);
        // \Log::alert('HERE');

        // \Log::alert($request->all());
    }
}
