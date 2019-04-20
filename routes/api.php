<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('occupations', 'OccupationController@index');
Route::get('occupations/agents', 'OccupationController@agentOccupation');

Route::get('getImage', 'AWS3@index');
Route::post('uploadImage', 'AWS3@store');

Route::post('/register_store', 'RegisterController@store');
// Route::middleware('jwt.auth')->get('logged_in', 'LoginController@login');
Route::post('/logged_in', 'LoginController@login');

 // Password Reset Routes...
//  Route::get('password/reset', 'ForgotPasswordController@showLinkRequestForm')->name('password.reset');
 Route::post('password/email', 'Auth\ForgotPasswordController@sendEmail');
 Route::post('password/reset', 'Auth\ResetPasswordController@process');

//  Route::get('password/reset/{token}', 'ResetPasswordController@showResetForm')->name('password.reset.token');
//  Route::post('password/reset', 'ResetPasswordController@reset');


