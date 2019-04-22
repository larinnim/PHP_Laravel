<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UserController extends Controller
{
    public function getUserInfo(Request $request)
    {
        $id = $request->query('id');
        \Log::alert($id);
        $user = User::where('id', '=', $id)->first();
        \Log::alert($user);
        return response()->json($user);
    }
}
