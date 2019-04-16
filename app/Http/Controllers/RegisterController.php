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

        \Log::alert(Input::get('name'));
        $user->name = Input::get('name');
        $user->email = Input::get('email');
        $user->postal_code = Input::get('postal_code');
        // $key = getenv('GOOGLE_API');
        // $geocode = file_get_contents("https://maps.googleapis.com/maps/api/geocode/json?address=$user->postal_code_users&key=$key");
        // $output= json_decode($geocode);
        // $user->latitude = $output->results[0]->geometry->location->lat;
        // $user->longitude  = $output->results[0]->geometry->location->lng;
        // $address_components = $output->results[0]->address_components;
        $user->password = Hash::make(Input::get('password'));

        Log::alert(request());

        $this->validate(request(), [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required'
        ]);
        
        Log::alert(request(['name', 'email', 'password', 'postal_code', 'mate', 'post_job']));
        $email = request(['email']);

        $isExists = \App\User::where('email', $email)->first();
        if($isExists){
            return response()->json(array("exists" => true));
        }
        else{
            // $user = User::create(request(['name', 'email', bcrypt('password'), 'postal_code', 'mate', 'post_job']));
            // $user = User::first();
            $user->save();
            $user = User::first();  
            $token = JWTAuth::fromUser($user);
            
            return Response::json(compact('token'));
            
            // auth()->login($user);
            
            // return response()->json(array("success" => true));
        }
        
    }
}
