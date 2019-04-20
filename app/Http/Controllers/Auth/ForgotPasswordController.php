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
        return response()->json([
            'data' => 'Reset mail sent successfully, please check your inbox'
        ], 200);
    }

    public function send($email, $name)
    {
        $token = $this->createToken($email);
        \Log::alert($token);
        Mail::to($email)->send(new ResetPasswordMail($token, $name));
    }

    public function createToken($email)
    {
        $oldToken = DB::table('password_resets')->where('email', $email)->first();
        if($oldToken){
            return $oldToken->token;
        }
        $token = str_random(60);
        \Log::alert($token);
        DB::table('password_resets')->insert([
            'email' => $email,
            'token' => $token,
            'created_at' => Carbon::now()
        ]);
        // $token->saveToken($token, $email);
        \Log::alert($token);

        return $token;
    }

    // public function saveToken($token, $email)
    // {
    //     \Log::alert($token);
    //     DB::table('password_resets')->insert([
    //         'email' => $email,
    //         'token' => $token,
    //         'created_at' => Carbon::now()
    //     ]);
    // }
}
