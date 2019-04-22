<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Http\Request;
use App\User;
use DB;
use DateTime;

class ResetPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset requests
    | and uses a simple trait to include this behavior. You're free to
    | explore this trait and override any methods you wish to tweak.
    |
    */

    use ResetsPasswords;

    /**
     * Where to redirect users after resetting their password.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    public function process(Request $request)
    {
        $tokenTTL = 30;

        $createdToken = $this->getPasswordResetTableRow($request)->value('created_at');
        $minutesDifference = round(abs((new DateTime())->getTimestamp() - strtotime($createdToken)) / 60);
       
        if($minutesDifference > $tokenTTL){
           return $this->tokenNotFoundResponse();
        }

        return $this->getPasswordResetTableRow($request)->count() > 0 ? $this->changePassword($request) : $this->tokenNotFoundResponse();
    
    }

    private function getPasswordResetTableRow($request)
    {
        return DB::table('password_resets')->where(['email' => $request->email, 'token' => $request->token]);
    }

    private function tokenNotFoundResponse()
    {
        return response()->json(['error' => 'register.token_email_invalid']);
    }

    private function changePassword(Request $request)
    {
        $user = User::whereEmail($request->email);
        $user->update(['password' => bcrypt($request->password)]);
        $this->getPasswordResetTableRow($request)->delete();
        return response()->json(['success' => 'register.password_updated'], 201);
    }
}
