<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Http\Request;
use App\User;
use Response;
use Mail;
use App\Mail\ResetPasswordMail;

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

        $this->send($request->email);
        return $this->successResponse();

        \Log::alert($request->all());
        return $request->all();
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

    public function send($email)
    {
        Mail::to($email)->send(new ResetPasswordMail);
    }
}
