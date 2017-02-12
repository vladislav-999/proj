<?php

namespace App\Http\Controllers;
use PHPExcel;
use PHPExcel_IOFactory;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

use App\Http\Requests;
use App\Http\Requests\UserFormRequest;
use App\User;
use Symfony\Component\HttpFoundation\File\UploadedFile;





class ListController extends Controller
{
    public $listMass = array();

    public function upload()
    {
        $file = $_POST['file'];
        echo $file;
    }
    public function ajax()
    {
        if(Request::ajax()){
            return "AJAX";
        }
        return "HTTP";
    }




}
