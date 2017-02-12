<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class StartController extends Controller
{
    //
    public function Init()
    {
        return view('index');

    }
}
