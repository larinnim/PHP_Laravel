<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use Cookie;
use Lang;

class ResetPasswordMail extends Mailable
{
    use Queueable, SerializesModels;

    public $name;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($token, $name)
    {
        $this->token = $token;
        $this->name = $name;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        app()->setLocale(Cookie::get('lang'));
        return $this->markdown('email.passwordReset')
        ->subject(Lang::get('email.email_title'))
        ->with([
            'token' => $this->token,
            'name' => $this->name
        ]);
    }
}
