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
        // $user = \App\User::where('email', $request->email)->get()->first();
        // if ($user && \Hash::check($request->password, $user->password)) // The passwords match...
        // {
        //     $token = self::getToken($request->email, $request->password);
        //     $user->auth_token = $token;
        //     $user->save();
        //     $response = ['success'=>true, 'data'=>['id'=>$user->id,'auth_token'=>$user->auth_token,'name'=>$user->name, 'email'=>$user->email]];           
        // }
        // else 
        //   $response = ['success'=>false, 'data'=>'Record doesnt exists'];
      
        // return response()->json($response, 201);
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
            'password'=> 'required'
        ]);


        // $validator = $this->validate(request(), [
        //     'email' => 'required|string|email|max:255',
        //     'password'=> 'required'
        // ]);
       

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }
        $credentials = $request->only('email', 'password');
        \Log::alert($request->all());
        \Log::alert(auth()->attempt(request(['email', 'password'])));
        \Log::alert(JWTAuth::attempt($credentials));

        $token = JWTAuth::attempt($credentials);
        $success = 'success';
        try {
            if (!$token) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'could_not_create_token'], 500);
        }
        return response()->json(compact('token', 'success'));
    }
}
