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
        
        

        \Log::alert('IN UPDATE PROFILEEE');
        \Log::alert($request->all());

    }
}
