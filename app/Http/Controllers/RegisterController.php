<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Log;
use App\User;
use JWTFactory;
use JWTAuth;
use Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Input;
use Carbon\Carbon;

class RegisterController extends Controller
{
    private function getToken($email, $password)
    {
        $token = null;
        //$credentials = $request->only('email', 'password');
        try {
            if (!$token = JWTAuth::attempt( ['email'=>$email, 'password'=>$password])) {
                return response()->json([
                    'response' => 'error',
                    'message' => 'Password or email is invalid',
                    'token'=>$token
                ]);
            }
        } catch (JWTAuthException $e) {
            return response()->json([
                'response' => 'error',
                'message' => 'Token creation failed',
            ]);
        }
        return $token;
    }

    public function store()
    {
        $user = new User;

        $user->name = Input::get('name');
        $user->email = Input::get('email');
        $user->postal_code = Input::get('postal_code');
        $user->total_rating = 0;
        $user->rating = 0;
        $user->member_since = Carbon::now();
        $user->mate = Input::get('mate');
        $user->post_job = Input::get('post_job');

        \Log::alert( Input::get('mate'));
        \Log::alert(Input::get('post_job'));


        $key = getenv('GOOGLE_API');
        $geocode = file_get_contents("https://maps.googleapis.com/maps/api/geocode/json?address=".Input::get('postal_code')."&key=".$key);
        $output= json_decode($geocode);
        \Log::alert($output->results);

        $user->latitude = $output->results[0]->geometry->location->lat;
        $user->longitude  = $output->results[0]->geometry->location->lng;
        $address_components = $output->results[0]->address_components;
        $user->password = Hash::make(Input::get('password'));

        $geoResults = [];

        foreach($output->results as $result){
            $geoResult = [];    
            foreach ($result->address_components as $address) {
                if ($address->types[0] == 'country') {
                    $geoResult['country'] = $address->long_name;
                }
                if ($address->types[0] == 'administrative_area_level_1') {
                    $geoResult['state'] = $address->long_name;
                }
                if ($address->types[0] == 'administrative_area_level_2') {
                    $geoResult['city'] = $address->long_name;
                }
                if ($address->types[0] == 'political') {
                    $geoResult['address'] = $address->long_name;
                }
                if ($address->types[0] == 'locality') {
                    $geoResult['city'] = $address->long_name;
                }
                if ($address->types[0] == 'postal_code') {
                    $geoResult['postal_code'] = $address->long_name;
                }       
                if ($address->types[0] == 'route') {
                    $geoResult['route'] = $address->long_name;
                }       
            }
            $geoResults[] = $geoResult;
        }

        $user->country  = $geoResult['country'];
        $user->state  = $geoResult['state'];
        $user->city  = $geoResult['city'];
        $user->address = $geoResult['address'];

        $this->validate(request(), [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $email = request(['email']);

        $isExists = \App\User::where('email', $email)->first();

        if($isExists){
            return response()->json(array("exists" => true));
        }

        else{
            // grab credentials from the request
            $credentials = [$user->email, $user->password];
            $token = str_random(60);        

            // Input::only('email', 'password');
            // $token = JWTAuth::attempt($credentials); 
            // $token = JWTAuth::fromUser($user);
            $user->token = $token;
            $user->save();
            $user = User::first();  
            
            
            return Response::json(compact('token'));
            
            // auth()->login($user);
            
            // return response()->json(array("success" => true));
        }
        
    }
}
