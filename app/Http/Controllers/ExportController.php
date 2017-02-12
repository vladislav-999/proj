<?php

namespace App\Http\Controllers;

use PHPExcel;
use PHPExcel_IOFactory;
use PHPExcel_Cell;
use PHPExcel_Shared_Date;
use PHPExcel_Settings;

use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Session;


class ExportController extends Controller
{

    public function Export()
    {
        if(Request::ajax()){
            $file = $_POST['FileExcel'];


        }
    }
}
