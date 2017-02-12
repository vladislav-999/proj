<?php
/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

/*
function(){
    if(Request::ajax()){
        $file = Response::json(Request::input('file'));
        Session::put('file', $file);
        return $file;
    }
}

*/
Route::post('/upl', 'TableController@CreateTable');


Route::group(['middleware' => ['web']], function () {

  /*  Route::get('/', function () {
        return view('index');
    });
*/
    Route::get('/','StartController@Init');
    Route::get('/h', function(){
        return 'Hello World';
    });

/*
    Route::get('getRequest', function(){
        if(Request::ajax()){
            return "AJAX";
        }
        return "HTTP";
    });*/
});

Route::auth();

Route::get('/home', 'HomeController@index');
