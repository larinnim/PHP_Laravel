<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UserController extends Controller
{
    public function getUserInfo($token)
    {
        \Log::alert('IN USERR');

        $user = User::where('token','=',$token)->first();
        return response()   
            ->json(['user' => $user]);
        \Log::alert('in user get data'. $token);
        \Log::alert($user);

        // $id = $request->query('id');
        // \Log::alert($id);
        // $user = User::where('id', '=', $id)->first();
        // \Log::alert($user);
        // return response()->json($user);
    }
}
