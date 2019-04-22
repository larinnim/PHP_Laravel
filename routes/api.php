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

//Database Request Routes...
Route::get('occupations', 'OccupationController@index');
Route::get('occupations/agents', 'OccupationController@agentOccupation');
Route::get('occupations/agents', 'OccupationController@agentOccupation');
Route::get('userInfo/{id?}', 'UserController@getUserInfo');


// AWS Routes...
Route::get('getImage', 'AWS3@index');
Route::post('uploadImage', 'AWS3@store');

 // Authentication Routes...
 Route::post('/logged_in', 'LoginController@login');
 Route::post('/register_store', 'RegisterController@store');
 Route::post('password/email', 'Auth\ForgotPasswordController@sendEmail');
 Route::post('password/reset', 'Auth\ResetPasswordController@process');


