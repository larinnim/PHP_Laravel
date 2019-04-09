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
        
        Log::alert(request(['name', 'email', 'password']));
        $user = User::create(request(['name', 'email', 'password']));
        
        auth()->login($user);
        
        return redirect()->to('/');
    }
}
