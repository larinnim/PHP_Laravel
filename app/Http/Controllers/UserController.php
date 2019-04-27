<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Auth;

class UserController extends Controller
{
    public function getUserInfo($token)
    {
        $user = User::where('token','=',$token)->first();
        return response()   
            ->json(['user' => $user]);
    }

    public function updateProfile(Request $request, $token)
    {
        $user = User::where('token','=',$token)->first();
        
        \Log::alert($request->all());
        $user->name = $request['name'];
        $user->email = $request['email'];
        $user->postal_code = $request['cep'];
        $user->address = $request['address'];
        $user->city = $request['city'];
        $user->state = $request['state'];  
        $user->country = $request['country'];  
        $user->phone_number = $request['phone_number'];  
        $key = getenv('GOOGLE_API');
        $geocode = file_get_contents("https://maps.googleapis.com/maps/api/geocode/json?address=".$request['cep']."&key=".$key);
        $output= json_decode($geocode);
        $user->latitude = $output->results[0]->geometry->location->lat;
        $user->longitude  = $output->results[0]->geometry->location->lng;
        $user->save();


    }
}
