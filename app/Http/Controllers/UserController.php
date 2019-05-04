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
            \Log::alert(array_key_exists($key, $registeredProfessions));
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
                    // OccupationUser::onlyTrashed()->update(
                    //     [
                    //                 'occupation_id' => $occupation->id,
                    //                 'user_id' => $user->id,
                    //                 'price' => $value
                    //             ],
                    //             [
                    //                 'deleted_at' =>  NULL,
                    //                 'updated_at' => new \DateTime()
                    //             ]
                    // )->restore();
                    // OccupationUser::onlyTrashed()->updateOrCreate(
                    //     [
                    //         'occupation_id' => $occupation->id,
                    //         'user_id' => $user->id,
                    //         'price' => $value
                    //     ],
                    //     [
                    //         'deleted_at' =>  NULL,
                    //         'updated_at' => new \DateTime()
                    //     ])->restore();
    
                }
                // OccupationUser::updateOrCreate([
                //     'occupation_id' => $occupation->id,
                //     'user_id'  => $user->id,
                //     'price' => $value,
                // ]);    
            }
        }

       

          \Log::alert($hourlyArr);
          \Log::alert($this->getUserInfo($token)->getData('hourly_price')['hourly_price']);
       
        $result = array_diff($hourlyArr, $registeredProfessions);

          \Log::alert($result);
        $occupation_user = new OccupationUser;

        // $arr_hourly_price = (array) json_decode($request['hourly_amount'],true);
        // \Log::alert($arr_hourly_price);

        // foreach ($arr_hourly_price as $key => $value) {
        //     $occupation = Occupation::where('occupation','=',$key)->first();
        //     if($value){
        //         OccupationUser::updateOrCreate([
        //             'occupation_id' => $occupation->id,
        //             'user_id'  => $user->id,
        //             'price' => $value,
        //         ]);    
        //     }
        // }
     
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
