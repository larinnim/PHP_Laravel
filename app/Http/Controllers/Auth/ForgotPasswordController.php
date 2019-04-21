<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Http\Request;
use App\User;
use Response;
use Mail;
use App\Mail\ResetPasswordMail;
use Carbon\Carbon;
use DB;
use Lang;
use Cookie;
use Config;
use JWTFactory;
use JWTAuth;

class ForgotPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset emails and
    | includes a trait which assists in sending these notifications from
    | your application to your users. Feel free to explore this trait.
    |
    */

    use SendsPasswordResetEmails;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    public function sendEmail(Request $request)
    {
        if(!$this->validateEmail($request->email)){
            return $this->failedResponse();
        }

        $user = DB::table('users')->where('email', $request->email)->first();

        $this->send($request->email, $user->name);
        return $this->successResponse();

    }

    public function validateEmail($email){
        return  !!User::where('email', $email)->first();
    }

    public function failedResponse() {
        return response()->json([
            'error' => 'EMAIL wasnt found'
        ], 400);
    }

    public function successResponse() {

        app()->setLocale(Cookie::get('lang'));
        return response()->json([
            'success' => 'register.forgot_password_email'
        ], 200);
    }

    public function send($email, $name)
    {
        $token = $this->createToken($email);
        Mail::to($email)->send(new ResetPasswordMail($token, $name));
    }

    public function createToken($email)
    {
        $oldToken = DB::table('password_resets')->where('email', $email)->first();
        if($oldToken){
            return $oldToken->token;
        }
        $token = str_random(60);        
        DB::table('password_resets')->insert([
            'email' => $email,
            'token' => $token,
            'created_at' => Carbon::now()
        ]);
        return $token;
    }
}
