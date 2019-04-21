<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use JWTFactory;
use JWTAuth;

class LoginController extends Controller
{
    public function login(Request $request)
    {        
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
            'password'=> 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }
        $credentials = $request->only('email', 'password');

        $token = JWTAuth::attempt($credentials);
        $success = 'success';
        $user = auth()->user();
        $expires = auth('api')->factory()->getTTL() * 60;
        
        try {
            if (!$token) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'could_not_create_token'], 500);
        }
        return response()->json(compact('token', 'expires', 'success', 'user'));
    }
}
