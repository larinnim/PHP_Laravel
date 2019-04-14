<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Log;
use App\User;

class RegisterController extends Controller
{
    public function store()
    {
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
            $user = User::create(request(['name', 'email', 'password', 'postal_code', 'mate', 'post_job']));
    
            // auth()->login($user);
            
            return response()->json(array("success" => true));
        }
        
    }
}
