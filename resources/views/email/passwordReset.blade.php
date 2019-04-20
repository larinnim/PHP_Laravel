@component('mail::message')
# Password Reset Request

Hi {{$name}},

You recently requested to reset your password for your Tarefazz account. Click the button below to reset it.

@component('mail::button', ['url' => 'http://localhost:8888/response-password-reset?token='. json_decode(json_encode($token), true)])
Reset Password
@endcomponent

If you did not request a password reset, please ignore this email or reply to let us know. This password is only valid 
for the next 30 minutes.

Thanks,<br>
{{ config('app.name') }} Team
@endcomponent
