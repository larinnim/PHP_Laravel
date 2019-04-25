@component('mail::message')
# {{ __('email.email_h1_title')}}

{{ __('email.greeting')}} {{$name}},

{{ __('email.explaining')}}

@component('mail::button', ['url' => 'http://localhost:8888/response-password-reset?token='. json_decode(json_encode($token), true)])
{{ __('email.reset_button')}}
@endcomponent

{{ __('email.not_requested')}}

{{ __('email.thanks')}}<br>
{{ __('email.equipe_name')}}
@endcomponent
